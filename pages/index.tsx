import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import MainScene from "../components/MainScene";

const Home: NextPage = () => {
  return (
    <Canvas style={{ height: "100vh" }}>
      <MainScene />
    </Canvas>
  );
};

export default Home;
