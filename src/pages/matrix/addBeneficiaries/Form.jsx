import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { IoIosAddCircleOutline } from 'react-icons/io';
import './AddBeneficiaries.css'

function AddBeneficiaries() {
// Modal state
const [show, setShow] = useState(false);


const lolxd = {
    numDoc: 0, 
    curState: 'ACTIVO',
    curDate: 0
}
const [form, setForm] = useState(lolxd);

const resetForm = _ => {
    setForm(lolxd);
}

const handleInput = (e)=>{
    let {name, value} = e.target;
    let newForm = {...form, [name]: value};
    setForm(newForm);
};
const handleInputNum = (e)=>{
    let {name, value} = e.target;
    let newForm = {...form, [name]: parseInt(value)};
    setForm(newForm);
};
const handleInputDate = (e)=>{
    let {name, value} = e.target;
    let newForm = {...form, [name]: new Date(value)};
    setForm(newForm);
};

    return (
        <>
            <button className='addUser' variant='primary' onClick={() => {setShow(true)}}>
                <span className='iconAddUser'><IoIosAddCircleOutline /></span>
                <span className='createUser'>Añadir Beneficiario</span>
            </button>
            {/* MODAL */}
            <Modal
                show={show}
                onHide={() => setShow(false)}
                className='modal-xl modal-dialog-centered'
            >
                <Modal.Header closeButton onClick={resetForm}>
                    <Modal.Title id='example-custom-modal-styling-title'>
                        <h3>AÑADIR BENEFICIARIO</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-dialog-scrollable d-flex flex-wrap input-modal flex-gap'>
                
                <form onSubmit={console.log(form)}>
                    <div>
                        <label>NUMERO DE DOCUMENTO*</label>
                        <input onChange={handleInputNum} name='numDoc' type='number' />
                    </div>
                    <div>
                        <label>¿ACTIVO O INACTIVO?*</label>
                        <select onChange={handleInput} name='curState'>
                            <option value='ACTIVO'>ACTIVO</option>
                            <option value='INACTIVO'>INACTIVO</option>
                        </select>
                    </div>
                    <div>
                        <label>DATE*</label>
                        <input onChange={handleInputDate} name='curDate' type='date' />
                    </div>
                    <button type='submit'>-------Enviar------</button>
                </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddBeneficiaries