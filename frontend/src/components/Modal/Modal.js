import React from "react"
import "./Modal.css"
import Button from "components/CustomButtons/Button.jsx";

const Modal = ({ title, children, canCancel, canConfirm, onCancel, onConfirm }) => {
    return (
        <div className="modal">
            <header className="modal__header"> <h1>{title}</h1> </header>
            <section className="modal__content">
                {children}
            </section>
            <section className="modal__actions">
                {canCancel && <Button type="button" color="success" onClick={onConfirm}>Submit </Button>}
                {canConfirm && <Button type="button" color="danger" onClick={onCancel}>Cancel</Button>}
            </section>
        </div>
    )
}

export default Modal