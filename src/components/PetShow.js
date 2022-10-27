import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { petDelete, petShow, petUpdate } from '../api/pet'
import PetUpdate from './PetUpdate'

const PetShow = ({ user, msgAlert }) => {

    const [pet, setPet] = useState({})
    const [isUpdateShown, setIsUpdateShown] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        petShow(user, id)
        .then((res) => {
            setPet(res.data.pet)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Show Pet Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const toggleShowUpdate = () => {
        setIsUpdateShown(prevUpdateShown => !prevUpdateShown)
    }

    const handleChange = (event) => {
        // to keep the values as users input info 
        // first spread the current pet
        // then comma and modify the key to the value you need
        setPet({...pet, [event.target.name]: event.target.value})
    }

    const handleUpdatePet = () => {
        petUpdate(pet, user, id)
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: 'Updating Pet',
                variant: 'success'
            })
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Update Pet Failure' + error,
                variant: 'danger'
            })
        })
    }

    const handleDeletePet = () => {
        petDelete(user, id)
        .then(() => {
            setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'Deleting a Pet',
                variant: 'success'
            })
            
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Deleting a Pet Failure' + error,
                variant: 'danger'
            })
        })
    }

    // logical &&
    // both sides of this check NEED to be truthy values = true
    // logical ||
    // only one side of this check needs to be truthy = true

    // oneliner
    if (deleted) navigate('/pets')
    // if (deleted) {
    //     navigate('/pets')
    // }

    return (
			<>
				<h3>Name: {pet.name}</h3>
				<p>Type: {pet.type}</p>
				<button onClick={toggleShowUpdate}>Toggle Update</button>
				{isUpdateShown && (
					<PetUpdate
						pet={pet}
						handleChange={handleChange}
						handleUpdatePet={handleUpdatePet}
					/>
				)}
                <button onClick={handleDeletePet} >Delete</button>
			</>
		)
}

export default PetShow