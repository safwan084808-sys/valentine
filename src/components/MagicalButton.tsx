import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'

interface MagicalButtonProps {
    onActivate: () => void;
    active: boolean;
}

export function MagicalButton({ onActivate, active }: MagicalButtonProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHover] = useState(false)

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime()
            const scale = 1 + Math.sin(t * 3) * 0.1
            meshRef.current.scale.setScalar(hovered ? scale * 1.2 : scale)
            meshRef.current.rotation.z += 0.01
            meshRef.current.rotation.x += 0.01
        }
    })

    return (
        <group position={[0, -5.5, 2]}>
            <mesh
                ref={meshRef}
                onClick={onActivate}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <icosahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial
                    color={active ? "#ff0000" : "#550000"}
                    emissive="#ff0000"
                    emissiveIntensity={active ? 5 : 1 + (hovered ? 2 : 0)}
                    toneMapped={false}
                />
            </mesh>

            {/* Light emitted from button */}
            <pointLight distance={10} intensity={active ? 5 : 2} color="#ff0000" />

            <Text
                position={[0, -1.5, 0]}
                fontSize={0.3}
                color="#ffaaaa"
                anchorX="center"
                anchorY="middle"
            >
                {active ? "LOVE UNLEASHED" : "ACTIVATE LOVE"}
                <meshBasicMaterial color="#ffaaaa" toneMapped={false} />
            </Text>
        </group>
    )
}
