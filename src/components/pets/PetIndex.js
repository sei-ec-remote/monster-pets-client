import React, { useEffect, useState } from 'react' 
import { Link } from 'react-router-dom'
import { petIndex } from '../../api/pet'

const PetIndex = ({ user, msgAlert }) => {

    const [allPets, setAllPets] = useState([])

    useEffect(() => {
        petIndex(user)
        .then(res => {
            setAllPets(res.data.pets)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Pets Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const allPetsJSX = allPets.map(pet => {
        return (
            <Link to={`/pets/${pet._id}`} key={pet._id}>
                <li>Name: {pet.name} type: {pet.type}</li>
            </Link>
        )
    })

    return (
        <div className='container-md'>
            <ul>{allPetsJSX}</ul>
        </div>
    )
}

export default PetIndex