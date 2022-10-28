import React, { useState, useEffect } from 'react'
import PetIndex from "./pets/PetIndex"
import images from './shared/images'

const Home = (props) => {
	const { msgAlert } = props

	return (
		<div className='container-md'>
			<img src={`${images.cat}`}/>
			<img src={`${images.dog}`}/>
			<h2>All the pets</h2>
			<PetIndex msgAlert={msgAlert}/>
		</div>
	)
}

export default Home
