import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// A subtle, non-interactive Three.js background that renders a low-poly
// circuit-board-like grid with glowing lines and nodes. Designed to be
// visually pleasing but not distracting. Pointer events are disabled.
const HeroModel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 12, 26);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor(0x000000, 0.0);
    container.appendChild(renderer.domElement);

    // lights
  const hemi = new THREE.HemisphereLight(0x202025, 0x080808, 0.35);
    scene.add(hemi);
  const dir = new THREE.DirectionalLight(0x99d5ff, 0.25);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    // grid geometry (plane with lines and small nodes)
    const gridGroup = new THREE.Group();

    const gridSize = 40;
    const spacing = 1.0;

  // centered white grid with subtle opacity for contrast
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.18, transparent: true });
  const accentMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.26, transparent: true });

  const nodeGeometry = new THREE.CircleGeometry(0.06, 12);
  const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.42, transparent: true });

    for (let i = -gridSize/2; i <= gridSize/2; i++){
      const pointsH: THREE.Vector3[] = [];
      const pointsV: THREE.Vector3[] = [];
      for (let j = -gridSize/2; j <= gridSize/2; j++){
        pointsH.push(new THREE.Vector3(j * spacing, 0, i * spacing));
        pointsV.push(new THREE.Vector3(i * spacing, 0, j * spacing));

          if (Math.random() < 0.02) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.set(j*spacing, 0.01, i*spacing);
            node.rotation.x = -Math.PI/2;
            gridGroup.add(node);
          }
      }
      const geometryH = new THREE.BufferGeometry().setFromPoints(pointsH);
      const lineH = new THREE.Line(geometryH, Math.random() > 0.6 ? accentMaterial : lineMaterial);
      gridGroup.add(lineH);

      const geometryV = new THREE.BufferGeometry().setFromPoints(pointsV);
      const lineV = new THREE.Line(geometryV, Math.random() > 0.6 ? accentMaterial : lineMaterial);
      gridGroup.add(lineV);
    }

    gridGroup.rotation.x = -Math.PI/2;
    gridGroup.position.y = -6;
    scene.add(gridGroup);

    // subtle floating geometry to add depth
    const boxGeo = new THREE.BoxGeometry(1.6, 0.12, 1.6);
  const boxMat = new THREE.MeshStandardMaterial({ color: 0x000b10, emissive: 0x001824, roughness: 0.6, metalness: 0.15 });
    for (let k = 0; k < 8; k++){
      const box = new THREE.Mesh(boxGeo, boxMat);
      box.position.set((Math.random()-0.5)*20, (Math.random()*1.2)+0.2, (Math.random()-0.5)*20);
      box.rotation.y = Math.random()*Math.PI;
      box.scale.setScalar(0.8 + Math.random()*1.2);
      scene.add(box);
    }

    // subtle bloom-like glow via additive sprites (cheap)
  const spriteMat = new THREE.SpriteMaterial({ color: 0xffffff, opacity: 0.04, transparent: true, blending: THREE.AdditiveBlending });
    for (let s = 0; s < 30; s++){
      const sprite = new THREE.Sprite(spriteMat);
  sprite.position.set((Math.random()-0.5)*40, 0.2 + Math.random()*1.5, (Math.random()-0.5)*40);
  sprite.scale.set(6,6,1);
      scene.add(sprite);
    }

    // animation loop with smoother behavior: camera lerp, traveling pulses, mouse parallax
    let disposed = false;
    const clock = new THREE.Clock();
    const baseY = gridGroup.position.y;

    // create a few pulse sprites that travel along Z axis
  const pulseMat = new THREE.SpriteMaterial({ color: 0xffffff, opacity: 0.14, transparent: true, blending: THREE.AdditiveBlending });
    const pulses: THREE.Sprite[] = [];
    for (let p = 0; p < 6; p++){
      const sp = new THREE.Sprite(pulseMat.clone());
      sp.scale.set(12, 2.6, 1);
      sp.position.set((Math.random()-0.5)*18, 0.3, (Math.random()*40)-20);
      scene.add(sp);
      pulses.push(sp);
    }

    // track mouse for gentle parallax
    const mouse = { x: 0, y: 0 };
    function onMove(e: MouseEvent){
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    }
    window.addEventListener('mousemove', onMove);

    // helper lerp
    function lerp(a:number, b:number, t:number){ return a + (b-a) * t; }

    // desired camera target positions for smooth interpolation
    const camTarget = new THREE.Vector3();
    function animate(){
      if (disposed) return;
      const elapsed = clock.getElapsedTime();

      // compute sway + forward progression
      const swayX = Math.sin(elapsed * 0.04) * 3.2;
      const forwardZ = 28 - (elapsed * 0.02 % 40);
      const bobY = 11.8 + Math.sin(elapsed * 0.02) * 0.28;

      // incorporate mouse parallax (subtle)
      camTarget.x = swayX + mouse.x * 2.2;
      camTarget.y = bobY + mouse.y * 1.6;
      camTarget.z = forwardZ + mouse.x * -1.2;

      // smooth camera interpolation
      camera.position.x = lerp(camera.position.x, camTarget.x, 0.035);
      camera.position.y = lerp(camera.position.y, camTarget.y, 0.035);
      camera.position.z = lerp(camera.position.z, camTarget.z, 0.02);
      camera.lookAt(lerp(camera.position.x, 0, 0.1), lerp(camera.position.y, 0, 0.08), 0);

      // subtle parallax and drift
  gridGroup.rotation.z = Math.sin(elapsed * 0.012) * 0.018;
  // keep grid centered on z-axis
  gridGroup.position.z = 0;
      gridGroup.position.y = baseY + Math.sin(elapsed * 0.05) * 0.08;

      // animate pulses moving along Z and fading in/out
      for (let i = 0; i < pulses.length; i++){
        const sp = pulses[i];
        sp.position.z -= 0.18 + i*0.02;
        if (sp.position.z < -40) sp.position.z = 40 + Math.random()*6;
        // width modulation for slight life
        sp.scale.x = 10 + 6 * Math.sin(elapsed * 1.5 + i);
        sp.material.opacity = 0.06 + 0.08 * (0.5 + 0.5 * Math.sin(elapsed * 1.2 + i));
      }

      // per-node pulsing and slight line shimmer (only adjust opacity to keep CPU low)
      for (let i = 0; i < gridGroup.children.length; i++){
        const child: any = gridGroup.children[i];
        const seed = (child.position?.x || 0) * 0.08 + (child.position?.z || 0) * 0.05 + i * 0.02;
        if (child.type === 'Mesh' && child.material) {
          const mat: any = child.material;
          mat.opacity = Math.max(0.12, 0.48 + 0.12 * Math.sin(elapsed * 1.9 + seed));
          mat.needsUpdate = true;
        }
        if (child.type === 'Line' && child.material) {
          const lmat: any = child.material;
          lmat.opacity = Math.max(0.08, (lmat.opacity || 0.18) + 0.04 * Math.sin(elapsed * 0.5 + seed));
          lmat.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    // handle resize
    function onResize(){
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      window.removeEventListener('resize', onResize);
      try { renderer.dispose(); } catch (e) {}
      if (renderer.domElement && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none hero-model-wrapper" aria-hidden />
  );
};

export default HeroModel;
