import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import MainScene from "../components/MainScene";

const Home: NextPage = () => {
  return (
    <div>
      <Canvas style={{ height: "100vh" }}>
        <MainScene />
      </Canvas>
      <h1 style={{ position: "absolute", bottom: 2, right: "50%" }}>
        Click to start
      </h1>
    </div>
  );
};

export default Home;
