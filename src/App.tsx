import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'
import { DarkOverlay } from './components/DarkOverlay'
import { Suspense, useState } from 'react'

function App() {
  const [step, setStep] = useState(0)
  const [heartRain, setHeartRain] = useState(false) // State for Heart Rain

  return (
    <>
      <DarkOverlay step={step} setStep={setStep} heartRain={heartRain} setHeartRain={setHeartRain} />

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: false }}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      >
        <Suspense fallback={null}>
          <Scene step={step} heartRain={heartRain} />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
