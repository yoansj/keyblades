import { Debug, Physics } from "@react-three/cannon";
import {
  OrbitControls,
  Stage,
  Text,
  Environment,
  Text3D,
  useTexture,
  Center,
  Sky,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh } from "three";
import { lerp } from "three/src/math/MathUtils";
import useMainStore from "../stores/useMainStore";
import Keyblade from "./Keyblades/Keyblade";
import VentusKeyblade from "./Keyblades/VentusKeyblade";
import { XBlade } from "./Keyblades/XBlade";
import Plane from "./Plane";

export default function MainScene() {
  const clicked = useMainStore((state) => state.clicked);
  const text = useRef<Group>(null);
  const texture = useTexture("/textures/metal_anisotropic.jpg");

  useFrame((three, delta) => {
    three.camera.position.x = lerp(
      three.camera.position.x,
      three.mouse.x * 9,
      delta
    );

    three.camera.position.y = lerp(
      three.camera.position.y,
      three.mouse.y * 1.5,
      delta
    );

    three.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <axesHelper args={[5]} />
      <Sky />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <OrbitControls /> */}
      <Center front ref={text}>
        <Text3D
          font="/fonts/KHFont.json"
          letterSpacing={0.2}
          position={[0, 0, 0]}
          size={3}
        >
          Keyblades
          <meshMatcapMaterial attach="material" matcap={texture} />
        </Text3D>
      </Center>
      <Environment preset="city" />
      <Physics isPaused={clicked === false}>
        <Debug color="red" scale={1}>
          <Plane />
          <Keyblade />
          <VentusKeyblade />
          <XBlade />
        </Debug>
      </Physics>
    </>
  );
}
