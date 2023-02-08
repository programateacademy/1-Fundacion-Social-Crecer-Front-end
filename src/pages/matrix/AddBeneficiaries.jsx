import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddBeneficiaries() {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>
                Custom Width Modal
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                className='modal-xl modal-dialog-centered'
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Añadir Beneficiario
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-dialog-scrollable d-flex flex-wrap input-modal flex-gap'>
                    <div>
                        <label>NUMERO DE DOCUMENTO</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>¿ACTIVO O INACTIVO?</label>
                        <select name="select">
                            <option value="value1" selected>ACTIVO</option>
                            <option value="value2">INACTIVO</option>
                        </select>
                    </div>
                    <div>
                        <label>FECHA DE INGRESO</label>
                        <input type="date" />
                    </div>
                    <div>
                        <label>FECHA DE EGRESO</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>INGRESA POR:</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>MOTIVO DE EGRESO</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>SI EL MOTIVO DE EGRESO ES "OTRO", INDIQUE EL POR QUÉ</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>NUMERO DE DOCUMENTO</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>NUMERO DE DOCUMENTO</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>NUMERO DE DOCUMENTO</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>NUMERO DE DOCUMENTO</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>NUMERO DE DOCUMENTO</label>
                        <input  type="text" />
                    </div>
                    <input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddBeneficiaries