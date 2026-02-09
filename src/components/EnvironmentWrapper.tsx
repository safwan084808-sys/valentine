import { Stars, Sparkles, Environment } from '@react-three/drei'
import { LayerMaterial, Color, Depth } from 'lamina'
import * as THREE from 'three'

export function EnvironmentWrapper() {
    return (
        <>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Subtle floating particles */}
            <Sparkles count={50} scale={10} size={2} speed={0.4} opacity={0.5} color="#ff4d4d" />

            {/* Background Gradient Sphere - Nebula Effect */}
            <mesh scale={100}>
                <sphereGeometry args={[1, 64, 64]} />
                <LayerMaterial side={THREE.BackSide}>
                    <Color color="#000000" alpha={1} mode="normal" />
                    <Depth
                        colorA="#220000"
                        colorB="#000000"
                        alpha={0.5}
                        mode="normal"
                        near={0}
                        far={300}
                        origin={[100, 100, 100]}
                    />
                    <Depth
                        colorA="#1a0505"
                        colorB="#000000"
                        alpha={0.5}
                        mode="add"
                        near={0}
                        far={300}
                        origin={[-100, -100, -100]}
                    />
                </LayerMaterial>
            </mesh>

            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ff3333" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#330000" />

            <Environment preset="city" />
        </>
    )
}
