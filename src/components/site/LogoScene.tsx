"use client";

import {Canvas} from "@react-three/fiber";
import {ContactShadows, Float, RoundedBox} from "@react-three/drei";
import * as THREE from "three";
import type {Locale} from "@/types/content";

type LogoSceneProps = {
  progress: number;
  locale: Locale;
};

type Vec3 = [number, number, number];

function ease(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function mix(from: Vec3, to: Vec3, progress: number): Vec3 {
  const eased = ease(progress);
  return [
    THREE.MathUtils.lerp(from[0], to[0], eased),
    THREE.MathUtils.lerp(from[1], to[1], eased),
    THREE.MathUtils.lerp(from[2], to[2], eased)
  ];
}

function MonogramGeometry() {
  const white = "#ffffff";
  const purple = "#8b5cf6";

  return (
    <group>
      {[
        {position: [-1.45, 0, 0] as Vec3, rotation: 0.34},
        {position: [-1.03, 0, 0.01] as Vec3, rotation: -0.34},
        {position: [-0.61, 0, 0.02] as Vec3, rotation: 0.34},
        {position: [-0.19, 0, 0.03] as Vec3, rotation: -0.34}
      ].map((stroke, index) => (
        <RoundedBox
          key={`w-${index}`}
          args={[0.24, 1.34, 0.22]}
          radius={0.04}
          smoothness={4}
          position={stroke.position}
          rotation={[0, 0, stroke.rotation]}
        >
          <meshStandardMaterial color={white} metalness={0.78} roughness={0.16} />
        </RoundedBox>
      ))}

      <RoundedBox args={[0.24, 1.36, 0.24]} radius={0.04} smoothness={4} position={[0.62, 0, 0.04]}>
        <meshStandardMaterial color={white} metalness={0.78} roughness={0.16} />
      </RoundedBox>
      {[
        [1.1, 0.42, 0.04],
        [1.16, 0, 0.05],
        [1.1, -0.42, 0.04]
      ].map((position, index) => (
        <RoundedBox
          key={`b-${index}`}
          args={[0.96, 0.24, 0.24]}
          radius={0.07}
          smoothness={6}
          position={position as Vec3}
        >
          <meshStandardMaterial color={white} metalness={0.78} roughness={0.16} />
        </RoundedBox>
      ))}
      {[
        [1.58, 0.21, 0.03],
        [1.58, -0.22, 0.03]
      ].map((position, index) => (
        <RoundedBox
          key={`b-side-${index}`}
          args={[0.24, 0.52, 0.22]}
          radius={0.08}
          smoothness={6}
          position={position as Vec3}
        >
          <meshStandardMaterial color={white} metalness={0.78} roughness={0.16} />
        </RoundedBox>
      ))}
      <RoundedBox args={[0.24, 0.56, 0.18]} radius={0.04} smoothness={4} position={[-0.76, 0.1, 0.17]}>
        <meshStandardMaterial color={purple} emissive={purple} emissiveIntensity={0.32} roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[0.74, 0.12, 0.18]} radius={0.04} smoothness={4} position={[1.18, 0.21, 0.18]}>
        <meshStandardMaterial color={purple} emissive={purple} emissiveIntensity={0.42} roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[0.74, 0.12, 0.18]} radius={0.04} smoothness={4} position={[1.18, -0.22, 0.18]}>
        <meshStandardMaterial color={purple} emissive={purple} emissiveIntensity={0.42} roughness={0.2} />
      </RoundedBox>
    </group>
  );
}

function RobotLogo({progress}: {progress: number}) {
  const violet = new THREE.Color("#9b72ff");

  return (
    <group rotation={[0.05, -0.24 + progress * 0.18, 0]}>
      <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.18}>
        <mesh position={mix([-3.2, 1.8, -1.4], [0, 1.35, 0], progress)} scale={[2.35, 1.05, 0.72]}>
          <sphereGeometry args={[1, 48, 32]} />
          <meshStandardMaterial color="#f7f8fb" metalness={0.72} roughness={0.2} />
        </mesh>

        <RoundedBox
          args={[3.05, 0.9, 0.24]}
          radius={0.22}
          smoothness={8}
          position={mix([3.2, 1.35, 1.1], [0, 1.25, 0.67], progress)}
        >
          <meshStandardMaterial color="#080b13" metalness={0.3} roughness={0.28} />
        </RoundedBox>

        {[
          {from: [-2.8, 0.2, 1.4] as Vec3, to: [-0.62, 1.25, 0.83] as Vec3},
          {from: [2.8, 0.2, 1.4] as Vec3, to: [0.62, 1.25, 0.83] as Vec3}
        ].map((eye, index) => (
          <RoundedBox
            key={index}
            args={[0.28, 0.58, 0.08]}
            radius={0.14}
            smoothness={8}
            position={mix(eye.from, eye.to, progress)}
          >
            <meshStandardMaterial
              color="#c4a7ff"
              emissive={violet}
              emissiveIntensity={1.8}
              roughness={0.18}
            />
          </RoundedBox>
        ))}

        <mesh position={mix([0, 4.2, -1.1], [0, 2.55, 0], progress)} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.15, 0.9, 28]} />
          <meshStandardMaterial color="#f7f8fb" metalness={0.75} roughness={0.22} />
        </mesh>
        <mesh position={mix([0.9, 4.6, -1.6], [0, 3.06, 0], progress)}>
          <sphereGeometry args={[0.28, 32, 24]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.18} />
        </mesh>

        <mesh position={mix([0, -2.9, -1.2], [0, 0.72, -0.2], progress)} rotation={[0, 0, 0]}>
          <torusGeometry args={[2.15, 0.055, 20, 128]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive={violet}
            emissiveIntensity={0.45}
            metalness={0.65}
            roughness={0.22}
          />
        </mesh>

        <RoundedBox
          args={[4.8, 1.18, 0.42]}
          radius={0.08}
          smoothness={5}
          position={mix([-2.3, -3.6, 0.4], [-0.48, -0.5, 0.05], progress)}
          rotation={[0, 0, -0.04]}
        >
          <meshStandardMaterial color="#f7f8fb" metalness={0.68} roughness={0.2} />
        </RoundedBox>

        <group
          position={mix([2.9, -3.3, 0.7], [0, -0.54, 0.34], progress)}
          scale={[0.86, 0.86, 0.86]}
        >
          <MonogramGeometry />
        </group>

        <RoundedBox
          args={[3.8, 0.42, 0.28]}
          radius={0.05}
          smoothness={4}
          position={mix([0, -4.8, 1], [0, -1.55, 0.12], progress)}
        >
          <meshStandardMaterial color="#090c15" metalness={0.48} roughness={0.28} />
        </RoundedBox>

        <group position={mix([0, -5.3, 1.2], [0, -1.55, 0.34], progress)}>
          <RoundedBox args={[1.28, 0.08, 0.1]} radius={0.03} smoothness={4} position={[-0.78, 0, 0]}>
            <meshStandardMaterial color="#f8fafc" metalness={0.72} roughness={0.18} />
          </RoundedBox>
          <RoundedBox args={[0.18, 0.08, 0.1]} radius={0.03} smoothness={4} position={[0.02, 0, 0]}>
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.42} />
          </RoundedBox>
          <RoundedBox args={[1.28, 0.08, 0.1]} radius={0.03} smoothness={4} position={[0.82, 0, 0]}>
            <meshStandardMaterial color="#a78bfa" emissive="#5b2fb8" emissiveIntensity={0.2} />
          </RoundedBox>
        </group>
      </Float>
    </group>
  );
}

export default function LogoScene({progress}: LogoSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.65]}
      camera={{position: [0, 0.6, 7.5], fov: 38}}
      gl={{antialias: true, alpha: true, powerPreference: "high-performance"}}
      className="h-full w-full"
    >
      <ambientLight intensity={0.8} />
      <hemisphereLight args={["#ffffff", "#241246", 1.1]} />
      <directionalLight position={[4, 5, 5]} intensity={2.8} />
      <pointLight position={[-4, -1, 3]} color="#8b5cf6" intensity={9} distance={8} />
      <RobotLogo progress={progress} />
      <ContactShadows position={[0, -2.25, 0]} opacity={0.38} scale={7} blur={2.6} far={4} />
    </Canvas>
  );
}
