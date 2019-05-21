import React from "react";
import "./Modal.css";
import Button from "components/CustomButtons/Button.jsx";
import TaskForm from "components/TaskForm/TaskForm";

const Modal = ({ title, canCancel, onCancel }) => {
    return (
        <div className="backdrop">
            <div className="modal">
                <header className="modal__header">
                    <h1>{title}</h1>
                </header>
                <section className="modal__content">
                    <TaskForm
                        onClose={onCancel}
                    />
                </section>
                <section className="modal__actions" style={{ display: "flex", justifyContent: "center" }}>
                    {canCancel && (
                        <Button type="button" color="danger" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Modal;
