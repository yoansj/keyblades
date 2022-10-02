import { usePlane } from "@react-three/cannon";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useRef, useState } from "react";
import type { Mesh } from "three";

export default function Plane() {
  const [ref] = usePlane(
    () => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -2, 0] }),
    useRef<Mesh>(null)
  );
  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[100, 100]} />
      {/* <meshStandardMaterial color="#555555" metalness={0} roughness={0} /> */}
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={20}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050505"
        // color="#555555"
        metalness={0.5}
        mirror={0.5}
      />
    </mesh>
  );
}
