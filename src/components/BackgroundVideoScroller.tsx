import { useRef, useEffect, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Eye, EyeOff } from 'lucide-react';

export interface BackgroundVideoRef {
  seekToPercent: (percent: number) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  toggleSound: () => void;
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
}

interface BackgroundVideoScrollerProps {
  isCinemaMode: boolean;
  onToggleCinemaMode: () => void;
  onProgressUpdate?: (progress: number, activeMilestone: number) => void;
}

export const BackgroundVideoScroller = forwardRef<BackgroundVideoRef, BackgroundVideoScrollerProps>(({
  isCinemaMode,
  onToggleCinemaMode,
  onProgressUpdate,
}, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Auto-play is TRUE by default so video plays continuously on load
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  // Auto-play on mount with robust browser autoplay policy handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    setIsMuted(true);

    const startPlay = () => {
      // Seek slightly past 0.05s to ensure no initial black frame
      if (video.currentTime === 0) {
        video.currentTime = 0.05;
      }
      video.play().then(() => {
        setIsPlayingAuto(true);
      }).catch((err) => {
        console.warn('Initial autoplay error:', err);
      });
    };

    // If already loaded
    if (video.readyState >= 2) {
      startPlay();
    } else {
      video.addEventListener('canplay', startPlay, { once: true });
    }
  }, []);

  // Smooth seek helper using requestAnimationFrame
  const applyVideoTime = useCallback((time: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;

    targetTimeRef.current = Math.max(0, Math.min(time, video.duration));

    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(() => {
        if (videoRef.current) {
          const diff = Math.abs(targetTimeRef.current - videoRef.current.currentTime);
          if (diff > 0.02) {
            if ('fastSeek' in videoRef.current && typeof (videoRef.current as { fastSeek?: (t: number) => void }).fastSeek === 'function') {
              (videoRef.current as { fastSeek: (t: number) => void }).fastSeek(targetTimeRef.current);
            } else {
              videoRef.current.currentTime = targetTimeRef.current;
            }
          }
        }
        rafIdRef.current = null;
      });
    }
  }, []);

  const seekToPercent = useCallback((pct: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const clamped = Math.max(0, Math.min(pct, 1));
    setProgress(clamped);
    applyVideoTime(clamped * video.duration);
    // Keep playing from the sought position
    video.play().then(() => setIsPlayingAuto(true)).catch(() => {});
  }, [applyVideoTime]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingAuto) {
      video.pause();
      setIsPlayingAuto(false);
    } else {
      video.play().then(() => {
        setIsPlayingAuto(true);
      }).catch((err) => {
        console.warn('Autoplay prevented:', err);
      });
    }
  }, [isPlayingAuto]);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  // Expose methods to parent components via ref
  useImperativeHandle(ref, () => ({
    seekToPercent,
    play: () => {
      videoRef.current?.play();
      setIsPlayingAuto(true);
    },
    pause: () => {
      videoRef.current?.pause();
      setIsPlayingAuto(false);
    },
    togglePlay,
    toggleSound,
    isPlaying: isPlayingAuto,
    isMuted,
    currentTime: videoRef.current?.currentTime || 0,
    duration: videoDuration,
  }), [seekToPercent, togglePlay, toggleSound, isPlayingAuto, isMuted, videoDuration]);

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setVideoDuration(video.duration);
      video.muted = isMuted;
      video.play().then(() => setIsPlayingAuto(true)).catch(() => {});
    }
  };

  // Video timeupdate when playing auto
  const handleTimeUpdate = () => {
    if (!videoRef.current || !videoDuration) return;
    const currProgress = videoRef.current.currentTime / videoDuration;
    setProgress(currProgress);

    let activeM = 0;
    if (currProgress >= 0.85) activeM = 3;
    else if (currProgress >= 0.58) activeM = 2;
    else if (currProgress >= 0.28) activeM = 1;

    if (onProgressUpdate) {
      onProgressUpdate(currProgress, activeM);
    }
  };

  return (
    <>
      {/* 1. Master Fixed Background Video Container
          CRITICAL: z-index is z-0 (ABOVE body background, NOT -z-20 which hides behind body!)
          Zero 3D lag, native 4K GPU rendering */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none bg-[#0A0B0E]">
        <video
          ref={videoRef}
          src="/assets/hero_scroll_video.mp4"
          autoPlay
          playsInline
          loop
          muted={isMuted}
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover scale-[1.01] will-change-transform"
        />

        {/* Lightweight Cinematic Translucent Vignette Overlays:
            Keeps the video 100% luminous, vibrant and clear, while providing high-contrast backdrop for text */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.5)_95%)] pointer-events-none" />
      </div>

      {/* 2. Floating Quick Controls Bar (Top Right, under Navbar) */}
      <div className="fixed top-20 right-4 sm:right-8 z-40 flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300">
        
        {/* Cinema Mode Toggle: Hides all UI text for pure video viewing */}
        <button
          onClick={onToggleCinemaMode}
          className={`px-3 py-1.5 rounded-full text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
            isCinemaMode
              ? 'bg-raj-gold text-raj-bg font-bold shadow-lg shadow-raj-gold/30'
              : 'text-raj-cream hover:text-raj-gold hover:bg-white/10'
          }`}
          title={isCinemaMode ? 'Exit Pure Video Mode' : 'Pure Video Mode (Hide Text)'}
        >
          {isCinemaMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline font-bold tracking-wider">{isCinemaMode ? 'EXIT CINEMA' : 'PURE VIDEO'}</span>
        </button>

        <div className="w-[1px] h-4 bg-white/15 mx-0.5" />

        {/* Play/Pause Toggle */}
        <button
          onClick={togglePlay}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full text-raj-cream hover:text-raj-gold hover:bg-white/10 transition-colors flex items-center gap-1.5 text-[11px] font-mono cursor-pointer"
          title={isPlayingAuto ? 'Pause Video' : 'Play Video'}
        >
          {isPlayingAuto ? (
            <>
              <Pause className="w-3.5 h-3.5 text-raj-gold" />
              <span className="hidden md:inline text-raj-gold font-bold">PAUSE</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-raj-sand" />
              <span className="hidden md:inline">PLAY</span>
            </>
          )}
        </button>

        {/* Audio Mute/Unmute Toggle */}
        <button
          onClick={toggleSound}
          className="p-1.5 rounded-full text-raj-cream hover:text-raj-gold hover:bg-white/10 transition-colors cursor-pointer"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-white/70" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-raj-gold animate-pulse" />
          )}
        </button>
      </div>

      {/* 3. Persistent Slim Minimalist Video Progress Bar at the very bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
        <div className="w-full bg-black/40 backdrop-blur-sm h-[3px]">
          <div
            className="h-full bg-gradient-to-r from-raj-sand via-raj-gold to-raj-gold-light transition-all duration-75"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    </>
  );
});

BackgroundVideoScroller.displayName = 'BackgroundVideoScroller';
