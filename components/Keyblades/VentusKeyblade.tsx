import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { Group } from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
    Object_3: THREE.Mesh;
    Object_4: THREE.Mesh;
  };
  materials: {
    initialShadingGroup: THREE.MeshStandardMaterial;
  };
};

export default function VentusKeyblade(props: any) {
  const { nodes, materials } = useGLTF(
    "/models/ventus_keyblade/ventus_keyblade_wayward_wind.glb"
  ) as unknown as GLTFResult;

  const [ref] = useBox(
    () => ({ mass: 1, position: [1, 10, 0], args: [1.4, 0.45, 0.1], ...props }),
    useRef<Group>(null)
  );

  return (
    <group {...props} ref={ref} dispose={null}>
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.3, 0]}
        scale={0.05}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.initialShadingGroup}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.initialShadingGroup}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.initialShadingGroup}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/ventus_keyblade/ventus_keyblade_wayward_wind.glb");
