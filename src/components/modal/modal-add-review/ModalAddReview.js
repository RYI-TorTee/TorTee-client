import React, { useState } from 'react'
import './ModalAddReview.scss'
import { Button, Modal } from 'react-bootstrap';

export default function ModalAddReview({ mentorId, onClose }) {



    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Review Mentor</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button variant="primary" >Save</Button>
            </Modal.Footer>
        </Modal>
    );
}
