import React, { useEffect, useState } from 'react' 
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { petIndex } from '../../api/pet'
import LoadingScreen from '../shared/LoadingScreen'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

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

    const petCards = allPets.map(pet => (
        <Card key={ pet.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ pet.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={ `/pets/${pet.id}` }>View { pet.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    if (!allPets) {
        return <LoadingScreen />
    }

    return (
        <div className='container-md' style={ cardContainerLayout }>
            { petCards }
        </div>
    )
}

export default PetIndex