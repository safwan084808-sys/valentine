import { OrbitControls, PerspectiveCamera, Stars, Sparkles, Float, TorusKnot, Text } from '@react-three/drei'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { HeartRain } from './components/HeartRain'

// 3D Heart Geometry for the floating debris
function FloatingHearts({ count = 80 }) {
    const mesh = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor })
        }
        return temp
    }, [count])

    useFrame(() => {
        if (!mesh.current) return
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            t = particle.t += speed / 2

            // Gravity Well Logic: Spiral towards center
            // Calculate current radius based on time (getting smaller)
            const radius = 20 + Math.sin(t * 0.1) * 10

            // Spiral motion
            const x = Math.cos(t) * radius + (xFactor * 0.1)
            const y = Math.sin(t) * radius + (yFactor * 0.1)
            const z = Math.sin(t * 0.5) * radius * 0.5 + (zFactor * 0.1)

            dummy.position.set(x, y, z)

            // Look at center
            dummy.lookAt(0, 0, 0)

            // Pulsate scale
            const s = Math.cos(t * 2) * 0.3 + 0.8
            dummy.scale.set(s, s, s)

            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial color="#ff69b4" roughness={0.2} metalness={0.5} emissive="#ff1493" emissiveIntensity={0.5} />
        </instancedMesh>
    )
}

function CinematicCamera({ step }: { step: number }) {
    useFrame((state) => {
        const stepPositions = [
            new Vector3(0, 0, 22),    // 0: Intro
            new Vector3(0, 0, 16),    // 1: Message
            new Vector3(6, 2, 12),    // 2: Photos
            new Vector3(-6, 2, 12),   // 3: Video
            new Vector3(0, 0, 6),     // 4: Final
        ]

        // Smooth visual Move
        state.camera.position.lerp(stepPositions[step] || stepPositions[0], 0.03)
        state.camera.lookAt(0, 0, 0)

        // Dynamic FOV "Warp" effect based on speed/movement could be added here,
        // but let's keep it stable for visual clarity, just slight sway
        state.camera.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02

        // Subtle FOV pulse for warp effect
        state.camera.fov = 75 + Math.sin(state.clock.elapsedTime * 0.5) * 5;
        state.camera.updateProjectionMatrix();
    })
    return null
}

export function Scene({ step, heartRain }: { step: number, heartRain: boolean }) {
    const tunnelRef = useRef<THREE.Group>(null)
    const knotRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        // Tunnel Wave Animation
        if (tunnelRef.current) {
            tunnelRef.current.rotation.z += 0.002
            tunnelRef.current.children.forEach((child, i) => {
                child.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.1)
            })
        }

        // Heartbeat Pulse Animation for Center Knot
        if (knotRef.current) {
            const beat = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1 + (step === 4 ? Math.sin(state.clock.elapsedTime * 10) * 0.1 : 0)
            knotRef.current.scale.setScalar(beat * (step === 4 ? 1.5 : 1))
        }
    })

    return (
        <>
            <color attach="background" args={['#1a0510']} /> {/* Very Dark Pink/Black */}

            <CinematicCamera step={step} />

            {/* Universe Environment */}
            <Stars radius={300} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={500} scale={25} size={3} speed={0.4} opacity={0.8} color="#ff69b4" /> {/* Hot Pink Sparkles */}

            {/* Tunnel of Love (Dynamic Rings) */}
            <group ref={tunnelRef} rotation={[Math.PI / 2, 0, 0]}>
                {Array.from({ length: 15 }).map((_, i) => (
                    <mesh key={i} position={[0, 0, i * -2]} rotation={[0, 0, i * 0.5]}>
                        <torusGeometry args={[3 + i * 0.5, 0.05, 16, 100]} />
                        <meshStandardMaterial color={i % 2 === 0 ? "#ffc0cb" : "#ff1493"} emissive="#ff69b4" emissiveIntensity={0.5} />
                    </mesh>
                ))}
            </group>

            {/* Centerpiece: Beating Heart Knot */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh ref={knotRef} position={[0, 0, 0]}>
                    <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                    <meshStandardMaterial color="#ff69b4" roughness={0.1} metalness={0.8} emissive="#ff1493" emissiveIntensity={0.4} />
                </mesh>
            </Float>

            {/* Floating 3D Hearts */}
            <FloatingHearts count={100} />

            {/* HEART RAIN */}
            <HeartRain active={heartRain} />

            {/* Cinematic Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#ffc0cb" distance={50} /> {/* Pink Light */}
            <pointLight position={[-10, -10, -10]} intensity={2} color="#ff1493" distance={50} /> {/* Magenta Light */}
            <spotLight position={[0, 0, 20]} angle={0.3} penumbra={1} intensity={1.5} color="#ffffff" />
        </>
    )
}
