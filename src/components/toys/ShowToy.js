import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'

const ShowToy = (props) => {
    const { toy, pet, user } = props

    // this will set the color of the card based on the condition
    const setBgCondition = (cond) => {
        if (cond === 'new') {
            return({ width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return({ width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({ width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    return (
        <>
            <Card className="m-2" style={setBgCondition(toy.condition)}>
                <Card.Header>{ toy.name }</Card.Header>
                <Card.Body>
                    <small>{ toy.description }</small><br/>
                    <small>
                        { toy.isSqueaky ? 'squeak squeak' : 'stoic silence'}
                    </small>
                </Card.Body>
                <Card.Footer>Condition: { toy.condition }</Card.Footer>
            </Card>
        </>
    )
}

export default ShowToy