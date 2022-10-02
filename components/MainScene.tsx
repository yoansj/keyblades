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

  useFrame((three, delta) => {
    // console.log(delta);
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

    if (clicked) {
      text.current!.position.y = lerp(text.current!.position.y, -6, 5 * delta);
    }
  });

  const ssrProps = useControls(
    "SSR Effect",
    {
      temporalResolve: true,
      STRETCH_MISSED_RAYS: true,
      USE_MRT: true,
      USE_NORMALMAP: true,
      USE_ROUGHNESSMAP: true,
      ENABLE_JITTERING: true,
      ENABLE_BLUR: true,
      temporalResolveMix: { value: 0.9, min: 0, max: 1 },
      temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
      maxSamples: { value: 0, min: 0, max: 1 },
      resolutionScale: { value: 1, min: 0, max: 1 },
      blurMix: { value: 0.5, min: 0, max: 1 },
      blurKernelSize: { value: 8, min: 0, max: 8 },
      blurSharpness: { value: 0.5, min: 0, max: 1 },
      rayStep: { value: 0.3, min: 0, max: 1 },
      intensity: { value: 1, min: 0, max: 5 },
      maxRoughness: { value: 0.1, min: 0, max: 1 },
      jitter: { value: 0.7, min: 0, max: 5 },
      jitterSpread: { value: 0.45, min: 0, max: 1 },
      jitterRough: { value: 0.1, min: 0, max: 1 },
      roughnessFadeOut: { value: 1, min: 0, max: 1 },
      rayFadeOut: { value: 0, min: 0, max: 1 },
      MAX_STEPS: { value: 20, min: 0, max: 20 },
      NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
      maxDepthDifference: { value: 3, min: 0, max: 10 },
      maxDepth: { value: 1, min: 0, max: 1 },
      thickness: { value: 10, min: 0, max: 10 },
      ior: { value: 1.45, min: 0, max: 2 },
    },
    { collapsed: true }
  );

  return (
    <>
      <Perf position="top-left" />
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
        {/* <SSR {...ssrProps} /> */}
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
