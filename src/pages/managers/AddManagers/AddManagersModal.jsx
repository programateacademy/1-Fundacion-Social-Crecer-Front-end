import  { useState, useRef } from 'react';
import users from '../../../apis/index';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'

const AddManagersModal = ({ setShow, getManagers}) => {
  const [validated, setValidated] = useState(false);
  const [errorMessages,setErrorMessages]=useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

// Creating Manager state
  const [formManager, setFormManager] = useState({});

  const formRef = useRef(null);
  // State to send form data

  const handleCreate = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else if (password1 !== password2) {
      setErrorPasswordMessage('Las contraseñas no coinciden');
    } else {
      addManagers();
    }
  }; 

  const handleInputText = (e) => {
    let { name, value } = e.target;
    let newForm = { ...formManager, [name]: value }; 
    setFormManager(newForm);
  };

  const handleInputNumber = (e) => {
    let { name, value } = e.target;
    let newForm = { ...formManager, [name]: value };
    setFormManager(newForm);
  };

  const addManagers = async () => {
    try {
      const response = await users.post('/api/superadmin/admin', formManager, {
        headers: {
          Authorization: localStorage.getItem('token' || 'recovery-token'),
        },
      });
      console.log(response);
      setSuccessMessage('Administrador creado con éxito');
      setErrorMessages('');
      setValidated(true);
      getManagers();
      setShow(false);
    } catch (error) {
      setErrorMessages(error.response.data.error);
      console.error(error.response.data);
    }
  };
  return (
    <div id='Form'>
      {errorMessages ? <Alert variant='danger'>{errorMessages}</Alert> : ''}
      <Form noValidate validated={validated} ref={formRef}>
        <Form.Group className='inputNewUser'>
          <Form.Control
            type='text'
            placeholder='Numero de identificación'
            required
            name='docnum'
            value={formManager.docnum}
            onChange={handleInputNumber}
          />
        </Form.Group>
        <Form.Group className='inputNewUser'>
          <Form.Control
            type='text'
            placeholder='Nombre'
            required
            name='name'
            value={formManager.name}
            onChange={handleInputText}
            isInvalid={errorMessages === '\'name\' length must be at least 6 characters long'}
          />
          <Form.Control.Feedback type='invalid'>
            {errorMessages}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='inputNewUser'>
          <Form.Control
            type='email'
            placeholder='Correo electrónico'
            required
            name='email'
            value={formManager.email}
            onChange={(e)=>{handleInputText(e),setErrorMessages('')}}
            isInvalid={errorMessages === 'Email ya registrado'}
          />
          <Form.Control.Feedback type='invalid'>
            {errorMessages}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='inputNewUser'>
          <label>Unidad</label>
          <Form.Select name='unity' onChange={handleInputText}>
            <option value={formManager.unity} hidden></option>
            <option value='FISCALA' >FISCALA- U1</option>
            <option value='USME'>USME- U2</option>
            <option value='SERRANIAS'>SERRANIAS- U3</option>
            <option value='VIRREY'>VIRREY- U4</option>
            <option value='SAN JUAN A'>SAN JUAN A- U5</option>
            <option value='EL UVAL'>EL UVAL - U6</option>
            <option value='TRIANGULO'>TRIANGULO - U7</option>
            <option value='LORENZO'>LORENZO- U8</option>
          </Form.Select>
{/*           <Form.Control
            type='text'
            placeholder='Unidad'
            required
            name='unity'
            value={formManager.unity}
            onChange={handleInputText}
          /> */}
        </Form.Group>
        <Form.Group className='inputNewUser'>
          <Form.Control
            type='password'
            placeholder='Contraseña'
            required
            name='password'
            value={formManager.password}
            onChange={(e)=>{handleInputText(e);setPassword1(e.target.value)}}
          />
        </Form.Group>
        <Form.Group className='inputNewUser'>
          <Form.Control
            type='password'
            placeholder='Repetir contraseña'
            name='password2'
            onChange={(e)=>{setPassword2(e.target.value);setErrorPasswordMessage('')}}
            required
            isInvalid={errorPasswordMessage !== ''}
          />
          <Form.Control.Feedback type='invalid'>
            {errorPasswordMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='inputNewUser'>
        <Form.Control.Feedback type='invalid'>
            {errorMessages}
          </Form.Control.Feedback>
          </Form.Group>
      </Form>
      <div className='btnsUser'>
        <button
          type='submit'
          className='btnCreateUser'
          onClick={(e)=> {handleCreate(e)}}>
          Crear
        </button>
        <button className='btnCancelUser' onClick={() => setShow(false)}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AddManagersModal;
