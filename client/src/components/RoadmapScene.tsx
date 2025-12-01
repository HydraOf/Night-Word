import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface RoadmapStage {
  text: string;
  description: string;
  color: number;
}

const stages: RoadmapStage[] = [
  {
    text: 'Q1 2026',
    description: 'Запуск AI (улучшенная форма)',
    color: 0xff66ff,
  },
  {
    text: 'Q2 2026',
    description: 'Интерактивные истории и роли',
    color: 0x9966ff,
  },
  {
    text: 'Q3 2026',
    description: 'Сообщества и ночные события',
    color: 0x6600cc,
  },
  {
    text: 'Q4 2026',
    description: 'Полная соц-платформа Night Word',
    color: 0xaa33ff,
  },
];

export function RoadmapScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const frameRef = useRef<number>(0);
  const [webglError, setWebglError] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglError(true);
        return;
      }
    } catch {
      setWebglError(true);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a0033, 0.005);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;
    camera.position.y = 5;
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch {
      setWebglError(true);
      return;
    }

    const meshes: THREE.Mesh[] = [];

    stages.forEach((stage, i) => {
      let geometry: THREE.BufferGeometry;
      if (i === 0) geometry = new THREE.BoxGeometry(8, 5, 2);
      else if (i === 1) geometry = new THREE.SphereGeometry(4, 32, 32);
      else if (i === 2) geometry = new THREE.OctahedronGeometry(4);
      else geometry = new THREE.ConeGeometry(4, 8, 32);

      const material = new THREE.MeshStandardMaterial({
        color: stage.color,
        emissive: stage.color,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.9,
        roughness: 0.2,
        metalness: 0.3,
      });

      const mesh = new THREE.Mesh(geometry, material);

      const spacing = 25;
      const startX = -((stages.length - 1) * spacing) / 2;
      mesh.position.set(startX + i * spacing, 0, 0);
      mesh.rotation.x = Math.random() * 0.3;
      mesh.rotation.y = Math.random() * 0.5;
      mesh.userData.floatOffset = Math.random() * Math.PI * 2;
      mesh.userData.floatSpeed = 0.5 + Math.random() * 0.5;

      scene.add(mesh);
      meshes.push(mesh);
    });

    meshesRef.current = meshes;

    const light = new THREE.PointLight(0xff66ff, 2, 150);
    light.position.set(0, 30, 50);
    scene.add(light);

    const light2 = new THREE.PointLight(0x6600cc, 1.5, 100);
    light2.position.set(-50, -20, 30);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight || 500;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      meshesRef.current.forEach((mesh) => {
        mesh.rotation.y += 0.008;
        mesh.rotation.x += 0.002;
        const floatY = Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 2;
        mesh.position.y = floatY;
      });

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && container) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <section className="relative py-20 px-4" data-testid="roadmap-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 uppercase tracking-wider text-white">
          Дорожная карта
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Наш путь к созданию полноценной ночной платформы
        </p>

        {webglError ? (
          <div
            className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-pink-900/20 flex items-center justify-center"
            style={{ minHeight: '400px' }}
            data-testid="roadmap-canvas"
          >
            <p className="text-muted-foreground text-center">3D визуализация временно недоступна</p>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden"
            style={{ minHeight: '400px' }}
            data-testid="roadmap-canvas"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {stages.map((stage, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`backdrop-blur-lg bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/20 rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                hoveredIndex === index
                  ? 'border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.4)] scale-105 bg-purple-900/40'
                  : 'hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]'
              }`}
              data-testid={`roadmap-card-${index}`}
            >
              <div
                className="w-3 h-3 rounded-full mb-4"
                style={{ backgroundColor: `#${stage.color.toString(16).padStart(6, '0')}` }}
              />
              <h3 className="font-display text-lg font-bold text-white mb-2 uppercase tracking-wide">
                {stage.text}
              </h3>
              <p className="text-muted-foreground text-sm">{stage.description}</p>
              {hoveredIndex === index && (
                <div className="mt-4 pt-4 border-t border-purple-500/20 text-xs text-purple-300 animate-in fade-in">
                  Ключевая веха развития проекта
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
