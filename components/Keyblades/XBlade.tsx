import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { Group } from "three";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Xblade_Gold_0: THREE.Mesh;
    Xblade_Hilt_0: THREE.Mesh;
    Xblade_base_material_0: THREE.Mesh;
    Xblade_Material001_0: THREE.Mesh;
    Xblade_steelBlade_Sora__0: THREE.Mesh;
    Xblade_Material_0: THREE.Mesh;
  };
  materials: {
    Gold: THREE.MeshStandardMaterial;
    Hilt: THREE.MeshStandardMaterial;
    base_material: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
    steelBlade_Sora: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
  };
};

export function XBlade(props: any) {
  const { nodes, materials } = useGLTF(
    "/models/xblade/-blade_kingdom_hearts.glb"
  ) as unknown as GLTFResult;
  const [ref] = useBox(
    () => ({ mass: 1, position: [0, 10, 1], args: [1.2, 0.3, 0.1], ...props }),
    useRef<Group>(null)
  );

  return (
    <group {...props} ref={ref} dispose={null}>
      <group rotation={[0, 0, 0]} position={[1, 0, 0]} scale={0.1}>
        <group rotation={[0, 0, 0]} scale={0.02}>
          <group rotation={[0, 0, 1.3]} scale={[13.42, 13.42, 4.56]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Xblade_Gold_0.geometry}
              material={materials.Gold}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Xblade_Hilt_0.geometry}
              material={materials.Hilt}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Xblade_base_material_0.geometry}
              material={materials.base_material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Xblade_Material001_0.geometry}
              material={materials["Material.001"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Xblade_steelBlade_Sora__0.geometry}
              material={materials.steelBlade_Sora}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Xblade_Material_0.geometry}
              material={materials.Material}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/xblade/-blade_kingdom_hearts.glb");
