import { useState } from "react"
import { useBox } from "@react-three/cannon"

import * as textures from "../images/textures"
import { useStore } from "../hooks/useStore"

export const Cube = ({ position, texture }) => {
	const [isHovered, setIsHovered] = useState(false)

	const [ref] = useBox(() => ({
		type: 'Static',
		position
	}))

	const activeTexture = textures[texture + 'Texture']

    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube])

	return (
		<mesh
			onPointerMove={(e) => {
				e.stopPropagation()
				setIsHovered(true)
			}}
			onPointerOut={(e) => {
				e.stopPropagation()
				setIsHovered(false)
			}}
			onClick={(e) => {
				e.stopPropagation()
				const clickedFace = Math.floor(e.faceIndex / 2)
				const { x, y, z } = ref.current.position
				if (e.altKey) {
					removeCube(x, y, z)
					return
				}
				else if (clickedFace === 0) {
					addCube(x + 1, y, z)
					return
				}
				else if (clickedFace === 1) {
					addCube(x - 1, y, z)
					return
				}
				else if (clickedFace === 2) {
					addCube(x, y + 1, z)
					return
				}
				else if (clickedFace === 3) {
					addCube(x, y - 1, z)
					return
				}
				else if (clickedFace === 4) {
					addCube(x, y, z + 1)
					return
				}
				else if (clickedFace === 5) {
					addCube(x, y, z - 1)
					return
				}
			}} 
            ref={ref}
        >
			<boxBufferGeometry attach="geometry" />
			<meshStandardMaterial
				map={activeTexture}
				attach="material" 
				color={isHovered ? 'grey' : 'white'}
				transparent={true}
				opacity={texture === 'glass' ? 0.6 : 1}
			/>
		</mesh>
	)
}