import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { petDelete, petShow, petUpdate } from '../../api/pet'
// import PetUpdate from './PetUpdate' <--no longer using in lieu of the modal
import EditPetModal from './EditPetModal'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PetShow = ({ user, msgAlert }) => {

    const [pet, setPet] = useState({})
    // const [isUpdateShown, setIsUpdateShown] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)

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
    }, [updated])

    // const toggleShowUpdate = () => {
    //     setIsUpdateShown(prevUpdateShown => !prevUpdateShown)
    // }

    const handleChange = (event) => {
        // to keep the values as users input info 
        // first spread the current pet
        // then comma and modify the key to the value you need
        setPet({...pet, [event.target.name]: event.target.value})
    }

    // const handleUpdatePet = () => {
    //     petUpdate(pet, user, id)
    //     .then(() => {
    //         msgAlert({
    //             heading: 'Success',
    //             message: 'Updating Pet',
    //             variant: 'success'
    //         })
    //     })
    //     .catch((error) => {
    //         msgAlert({
    //             heading: 'Failure',
    //             message: 'Update Pet Failure' + error,
    //             variant: 'danger'
    //         })
    //     })
    // }

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
			<Container className="fluid">
                <Card>
                <Card.Header>{ pet.fullTitle }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>Age: { pet.age }</small></div>
                        <div><small>Type: { pet.type }</small></div>
                        <div>
                            <small>
                                Adoptable?: { pet.adoptable ? 'yes' : 'no' }
                            </small>
                        </div>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    { 
                        pet.owner && user && pet.owner._id === user._id 
                        ?
                        <>
                            <Button onClick={() => setEditModalShow(true)} className="m-2" variant="warning">
                                Edit Pet
                            </Button>
                            <Button onClick={() => handleDeletePet()}
                                className="m-2"
                                variant="danger"
                            >
                                Set { pet.name } Free
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
                    {/* <h3>Name: {pet.name}</h3>
                    <p>Type: {pet.type}</p>
                    <button onClick={toggleShowUpdate}>Toggle Update</button>
                    {isUpdateShown && (
                        <PetUpdate
                            pet={pet}
                            handleChange={handleChange}
                            handleUpdatePet={handleUpdatePet}
                        />
                    )}
                    <button onClick={handleDeletePet} >Delete</button> */}
                </Card>
            </Container>
            <EditPetModal 
                user={user}
                pet={pet}
                show={editModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
        </>
    )
}

export default PetShow