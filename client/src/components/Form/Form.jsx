import styles from './Form.module.css';
import { createDriver } from '../../redux/action';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


export default function Form() {
  const dispatch = useDispatch();
  

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
          [inputName]: 'It can only contain letters.',
        }));
      } else {
        setErrorMessages((prevErrors) => ({ ...prevErrors, [inputName]: '' }));
      }
    } else if (inputName === 'fechaNac') {
      if (!dateRegex.test(inputValue)) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [inputName]: 'Unvalid date format (Year-Month-day).',
        }));
      } else {
        // Check if it's a valid date
        const dateParts = inputValue.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Months are 0-based (0 = January)
        const day = parseInt(dateParts[2]);
        const dateObject = new Date(year, month, day);
  
        if (
          isNaN(dateObject.getDate()) ||
          dateObject.getMonth() !== month ||
          dateObject.getFullYear() !== year ||
          dateObject.getDate() !== day
        ) {
          setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [inputName]: 'Unvalid date. Date must be real date.',
          }));
        } else {
          setErrorMessages((prevErrors) => ({ ...prevErrors, [inputName]: '' }));
        }
      }
    } else if (inputName === 'imagen') {
      if (!regexURL.test(inputValue)) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [inputName]: 'Unvalid input, must be URL.',
        }));
      } else {
        const img = new Image();
      img.onload = () => {
        // Image loaded successfully, you can clear the error message
        setErrorMessages((prevErrors) => ({ ...prevErrors, [inputName]: '' }));
      };
      img.onerror = () => {
        // Image could not be loaded, show an error
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [inputName]: 'The URL doesnt contain and image',
        }));
      };
      img.src = inputValue; // Set the image source to the URL
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
      event.preventDefault();
      toggleModalError();
    } else {
      event.preventDefault();
      toggleModal();
     
    }
  };

  const finalSubmit = () =>{ 
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
    window.location.reload();
  }
  
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
 
  const toggleModal = () => {
    setShowModal(!showModal)
    
  };

  const toggleModalError = () => {
    setShowModalError(!showModalError);
  };
  const closeModal = () => {
    setShowModalError(!showModalError);
  };

  return (
    <div className={styles.container}>
       {/* Modal */}
       {showModal && (
            <div className={styles.overlay}></div>
         )}
       {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.modalButton}  onClick={finalSubmit}>X</button>
            <h2>Driver Created Successfully</h2>
            <img className={styles.image} src='/f1white.png' />
          </div>
        </div>
      )}
         {/* Error Modal */}
         {showModalError && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.modalButton} onClick={closeModal}>X</button>
            <h2>All Fields Are Required</h2>
            <img className={styles.image}  src='/f1white.png' />
          </div>
        </div>
      )}
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.container2}>

          <div className={styles.bigRow}>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="nombre">
              Forename:
            </label>
            <input
              className={styles.inputs}
              type="text"
              name="nombre"
              onChange={handleChange}
              value={driverData.nombre}
             
            />
            <p className={styles.error}>{errorMessages.nombre}</p>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="apellido">
              Surname:
            </label>
            <input
              className={styles.inputs}
              type="text"
              name="apellido"
              onChange={handleChange}
              value={driverData.apellido}
             
            />
            <p className={styles.error}>{errorMessages.apellido}</p>
          </div>
          </div>
          
          

          <div className={styles.bigRow}>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="nacionalidad">
              Nationality:
            </label>
            <input
              className={styles.inputs}
              type="text"
              name="nacionalidad"
              onChange={handleChange}
              value={driverData.nacionalidad}
              
            />
            <p className={styles.error}>{errorMessages.nacionalidad}</p>
          </div>
          
          <div className={styles.row}>
            <label className={styles.label} htmlFor="imagen">
              Image:
            </label>
            <input
              className={styles.inputs}
              type="text"
              name="imagen"
              onChange={handleChange}
              value={driverData.imagen.url}
              
            />
            <p className={styles.error}>{errorMessages.imagen}</p>
          </div>
          </div>

          <div className={styles.bigRow}>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="fechaNac">
              Birthdate:
            </label>
            <input
              className={styles.inputs}
              type="text"
              name="fechaNac"
              onChange={handleChange}
              value={driverData.fechaNac}
              
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
             
            />
            <p className={styles.error}>{errorMessages.descripcion}</p>
          </div>
          </div>

          <div className={styles.bigRow}>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="Teams">
              Teams:
            </label>
            <input
              className={styles.inputs}
              type="text"
              name="Teams"
              onChange={handleChange}
              value={driverData.Teams.map((team) => team.nombre).join(', ')}
              
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