import styles from './Form.module.css'
import {createDriver} from '../../redux/action'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

export default function Form() {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({
    
        nombre: '',
        apellido: '',
        nacionalidad: '',
        fechaNac: '',
        descripcion: '',
        imagen: '',
        Teams: ''
    })
    
       const [driverData, setData] = useState(
        {
            nombre: '',
            apellido: '',
            nacionalidad: '',
            fechaNac: '',
            descripcion: '',
            imagen: '',
            Teams: ''
        }
    )
    const handleChange = (event) => {
        const newErrors = { ...errors }
        const property = event.target.name;
        const value = event.target.value;
        if (property === "Teams") {
            const inputString = value; // Use the updated value from the input field
            const teamNames = inputString.split(",").map((teamName) => teamName.trim());
            const newTeams = teamNames.map((teamName) => ({ nombre: teamName }));
        
            // Add new teams to the existing "Teams" array
            const updatedTeams = [...driverData.Teams, ...newTeams];
        
            // Update the "Teams" property in the driverData
            setData({ ...driverData, [property]: updatedTeams });
          } else {
              setData({...driverData, [property]: value})
          }
        setErrors(newErrors);
    
    }
    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(createDriver(driverData))
        console.log(driverData)
    }
   return (
      <div className={styles.container}>
         <form  className={styles.forma} onSubmit={submitHandler}>
            <div className={styles.container}>
            <img className={styles.image} src="https://w7.pngwing.com/pngs/512/612/png-transparent-mercedes-amg-petronas-f1-team-2018-fia-formula-one-world-championship-abu-dhabi-grand-prix-logo-red-bull-racing-f1-logo-angle-text-rectangle.png" />
            <div>
                <label className={styles.label} htmlFor="nombre">Nombre: </label>
                <input className={styles.inputs} type="text" name="nombre" onChange={handleChange} value={driverData.nombre}/>
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
                <label className={styles.label} htmlFor="Teams">Escuderias: </label>
                <input className={styles.inputs} type="text" name="Teams" onChange={handleChange} value={driverData.Teams} />
            </div>
            
            <button className={styles.button} type="submit" value="Submit">CREATE</button>
            </div>
        </form>
      </div>
   );
}