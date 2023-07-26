import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';

function App() {
  return (
    <>
      {/* <div>Outside Canvas</div> */}
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
      </Canvas>
    </>
  );
}

export default App;
