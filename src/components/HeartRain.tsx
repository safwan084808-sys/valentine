import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 1000
const dummy = new THREE.Object3D()

export function HeartRain({ active }: { active: boolean }) {
    const meshRef = useRef<THREE.InstancedMesh>(null)

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < COUNT; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [])

    useFrame((state) => {
        if (!active || !meshRef.current) return
        const mesh = meshRef.current

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle

            // Update time
            t = particle.t += speed / 2

            // Update position (falling down)
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)

            // Fall logic
            // Reset if too low
            if (particle.my < -50) particle.my = 50

            particle.my -= speed * 100 // Fall speed

            // Movement
            dummy.position.set(
                xFactor + Math.cos(t) * 2,
                particle.my, // Falling Y
                zFactor + Math.sin(t) * 2
            )

            dummy.scale.setScalar(0.5 + Math.random() * 0.5)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()

            mesh.setMatrixAt(i, dummy.matrix)
        })

        mesh.instanceMatrix.needsUpdate = true
    })

    // Initialize positions
    useEffect(() => {
        if (!meshRef.current) return;
        const mesh = meshRef.current
        particles.forEach((particle, i) => {
            particle.my = 50 + Math.random() * 50; // Start high up
            dummy.position.set(particle.xFactor, particle.my, particle.zFactor);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
    }, [particles]);

    if (!active) return null

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
            <extrudeGeometry args={[
                new THREE.Shape()
                    .moveTo(0.25, 0.25)
                    .bezierCurveTo(0.25, 0.25, 0.20, 0, 0, 0)
                    .bezierCurveTo(-0.30, 0, -0.30, 0.35, -0.30, 0.35)
                    .bezierCurveTo(-0.30, 0.55, -0.10, 0.77, 0.25, 0.95)
                    .bezierCurveTo(0.60, 0.77, 0.80, 0.55, 0.80, 0.35)
                    .bezierCurveTo(0.80, 0.35, 0.80, 0, 0.50, 0)
                    .bezierCurveTo(0.35, 0, 0.25, 0.25, 0.25, 0.25),
                { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 }
            ]} />
            <meshStandardMaterial color="#ff0033" emissive="#ff0000" emissiveIntensity={2} toneMapped={false} />
        </instancedMesh>
    )
}
