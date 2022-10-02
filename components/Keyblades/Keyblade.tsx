import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { Group } from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Blade_hi_Metal_m_0: THREE.Mesh;
    Keychain_hi_Metal_m_0: THREE.Mesh;
    Blue_hi_Blue_m_0: THREE.Mesh;
    Gurad_hi_Gurad_m_0: THREE.Mesh;
    Holder_hi_Metal_m_0: THREE.Mesh;
    Grip_hi_Grip_m_0: THREE.Mesh;
    Grip_hi_Grip_m_0_1: THREE.Mesh;
  };
  materials: {
    Metal_m: THREE.MeshStandardMaterial;
    Blue_m: THREE.MeshStandardMaterial;
    Gurad_m: THREE.MeshStandardMaterial;
    Grip_m: THREE.MeshStandardMaterial;
  };
};

export default function Keyblade(props: any) {
  const { nodes, materials } = useGLTF(
    "/models/keyblade/keyblade_kingdom_hearts_subdivide.glb"
  ) as unknown as GLTFResult;
  const [ref] = useBox(
    () => ({ mass: 1, position: [0, 10, 0], args: [1.2, 0.3, 0.1], ...props }),
    useRef<Group>(null)
  );

  return (
    <group ref={ref} dispose={null}>
      <group position={[0.66, 0, 0]} rotation={[-Math.PI / 2, -Math.PI / 2, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Blade_hi_Metal_m_0.geometry}
            material={materials.Metal_m}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Keychain_hi_Metal_m_0.geometry}
            material={materials.Metal_m}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Blue_hi_Blue_m_0.geometry}
            material={materials.Blue_m}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Gurad_hi_Gurad_m_0.geometry}
            material={materials.Gurad_m}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Holder_hi_Metal_m_0.geometry}
            material={materials.Metal_m}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Grip_hi_Grip_m_0.geometry}
            material={materials.Grip_m}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Grip_hi_Grip_m_0_1.geometry}
            material={materials.Grip_m}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/keyblade/keyblade_kingdom_hearts_subdivide.glb");
