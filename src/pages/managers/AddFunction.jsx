import { useState, useRef } from "react";
import users from "../../apis/index";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const AddFunction = ({ setShow, managers }) => {
  const [validated, setValidated] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [errorDocnumMessage, setErrorDocnumMessage] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [usuarioIndex, setUsuarioIndex] = useState(-1);
  const [repatedE, setRepeatedE] = useState(-1);
  const repeatedId = (ID) => {
    return managers.findIndex((usuario) => usuario.docnum === ID);
  };
  const repeatedEmail = (email) => {
    return managers.findIndex((usuario) => usuario.email === email);
  };
  const formRef = useRef(null);
  const role = "admin";
  // State to send form data

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const formModel = {
    name: "",
    email: "",
    unity: "",
    password: "",
    docnum: "",
    role:"admin"
  };
  const [form, setForm] = useState(formModel);

/*   const handleCreate = async (e) => {
    e.preventDefault();
    const formDani = formRef.current;
    //alert(usuarioIndex);
    if (formDani.checkValidity() === false) {
      e.stopPropagation();
    }else if(usuarioIndex!==-1){
      setErrorDocnumMessage("Este ID ya existe");
    }else if(repatedE!==-1){
      setErrorEmailMessage("Este email ya existe");
    }else if (password !== password2) {
      setErrorPasswordMessage("Las contraseñas no coinciden");
    }else {
      addManagers;
      setShow(false);
    }
    setValidated(true);
  };  */

  const handleInputText = (e) => {
    let { name, value } = e.target;
    let newForm = { ...form, [name]: value };
    setForm(newForm);
  };

  const handleInputNumber = (e) => {
    let { name, value } = e.target;
    let newForm = { ...form, [name]: value };
    setForm(newForm);
  };

  const addManagers = async () => {
    try {
      const response = await users.post("/api/superadmin/admin", form, {
        headers: {
          Authorization: localStorage.getItem("token" || "recovery-token"),
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  return (
    <div id="Form">
      <Form noValidate validated={validated} ref={formRef}>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            placeholder="Numero de identificación"
            required
            name="docnum"
            value={form.docnum}
            onChange={handleInputNumber}
            isInvalid={errorDocnumMessage !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {errorDocnumMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            placeholder="Nombre"
            required
            name="name"
            value={form.name}
            onChange={handleInputText}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="email"
            placeholder="Correo electrónico"
            required
            name="email"
            value={form.email}
            onChange={handleInputText} /* ,setRepeatedE(repeatedEmail(e.target.value)),setErrorEmailMessage('')  */
            isInvalid={errorEmailMessage !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {errorEmailMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="text"
            placeholder="Unidad"
            required
            name="unity"
            value={form.unity}
            onChange={handleInputText}
          />
        </Form.Group>
        <Form.Group className="inputNewUser">
          <Form.Control
            type="password"
            placeholder="Contraseña"
            required
            name="password"
            value={form.password}
            onChange={handleInputText}
          />
        </Form.Group>
{/*         <Form.Group className="inputNewUser">
          <Form.Control
            type="password"
            placeholder="Repetir contraseña"
            name="password2"
            value={form.password}
            onChange={handleInputText}
            required
            isInvalid={errorPasswordMessage !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {errorPasswordMessage}
          </Form.Control.Feedback>
        </Form.Group> */}
      </Form>
      <div className="btnsUser">
        <button
          type="submit"
          className="btnCreateUser"
          onClick={() => {addManagers(),setShow(false)}}>
          Crear
        </button>
        <button className="btnCancelUser" onClick={() => setShow(false)}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AddFunction;
