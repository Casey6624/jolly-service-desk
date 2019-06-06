import React from "react";
import "./Modal.css";
import Button from "components/CustomButtons/Button.jsx";
import TaskForm from "components/TaskForm/TaskForm";
import TaskFormEditing from "components/TaskForm/TaskFormEditing"
import TaskFormDeleting from "components/TaskForm/TaskFormDel"
import TaskFormStatusTrue from "components/TaskForm/TaskFormStatusTrue"
import TaskFormStatusFalse from "components/TaskForm/TaskFormStatusFalse"
import TaskFormAutoTask from "components/TaskForm/TaskFormAutoTask"
import TaskFormReading from "components/TaskForm/TaskFormReading"

const Modal = ({ title, onCancel, modalType, editTaskData, delTaskData, updateTaskData, myTaskData, serverData }) => {

    return (
        <div className="backdrop">
            <div className="modal">
                <header className="modal__header">
                    <h1>{title}</h1>
                </header>
                <section className="modal__content">
                    {modalType === "creating" && <TaskForm onClose={onCancel} />}
                    {modalType === "editing" && <TaskFormEditing onClose={onCancel} editTaskData={editTaskData} />}
                    {modalType === "deleting" && <TaskFormDeleting onClose={onCancel} delTaskData={delTaskData} />}
                    {modalType === "updatingT" && <TaskFormStatusTrue onClose={onCancel} updateTaskData={updateTaskData} />}
                    {modalType === "updatingF" && <TaskFormStatusFalse onClose={onCancel} updateTaskData={updateTaskData} />}
                    {modalType === "autotask" && <TaskFormAutoTask onClose={onCancel} editTaskData={editTaskData} />}
                    {modalType === "reading" && <TaskFormReading onClose={onCancel} myTaskData={myTaskData} />}
                </section>
                <section className="modal__actions" style={{ display: "flex", justifyContent: "center" }}>
                    <Button type="button" color="danger" onClick={onCancel}>
                        Cancel
                    </Button>
                </section>
            </div>
        </div >
    );
};

export default Modal;
