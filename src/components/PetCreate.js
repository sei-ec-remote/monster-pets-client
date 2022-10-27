import React, { useState } from 'react' 
import { petCreate } from '../api/pet'

const PetCreate = ({ user, msgAlert }) => {

    const defaultPet = {
        name: '',
        type: ''
    }

    const [pet, setPet] = useState(defaultPet)

    const handleChange = (event) => {
        // to keep the values as users input info 
        // first spread the current pet
        // then comma and modify the key to the value you need
        setPet({...pet, [event.target.name]: event.target.value})
    }

    const handleCreatePet = () => {
        petCreate(pet, user)
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: 'Create Pet',
                variant: 'success'
            })
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Create Pet Failure' + error,
                variant: 'danger'
            })
        })
    }

    return (
			<>
				<input
					type='text'
					value={pet.name}
					name='name'
					onChange={handleChange}
				/>
				<input
					type='text'
					value={pet.type}
					name='type'
					onChange={handleChange}
				/>
				<button onClick={handleCreatePet}>Create Pet</button>
			</>
		)
}

export default PetCreate