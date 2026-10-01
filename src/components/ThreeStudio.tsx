import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Eye, Sun, Moon, Sparkles, Layers, RotateCcw } from 'lucide-react';

export const ThreeStudio: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Studio Interactive States
  const [flooringType, setFlooringType] = useState<'marble' | 'wood' | 'tiles'>('marble');
  const [lightingMode, setLightingMode] = useState<'warm' | 'daylight' | 'evening' | 'cove'>('warm');
  const [featureWall, setFeatureWall] = useState<'charcoal' | 'beige' | 'wallpaper'>('charcoal');
  const [activePreset, setActivePreset] = useState<string>('panoramic');

  // References to 3D objects for real-time updates
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const floorMeshRef = useRef<THREE.Mesh | null>(null);
  const backWallMeshRef = useRef<THREE.Mesh | null>(null);
  const coveLightMeshRef = useRef<THREE.Mesh | null>(null);
  const pointLightsRef = useRef<THREE.PointLight[]>([]);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e1013);
    scene.fog = new THREE.FogExp2(0x0e1013, 0.035);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 7.5);
    camera.lookAt(0, 1.2, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.8);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const dirLight = new THREE.DirectionalLight(0xfff4e0, 1.8);
    dirLight.position.set(5, 8, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);
    directionalLightRef.current = dirLight;

    // Point lights for cove & spotlights
    const coveLight1 = new THREE.PointLight(0xffa850, 1.2, 8);
    coveLight1.position.set(-2, 3.8, 0);
    scene.add(coveLight1);

    const coveLight2 = new THREE.PointLight(0xffa850, 1.2, 8);
    coveLight2.position.set(2, 3.8, 0);
    scene.add(coveLight2);

    pointLightsRef.current = [coveLight1, coveLight2];

    // 5. Room Architectural Geometry

    // Floor Mesh
    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xefede8,
      roughness: 0.1,
      metalness: 0.15,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);
    floorMeshRef.current = floorMesh;

    // Ceiling with multi-tier false ceiling drop
    const ceilingGeo = new THREE.PlaneGeometry(12, 12);
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0x16181c, roughness: 0.8 });
    const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceilingMesh.position.y = 4.2;
    ceilingMesh.rotation.x = Math.PI / 2;
    scene.add(ceilingMesh);

    // False ceiling suspended tray
    const trayGeo = new THREE.BoxGeometry(8, 0.2, 8);
    const trayMat = new THREE.MeshStandardMaterial({ color: 0x1e2126, roughness: 0.7 });
    const trayMesh = new THREE.Mesh(trayGeo, trayMat);
    trayMesh.position.set(0, 4.0, 0);
    scene.add(trayMesh);

    // False ceiling glowing LED strip border
    const coveStripGeo = new THREE.BoxGeometry(8.1, 0.05, 8.1);
    const coveStripMat = new THREE.MeshBasicMaterial({ color: 0xffb86c });
    const coveStripMesh = new THREE.Mesh(coveStripGeo, coveStripMat);
    coveStripMesh.position.set(0, 3.9, 0);
    scene.add(coveStripMesh);
    coveLightMeshRef.current = coveStripMesh;

    // Back Feature Wall (Charcoal fluted / Wallpaper / Putty)
    const backWallGeo = new THREE.PlaneGeometry(12, 4.2);
    const backWallMat = new THREE.MeshStandardMaterial({ color: 0x181a1f, roughness: 0.5 });
    const backWallMesh = new THREE.Mesh(backWallGeo, backWallMat);
    backWallMesh.position.set(0, 2.1, -4.5);
    backWallMesh.receiveShadow = true;
    scene.add(backWallMesh);
    backWallMeshRef.current = backWallMesh;

    // Vertical Charcoal Louver slats on feature wall
    const louverGroup = new THREE.Group();
    for (let i = -3.5; i <= 3.5; i += 0.2) {
      const slatGeo = new THREE.BoxGeometry(0.08, 4.0, 0.06);
      const slatMat = new THREE.MeshStandardMaterial({ color: 0x121316, roughness: 0.6 });
      const slat = new THREE.Mesh(slatGeo, slatMat);
      slat.position.set(i, 2.0, -4.42);
      louverGroup.add(slat);

      // Gold metal profile highlighters on select slats
      if (Math.abs(i) < 0.1 || Math.abs(i - 1.8) < 0.1 || Math.abs(i + 1.8) < 0.1) {
        const goldGeo = new THREE.BoxGeometry(0.04, 4.0, 0.08);
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xc5a880, metalness: 0.85, roughness: 0.2 });
        const goldSlat = new THREE.Mesh(goldGeo, goldMat);
        goldSlat.position.set(i, 2.0, -4.4);
        louverGroup.add(goldSlat);
      }
    }
    scene.add(louverGroup);

    // Left Wall with Architectural Window Frame
    const leftWallGeo = new THREE.PlaneGeometry(12, 4.2);
    const leftWallMat = new THREE.MeshStandardMaterial({ color: 0x1c1e23, roughness: 0.8 });
    const leftWallMesh = new THREE.Mesh(leftWallGeo, leftWallMat);
    leftWallMesh.position.set(-6, 2.1, 0);
    leftWallMesh.rotation.y = Math.PI / 2;
    scene.add(leftWallMesh);

    // Right Wall with Framed Canvas Art
    const rightWallGeo = new THREE.PlaneGeometry(12, 4.2);
    const rightWallMat = new THREE.MeshStandardMaterial({ color: 0x1c1e23, roughness: 0.8 });
    const rightWallMesh = new THREE.Mesh(rightWallGeo, rightWallMat);
    rightWallMesh.position.set(6, 2.1, 0);
    rightWallMesh.rotation.y = -Math.PI / 2;
    scene.add(rightWallMesh);

    // Fine Art Canvas on Right Wall
    const canvasFrameGeo = new THREE.BoxGeometry(0.06, 2.2, 3.2);
    const canvasFrameMat = new THREE.MeshStandardMaterial({ color: 0xc5a880, metalness: 0.7, roughness: 0.3 });
    const canvasFrame = new THREE.Mesh(canvasFrameGeo, canvasFrameMat);
    canvasFrame.position.set(5.95, 2.2, -0.5);
    scene.add(canvasFrame);

    const canvasArtworkGeo = new THREE.PlaneGeometry(3.0, 2.0);
    const canvasArtworkMat = new THREE.MeshStandardMaterial({ color: 0xd9ceb9, roughness: 0.6 });
    const canvasArtwork = new THREE.Mesh(canvasArtworkGeo, canvasArtworkMat);
    canvasArtwork.position.set(5.9, 2.2, -0.5);
    canvasArtwork.rotation.y = -Math.PI / 2;
    scene.add(canvasArtwork);

    // 6. Furniture Pieces

    // Custom Modular Curved Velvet Sofa
    const sofaGroup = new THREE.Group();
    
    const sofaBaseGeo = new THREE.CylinderGeometry(2.8, 3.0, 0.5, 32, 1, false, 0, Math.PI);
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0x3d414a, roughness: 0.7 });
    const sofaBase = new THREE.Mesh(sofaBaseGeo, sofaMat);
    sofaBase.position.set(0, 0.25, 0.5);
    sofaBase.rotation.y = -Math.PI / 2;
    sofaBase.castShadow = true;
    sofaGroup.add(sofaBase);

    // Sofa backrest
    const sofaBackGeo = new THREE.TorusGeometry(2.8, 0.35, 16, 32, Math.PI);
    const sofaBack = new THREE.Mesh(sofaBackGeo, sofaMat);
    sofaBack.position.set(0, 0.8, 0.5);
    sofaBack.rotation.x = Math.PI / 2;
    sofaBack.rotation.z = Math.PI / 2;
    sofaGroup.add(sofaBack);

    // Center Marble Coffee Table
    const tableTopGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.08, 32);
    const tableTopMat = new THREE.MeshStandardMaterial({ color: 0xf5f3ee, roughness: 0.15, metalness: 0.2 });
    const tableTop = new THREE.Mesh(tableTopGeo, tableTopMat);
    tableTop.position.set(0, 0.45, -1.2);
    tableTop.castShadow = true;
    sofaGroup.add(tableTop);

    const tableBaseGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.4, 32);
    const tableBaseMat = new THREE.MeshStandardMaterial({ color: 0xc5a880, metalness: 0.85, roughness: 0.25 });
    const tableBase = new THREE.Mesh(tableBaseGeo, tableBaseMat);
    tableBase.position.set(0, 0.2, -1.2);
    sofaGroup.add(tableBase);

    // TV Console / Modular Credenza against feature wall
    const credenzaGeo = new THREE.BoxGeometry(5.0, 0.6, 0.7);
    const credenzaMat = new THREE.MeshStandardMaterial({ color: 0x221c17, roughness: 0.4 });
    const credenza = new THREE.Mesh(credenzaGeo, credenzaMat);
    credenza.position.set(0, 0.3, -4.0);
    credenza.castShadow = true;
    sofaGroup.add(credenza);

    scene.add(sofaGroup);

    // 7. Interactive Mouse Drag Orbit Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraAngle = 0;
    let cameraElev = 2.2;
    let cameraDist = 7.5;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      cameraAngle -= deltaX * 0.005;
      cameraElev += deltaY * 0.005;
      cameraElev = Math.max(0.6, Math.min(3.8, cameraElev));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch controls for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      cameraAngle -= deltaX * 0.005;
      cameraElev += deltaY * 0.005;
      cameraElev = Math.max(0.6, Math.min(3.8, cameraElev));

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    domElement.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Render Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera position interpolation
      if (!isDragging) {
        // Slow subtle breathing rotation
        cameraAngle += 0.0008;
      }

      const targetX = Math.sin(cameraAngle) * cameraDist;
      const targetZ = Math.cos(cameraAngle) * cameraDist;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (cameraElev - camera.position.y) * 0.05;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
      camera.lookAt(0, 1.2, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 500;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      domElement.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Effect: Update Flooring Material
  useEffect(() => {
    if (!floorMeshRef.current) return;
    const mat = floorMeshRef.current.material as THREE.MeshStandardMaterial;
    if (flooringType === 'marble') {
      mat.color.setHex(0xedebe4);
      mat.roughness = 0.08;
      mat.metalness = 0.2;
    } else if (flooringType === 'wood') {
      mat.color.setHex(0x543c29);
      mat.roughness = 0.45;
      mat.metalness = 0.05;
    } else if (flooringType === 'tiles') {
      mat.color.setHex(0x9ca3af);
      mat.roughness = 0.25;
      mat.metalness = 0.1;
    }
  }, [flooringType]);

  // Effect: Update Lighting Mode
  useEffect(() => {
    if (!ambientLightRef.current || !directionalLightRef.current) return;
    
    if (lightingMode === 'warm') {
      ambientLightRef.current.color.setHex(0xffecd2);
      ambientLightRef.current.intensity = 0.9;
      directionalLightRef.current.color.setHex(0xfff0dd);
      directionalLightRef.current.intensity = 1.8;
      pointLightsRef.current.forEach(pl => {
        pl.color.setHex(0xffa850);
        pl.intensity = 1.4;
      });
      if (coveLightMeshRef.current) {
        (coveLightMeshRef.current.material as THREE.MeshBasicMaterial).color.setHex(0xffb86c);
      }
    } else if (lightingMode === 'daylight') {
      ambientLightRef.current.color.setHex(0xffffff);
      ambientLightRef.current.intensity = 1.2;
      directionalLightRef.current.color.setHex(0xffffff);
      directionalLightRef.current.intensity = 2.4;
      pointLightsRef.current.forEach(pl => {
        pl.color.setHex(0xffffff);
        pl.intensity = 0.8;
      });
      if (coveLightMeshRef.current) {
        (coveLightMeshRef.current.material as THREE.MeshBasicMaterial).color.setHex(0xffffff);
      }
    } else if (lightingMode === 'evening') {
      ambientLightRef.current.color.setHex(0x384050);
      ambientLightRef.current.intensity = 0.4;
      directionalLightRef.current.color.setHex(0xff9944);
      directionalLightRef.current.intensity = 1.0;
      pointLightsRef.current.forEach(pl => {
        pl.color.setHex(0xffaa44);
        pl.intensity = 2.2;
      });
      if (coveLightMeshRef.current) {
        (coveLightMeshRef.current.material as THREE.MeshBasicMaterial).color.setHex(0xff8822);
      }
    } else if (lightingMode === 'cove') {
      ambientLightRef.current.color.setHex(0x20242c);
      ambientLightRef.current.intensity = 0.25;
      directionalLightRef.current.intensity = 0.3;
      pointLightsRef.current.forEach(pl => {
        pl.color.setHex(0xffb86c);
        pl.intensity = 3.0;
      });
      if (coveLightMeshRef.current) {
        (coveLightMeshRef.current.material as THREE.MeshBasicMaterial).color.setHex(0xffc580);
      }
    }
  }, [lightingMode]);

  // Effect: Update Feature Wall
  useEffect(() => {
    if (!backWallMeshRef.current) return;
    const mat = backWallMeshRef.current.material as THREE.MeshStandardMaterial;
    if (featureWall === 'charcoal') {
      mat.color.setHex(0x181a1f);
      mat.roughness = 0.6;
    } else if (featureWall === 'beige') {
      mat.color.setHex(0xd0c4b2);
      mat.roughness = 0.8;
    } else if (featureWall === 'wallpaper') {
      mat.color.setHex(0x8c785b);
      mat.roughness = 0.35;
    }
  }, [featureWall]);

  const setCameraPreset = (preset: 'panoramic' | 'ceiling' | 'flooring' | 'wall') => {
    setActivePreset(preset);
    if (!cameraRef.current) return;
    if (preset === 'panoramic') {
      cameraRef.current.position.set(0, 2.2, 7.5);
    } else if (preset === 'ceiling') {
      cameraRef.current.position.set(0, 1.2, 4.5);
      cameraRef.current.lookAt(0, 3.8, 0);
    } else if (preset === 'flooring') {
      cameraRef.current.position.set(0, 0.8, 4.0);
      cameraRef.current.lookAt(0, 0.1, -1.0);
    } else if (preset === 'wall') {
      cameraRef.current.position.set(0, 1.8, 4.8);
      cameraRef.current.lookAt(0, 2.0, -4.5);
    }
  };

  return (
    <section id="studio-section" className="relative w-full py-20 bg-raj-card/40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raj-gold/10 border border-raj-gold/30 text-xs font-mono text-raj-gold uppercase mb-3">
            <Box className="w-3.5 h-3.5" />
            <span>REAL-TIME 3D ARCHITECTURAL STUDIO</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-raj-cream tracking-tight mb-4">
            Interactive Interior Space Configurator
          </h2>
          <p className="text-sm sm:text-base text-raj-muted">
            Inspect lighting temperatures, explore flooring materials, and toggle feature wall crafts directly inside our 3D architectural viewer.
          </p>
        </div>

        {/* 3D Canvas Box + Live Control Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* 3D Viewport */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden glass-panel border border-white/10 relative min-h-[460px] sm:min-h-[540px] shadow-2xl flex items-center justify-center">
            
            {/* The WebGL Canvas Container */}
            <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Instruction Overlay */}
            <div className="absolute top-4 left-4 pointer-events-none z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-raj-bg/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-raj-sand">
              <Eye className="w-3.5 h-3.5 text-raj-gold animate-pulse" />
              <span>DRAG TO ORBIT 360°</span>
            </div>

            {/* Camera Presets Selector */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-10 flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-raj-bg/85 backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-mono text-raj-muted px-2 hidden sm:inline">VIEW:</span>
              <button
                onClick={() => setCameraPreset('panoramic')}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                  activePreset === 'panoramic' ? 'bg-raj-gold text-raj-bg font-bold' : 'text-raj-cream hover:bg-white/10'
                }`}
              >
                Panoramic
              </button>
              <button
                onClick={() => setCameraPreset('ceiling')}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                  activePreset === 'ceiling' ? 'bg-raj-gold text-raj-bg font-bold' : 'text-raj-cream hover:bg-white/10'
                }`}
              >
                Ceiling
              </button>
              <button
                onClick={() => setCameraPreset('flooring')}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                  activePreset === 'flooring' ? 'bg-raj-gold text-raj-bg font-bold' : 'text-raj-cream hover:bg-white/10'
                }`}
              >
                Flooring
              </button>
              <button
                onClick={() => setCameraPreset('wall')}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                  activePreset === 'wall' ? 'bg-raj-gold text-raj-bg font-bold' : 'text-raj-cream hover:bg-white/10'
                }`}
              >
                Feature Wall
              </button>
            </div>

          </div>

          {/* Configurator Controls Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* 1. Flooring Material Switcher */}
            <div className="glass-panel p-5 rounded-3xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono tracking-widest text-raj-gold uppercase">01. FLOORING FINISH</span>
                <span className="text-[11px] font-mono text-raj-muted capitalize">{flooringType}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setFlooringType('marble')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    flooringType === 'marble'
                      ? 'bg-raj-gold/20 border-raj-gold text-raj-gold font-bold shadow-md'
                      : 'bg-white/5 border-white/5 text-raj-cream hover:bg-white/10'
                  }`}
                >
                  <span className="block text-sm">🏛️</span>
                  <span>Marble</span>
                </button>
                <button
                  onClick={() => setFlooringType('wood')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    flooringType === 'wood'
                      ? 'bg-raj-gold/20 border-raj-gold text-raj-gold font-bold shadow-md'
                      : 'bg-white/5 border-white/5 text-raj-cream hover:bg-white/10'
                  }`}
                >
                  <span className="block text-sm">🪵</span>
                  <span>Wooden</span>
                </button>
                <button
                  onClick={() => setFlooringType('tiles')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    flooringType === 'tiles'
                      ? 'bg-raj-gold/20 border-raj-gold text-raj-gold font-bold shadow-md'
                      : 'bg-white/5 border-white/5 text-raj-cream hover:bg-white/10'
                  }`}
                >
                  <span className="block text-sm">◽</span>
                  <span>Tiles/PVC</span>
                </button>
              </div>
            </div>

            {/* 2. Lighting Atmosphere Switcher */}
            <div className="glass-panel p-5 rounded-3xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono tracking-widest text-raj-gold uppercase">02. LIGHTING MODE</span>
                <span className="text-[11px] font-mono text-raj-muted capitalize">{lightingMode}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setLightingMode('warm')}
                  className={`p-2.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                    lightingMode === 'warm'
                      ? 'bg-raj-gold/20 border-raj-gold text-raj-gold font-bold'
                      : 'bg-white/5 border-white/5 text-raj-cream hover:bg-white/10'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-raj-gold" />
                  <span>Warm Cove</span>
                </button>
                <button
                  onClick={() => setLightingMode('daylight')}
                  className={`p-2.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                    lightingMode === 'daylight'
                      ? 'bg-raj-gold/20 border-raj-gold text-raj-gold font-bold'
                      : 'bg-white/5 border-white/5 text-raj-cream hover:bg-white/10'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-raj-gold" />
                  <span>Daylight</span>
                </button>
                <button
                  onClick={() => setLightingMode('evening')}
                  className={`p-2.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                    lightingMode === 'evening'
                      ? 'bg-raj-gold/20 border-raj-gold text-raj-gold font-bold'
                      : 'bg-white/5 border-white/5 text-raj-cream hover:bg-white/10'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-raj-gold" />
                  <span>Evening Dusk</span>
                </button>
                <button
                  onClick={() => setLightingMode('cove')}
                  className={`p-2.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                    lightingMode === 'cove'
                      ? 'bg-raj-gold/20 border-raj-gold text-raj-gold font-bold'
                      : 'bg-white/5 border-white/5 text-raj-cream hover:bg-white/10'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-raj-gold" />
                  <span>Ceiling Ambient</span>
                </button>
              </div>
            </div>

            {/* 3. Feature Wall Craft */}
            <div className="glass-panel p-5 rounded-3xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono tracking-widest text-raj-gold uppercase">03. FEATURE WALL</span>
                <span className="text-[11px] font-mono text-raj-muted capitalize">{featureWall}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setFeatureWall('charcoal')}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                    featureWall === 'charcoal'
                      ? 'bg-raj-gold/20 border-raj-gold text-raj-gold font-bold'
                      : 'bg-white/5 border-white/5 text-raj-cream hover:bg-white/10'
                  }`}
                >
                  <span>Charcoal Louver</span>
                </button>
                <button
                  onClick={() => setFeatureWall('wallpaper')}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                    featureWall === 'wallpaper'
                      ? 'bg-raj-gold/20 border-raj-gold text-raj-gold font-bold'
                      : 'bg-white/5 border-white/5 text-raj-cream hover:bg-white/10'
                  }`}
                >
                  <span>Wallpaper</span>
                </button>
                <button
                  onClick={() => setFeatureWall('beige')}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                    featureWall === 'beige'
                      ? 'bg-raj-gold/20 border-raj-gold text-raj-gold font-bold'
                      : 'bg-white/5 border-white/5 text-raj-cream hover:bg-white/10'
                  }`}
                >
                  <span>Velvet Putty</span>
                </button>
              </div>
            </div>

            {/* Quick Reset button */}
            <button
              onClick={() => {
                setFlooringType('marble');
                setLightingMode('warm');
                setFeatureWall('charcoal');
                setCameraPreset('panoramic');
              }}
              className="py-2.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-raj-muted hover:text-raj-cream text-xs font-mono transition-colors flex items-center justify-center gap-2 border border-white/5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET STUDIO DEFAULTS</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
