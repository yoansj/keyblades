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
  useCursor,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group, Mesh } from "three";
import { damp, lerp } from "three/src/math/MathUtils";
import useMainStore from "../stores/useMainStore";
import Keyblade from "./Keyblades/Keyblade";
import VentusKeyblade from "./Keyblades/VentusKeyblade";
import { XBlade } from "./Keyblades/XBlade";
import Plane from "./Plane";
import { Perf } from "r3f-perf";
import { EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";

export default function MainScene() {
  const clicked = useMainStore((state) => state.clicked);
  const setClicked = useMainStore((state) => state.setClicked);
  const text = useRef<Group>(null);
  const texture = useTexture("/textures/metal_anisotropic.jpg");
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  const debug = useControls(
    "Debug",
    {
      orbitControls: false,
    },
    { collapsed: true }
  );

  useFrame((three, delta) => {
    // console.log(delta);
    if (clicked === false && debug.orbitControls === false) {
      three.camera.position.x = damp(
        three.camera.position.x,
        three.mouse.x * 9,
        0.5,
        delta
      );

      three.camera.position.y = damp(
        three.camera.position.y,
        three.mouse.y * 1.5,
        0.5,
        delta
      );

      three.camera.lookAt(0, 0, 0);
    } else if (clicked === true && debug.orbitControls === false) {
      three.camera.position.x = damp(three.camera.position.x, 2.64, 0.5, delta);
      three.camera.position.y = damp(
        three.camera.position.y,
        -0.03,
        0.5,
        delta
      );
      three.camera.position.z = damp(three.camera.position.z, 2.72, 0.5, delta);
      three.camera.lookAt(0, -2, 0);
    }

    if (clicked) {
      text.current!.position.y = lerp(text.current!.position.y, -6, 5 * delta);
    }
  });

  return (
    <>
      <Perf position="top-left" />
      <axesHelper args={[5]} />
      <Sky />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {debug.orbitControls && <OrbitControls />}
      <Center front ref={text}>
        <Text3D
          font="/fonts/KHFont.json"
          letterSpacing={0.2}
          position={[0, 0, 0]}
          size={3}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => {
            setClicked(true);
          }}
        >
          Keyblades
          <meshMatcapMaterial attach="material" matcap={texture} />
        </Text3D>
      </Center>
      <Environment preset="sunset" />
      <EffectComposer>
        <Physics isPaused={clicked === false}>
          <Debug color="red" scale={1}>
            <Plane />
            <Keyblade />
            <VentusKeyblade />
            <XBlade />
          </Debug>
        </Physics>
      </EffectComposer>
    </>
  );
}
