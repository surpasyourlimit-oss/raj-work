import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AmbienceAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  const toggleAudio = () => {
    if (isPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
        setTimeout(() => {
          setIsPlaying(false);
        }, 500);
      }
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }

        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 1.5);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Warm ambient harmonic drone (architectural atmosphere chords: 110Hz, 164.8Hz, 220Hz, 329.6Hz)
        const frequencies = [110, 164.81, 220, 329.63];
        const newOscs: OscillatorNode[] = [];

        frequencies.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
          const oscGain = ctx.createGain();

          osc.type = index % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle LFO modulation for organic breath
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.1 + index * 0.05, ctx.currentTime);
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(osc.frequency);
          lfo.start();

          oscGain.gain.setValueAtTime(0.25 / (index + 1), ctx.currentTime);

          if (panner) {
            panner.pan.setValueAtTime((index % 2 === 0 ? -0.4 : 0.4), ctx.currentTime);
            osc.connect(oscGain);
            oscGain.connect(panner);
            panner.connect(masterGain);
          } else {
            osc.connect(oscGain);
            oscGain.connect(masterGain);
          }

          osc.start();
          newOscs.push(osc);
        });

        oscNodesRef.current = newOscs;
        setIsPlaying(true);
      } catch (err) {
        console.error("Web Audio initialization error:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      aria-label={isPlaying ? "Mute ambient architectural atmosphere" : "Play ambient architectural atmosphere"}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 backdrop-blur-md ${
        isPlaying
          ? 'bg-raj-gold/20 text-raj-gold border border-raj-gold/40 shadow-sm shadow-raj-gold/20'
          : 'bg-white/5 text-raj-muted hover:text-raj-cream border border-white/10 hover:border-white/20'
      }`}
      title={isPlaying ? "Mute Atmosphere" : "Atmosphere Soundscape"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-raj-gold animate-pulse" />
          <span className="hidden sm:inline">Sound: ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sound: OFF</span>
        </>
      )}
    </button>
  );
};
