/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, Detailed, Environment } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

export interface Positioning {
  index: number
  z: number
  speed: number
}

export interface CroissantData {
  nodes: {Croissant_HIGH: {geometry: THREE.BufferGeometry}, Croissant_LOW:{geometry: THREE.BufferGeometry} }
  materials: {Croissant_LOW: THREE.Material }
}

function Croissant({ index, z, speed }: Positioning) {
  // const ref = useRef() as MutableRefObject<object>
  const ref = useRef(null as null | THREE.LOD)
  const { viewport, camera } = useThree()               
 
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])

  const { nodes, materials } = useGLTF('images/Croissant_Default.gltf') as unknown as CroissantData
 
  const [data] = useState({
    // Randomly distributing croissants vertically
    y: THREE.MathUtils.randFloatSpread(height * 2),
    // This gives us a random value between -1 and 1, we will multiply it with the viewport width
    x: THREE.MathUtils.randFloatSpread(2),
    // How fast croissants spin
    spin: THREE.MathUtils.randFloat(8, 12),
    // Some random rotations, Math.PI represents 360 degrees in radian
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI
  })
  // useFrame executes 60 times per second
  useFrame((state, dt) => {
    const lod = ref.current

    if (lod == null) return 
    // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
    // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
    // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
    if (dt < 0.1) lod.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z)
    // Rotate the object around
    lod.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))
    // Once they reach the top, send them again to the bottom
    if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
  })

  return (
    <Detailed ref={ref} distances={[20, 65, 80]}>
      <mesh geometry={nodes.Croissant_HIGH.geometry} material={materials.Croissant_LOW} />
      <mesh geometry={nodes.Croissant_LOW.geometry} material={materials.Croissant_LOW} />
    </Detailed>
  )
}



export default function Croissants({ speed = 1, count = 40, depth = 90, easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 25, near: 0.01, far: depth + 15 }}>
      {/* <color attach="background" args={['#075ff7']} /> */}
      <spotLight position={[10, 20, 50]} penumbra={1} intensity={3} color="orange" />
      {/* Cubic easing here to spread out objects a little more interestingly so a sole big object up front once in a while - Found this and not sure how it works */}
      {Array.from({ length: count }, (_, i) => <Croissant key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} />)}
      <Environment preset="sunset" />

      <EffectComposer multisampling={0}>
        <DepthOfField target={[0, 0, 60]} focalLength={0.5} bokehScale={14} height={700} />
      </EffectComposer>
    </Canvas>
  )
}
