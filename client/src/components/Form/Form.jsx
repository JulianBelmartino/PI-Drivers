import styles from './Form.module.css';
import { createDriver } from '../../redux/action';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


export default function Form() {
  const dispatch = useDispatch();
  const [shouldRefreshPage, setShouldRefreshPage] = useState(false);

  const regex = /^[a-zA-Z]+$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const regexURL = /^(https?:\/\/)?([\w-]+\.)+[\w]+(\/[\w- ./?%&=]*)?$/;

  const [errorMessages, setErrorMessages] = useState({
    nombre: '',
    apellido: '',
    nacionalidad: '',
    fechaNac: '',
    descripcion: '',
    imagen: '',
    Teams: '',
  });

  const validate = (event) => {
    const inputValue = event.target.value;
    const inputName = event.target.name;

    if (inputName === 'apellido' || inputName === 'nombre' || inputName === 'nacionalidad') {
      if (!regex.test(inputValue)) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [inputName]: 'Debe contener solo letras.',
        }));
      } else {
        setErrorMessages((prevErrors) => ({ ...prevErrors, [inputName]: '' }));
      }
    } else if (inputName === 'fechaNac') {
      if (!dateRegex.test(inputValue)) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [inputName]: 'Formato de fecha no válido (AAAA-MM-DD).',
        }));
      } else {
        setErrorMessages((prevErrors) => ({ ...prevErrors, [inputName]: '' }));
      }
    } else if (inputName === 'imagen') {
      if (!regexURL.test(inputValue)) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [inputName]: 'Debe ser una URL válida.',
        }));
      } else {
        setErrorMessages((prevErrors) => ({ ...prevErrors, [inputName]: '' }));
      }
    }
  };

  const [driverData, setDriverData] = useState({
    nombre: '',
    apellido: '',
    nacionalidad: '',
    fechaNac: '',
    descripcion: '',
    imagen: '',
    Teams: [],
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === 'Teams') {
      const teamsArray = value.split(', ').map((team) => ({ nombre: team }));
      setDriverData((prevData) => ({ ...prevData, [property]: teamsArray }));
    } else {
      setDriverData((prevData) => ({ ...prevData, [property]: value }));
    }

    
    validate(event);
  };
  function refreshPage() {
    window.location.reload();
  }

  
  const submitHandler = (event) => {
    if (
      driverData.nombre.trim() === '' ||
      driverData.apellido.trim() === '' ||
      driverData.nacionalidad.trim() === '' ||
      driverData.fechaNac.trim() === '' ||
      driverData.descripcion.trim() === '' ||
      driverData.imagen.trim() === '' ||
      driverData.Teams.length === 0
    ) {
      
      toggleModalError();
    } else {
      
      dispatch(createDriver(driverData));
      setDriverData({
        nombre: '',
        apellido: '',
        nacionalidad: '',
        fechaNac: '',
        descripcion: '',
        imagen: '',
        Teams: [],
      });
      toggleRefreshPage();
      toggleModal();
    }
  };

  
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
 
  const toggleModal = () => {
    setShowModal(!showModal);
    if (shouldRefreshPage) {
      refreshPage();
    }
  };
  const toggleRefreshPage = () => {
    setShouldRefreshPage(!shouldRefreshPage);
  };

  const toggleModalError = () => {
    setShowModalError(!showModalError);
  };
  function refreshPage() {
    window.location.reload();
  }
  return (
    <div className={styles.container}>
       {/* Modal */}
       {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Driver Created Successfully</h2>
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
         {/* Error Modal */}
         {showModalError && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>All fields are required</h2>
            <button onClick={toggleModalError}>Close</button>
          </div>
        </div>
      )}
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.container2}>

          <div className={styles.bigRow}>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="nombre">
              Nombre:
            </label>
            <input
              className={styles.inputs}
              type="text"
              name="nombre"
              onChange={handleChange}
              value={driverData.nombre}
              required
            />
            <p className={styles.error}>{errorMessages.nombre}</p>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="apellido">
              Apellido:
            </label>
            <input
              className={styles.inputs}
              type="text"
              name="apellido"
              onChange={handleChange}
              value={driverData.apellido}
              required
            />
            <p className={styles.error}>{errorMessages.apellido}</p>
          </div>
          </div>
          
          

          <div className={styles.bigRow}>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="nacionalidad">
              Nacionalidad:
            </label>
            <input
              className={styles.inputs}
              type="text"
              name="nacionalidad"
              onChange={handleChange}
              value={driverData.nacionalidad}
              required
            />
            <p className={styles.error}>{errorMessages.nacionalidad}</p>
          </div>
          
          <div className={styles.row}>
            <label className={styles.label} htmlFor="imagen">
              Imagen:
            </label>
            <input
              className={styles.inputs}
              type="url"
              name="imagen"
              onChange={handleChange}
              value={driverData.imagen.url}
              required
            />
            <p className={styles.error}>{errorMessages.imagen}</p>
          </div>
          </div>

          <div className={styles.bigRow}>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="fechaNac">
              Fecha de Nacimiento:
            </label>
            <input
              className={styles.inputs}
              type="date"
              name="fechaNac"
              onChange={handleChange}
              value={driverData.fechaNac}
              required
            />
            <p className={styles.error}>{errorMessages.fechaNac}</p>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="descripcion">
              Descripcion:
            </label>
            <input
              className={styles.inputs}
              type="text"
              name="descripcion"
              onChange={handleChange}
              value={driverData.descripcion}
              required
            />
            <p className={styles.error}>{errorMessages.descripcion}</p>
          </div>
          </div>

          <div className={styles.bigRow}>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="Teams">
              Escuderias:
            </label>
            <input
              className={styles.inputs}
              type="text"
              name="Teams"
              onChange={handleChange}
              value={driverData.Teams.map((team) => team.nombre).join(', ')}
              required
            />
            <p className={styles.error}>{errorMessages.Teams}</p>
          </div>

          <button className={styles.button} type="submit" value="Submit">
            CREATE
          </button>
          </div>
          </div>
      </form>
     
    
    </div>
  );
}