import styles from './Form.module.css';
import { createDriver } from '../../redux/action';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Form() {
  const dispatch = useDispatch();

  const regex = /^[a-zA-Z]+$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const regexURL = /^(https?:\/\/)?([\w-]+\.)+[\w]+(\/[\w- ./?%&=]*)?$/;

const validate = (event) =>{
  const inputValue = event.target.value; 
    if(event.target.name === "apellido" ||  event.target.name === "nombre" ||
        event.target.name === "descripcion" ||  event.target.name === "nacionalidad" ){
      if(regex.test(inputValue)){
        console.log('validado')
      }else{
        console.log('error')
      }
    }else if(event.target.name === "fechaNac"){
      if(dateRegex.test(inputValue)){
        console.log('validado')
      }else{
        console.log('error')
      }
    }else if(event.target.name === "imagen"){
        if(regexURL.test(inputValue)){
        console.log('validado')
    }else{
      console.log('error')
    }
  }
}

  const [driverData, setDriverData] = useState({
    nombre: '',
    apellido: '',
    nacionalidad: '',
    fechaNac: '',
    descripcion: '',
    imagen: '', // Removed .url here
    Teams: [],
  });

  const handleChange = (event) => {
    validate(event)
    const property = event.target.name;
    const value = event.target.value;

    if (property === 'Teams') {
      const teamsArray = value.split(', ').map((team) => ({ nombre: team }));
      setDriverData((prevData) => ({ ...prevData, [property]: teamsArray }));
    } else {
      setDriverData((prevData) => ({ ...prevData, [property]: value }));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(createDriver(driverData));
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <form className={styles.forma} onSubmit={submitHandler}>
        <div className={styles.container}>
          <img
            className={styles.image}
            src="https://i.pinimg.com/originals/49/ca/fe/49cafe61f30e6da84ac47abfd7fbea9a.png"
            alt="Driver Logo"
          />
          <div>
            <label className={styles.label} htmlFor="nombre">
              Nombre:
            </label>
            <input
              className={styles.inputs}
              type="text"
              name="nombre"
              onChange={handleChange}
              value={driverData.nombre}
            />
          </div>

          <div>
                <label className={styles.label} htmlFor="apellido">Apellido: </label>
                <input className={styles.inputs} type="text" name="apellido" onChange={handleChange} value={driverData.apellido} />
            </div>

            <div>
                <label className={styles.label} htmlFor="nacionalidad">Nacionalidad: </label>
                <input className={styles.inputs} type="text" name="nacionalidad" onChange={handleChange} value={driverData.nacionalidad} />
            </div>

            <div>
                <label className={styles.label} htmlFor="imagen">Imagen: </label>
                <input className={styles.inputs} type="url" name="imagen" onChange={handleChange} value={driverData.imagen.url} />
            </div>

            <div>
                <label className={styles.label} htmlFor="fechaNac">Fecha de Nacimiento: </label>
                <input className={styles.inputs} type="date" name="fechaNac" onChange={handleChange} value={driverData.fechaNac} />
            </div>

            <div>
                <label className={styles.label} htmlFor="Descripcion">Descripcion: </label>
                <input className={styles.inputs} type="text" name="descripcion"  onChange={handleChange} value={driverData.descripcion}/>
            </div>

          <div>
            <label className={styles.label} htmlFor="Teams">
              Escuderias:
            </label>
            <input
              className={styles.inputs}
              type="text"
              name="Teams"
              onChange={handleChange}
              value={driverData.Teams.map((team) => team.nombre).join(', ')}
            />
          </div>

          <button className={styles.button} type="submit" value="Submit">
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
}