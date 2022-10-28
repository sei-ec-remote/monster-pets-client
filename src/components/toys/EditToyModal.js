import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ToyForm from '../shared/ToyForm'
import { updateToy } from '../../api/toys'
import messages from '../shared/AutoDismissAlert/messages'


const EditToyModal = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh, pet 
    } = props

    const [toy, setToy] = useState(props.toy)

    const handleChange = (e) => {
        setToy(prevToy => {
            const name = e.target.name
            let value = e.target.value

            // handle the checkbox
            if (name === "isSqueaky" && e.target.checked) {
                value = true
            } else if (name === "isSqueaky" && !e.target.checked) {
                value = false
            }

            const updatedToy = { [name]: value }

            return {
                ...prevToy, ...updatedToy
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        updateToy(user, pet._id, toy)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.updateToySuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: messages.updateToyFailure + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <ToyForm 
                    toy={toy}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Give this pet a toy!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditToyModal