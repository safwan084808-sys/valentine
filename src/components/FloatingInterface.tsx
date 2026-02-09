import { MeshTransmissionMaterial, Text, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export function FloatingInterface() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
            groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.1) * 0.05
        }
    })

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* Main Glass Panel */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[12, 8, 0.2]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        thickness={0.5}
                        chromaticAberration={0.1}
                        anisotropy={0.1}
                        distortion={0.1}
                        distortionScale={0.1}
                        temporalDistortion={0.1}
                        ior={1.5}
                        color="#ffcccc"
                        background={new THREE.Color('#000000')}
                    />
                </mesh>

                {/* Neon Border */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[12.1, 8.1, 0.1]} />
                    <meshBasicMaterial color="#ff0044" toneMapped={false} wireframe />
                </mesh>

                <Text
                    position={[0, 3.5, 0.2]}
                    fontSize={0.5}
                    color="#ff0044"
                    anchorX="center"
                    anchorY="middle"
                    font="https://fonts.gstatic.com/s/cinzel/v11/8vIJ7wvpjjqJpr8g4y8u9g.woff" // Example distinct font
                >
                    ETERNAL MEMORIES
                    <meshBasicMaterial color="#ff0044" toneMapped={false} />
                </Text>

                <PhotoGrid />
            </Float>
        </group>
    )
}

function PhotoGrid() {
    // Placeholder frames arrangement
    const positions = [
        [-3, 1, 0.3], [0, 1, 0.3], [3, 1, 0.3],
        [-3, -2, 0.3], [0, -2, 0.3], [3, -2, 0.3]
    ]

    return (
        <group>
            {positions.map((pos, i) => (
                <Frame key={i} position={pos as [number, number, number]} index={i} />
            ))}
        </group>
    )
}

function Frame({ position, index }: { position: [number, number, number], index: number }) {
    return (
        <group position={position}>
            {/* Frame Border */}
            <mesh>
                <planeGeometry args={[2.5, 2.5]} />
                <meshBasicMaterial color="#000" />
            </mesh>
            <mesh position={[0, 0, 0.01]}>
                <planeGeometry args={[2.4, 2.4]} />
                <meshBasicMaterial color={`hsl(${340 + index * 10}, 100%, 20%)`} />
            </mesh>
            {/* Neon Rim */}
            <mesh position={[0, 0, 0.02]}>
                <ringGeometry args={[1.2, 1.25, 32]} />
                <meshBasicMaterial color="#ff0055" toneMapped={false} />
            </mesh>

            <Text
                position={[0, -1.5, 0]}
                fontSize={0.15}
                color="#ffaaaa"
                anchorX="center"
                anchorY="middle"
            >
                Start of Forever {index + 1}
            </Text>
        </group>
    )
}
