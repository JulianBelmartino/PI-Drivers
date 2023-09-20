import styles from './detail.module.css'
import { useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getDriverDetail} from '../../redux/action'



export default function Detail(){
  const driverDetail = useSelector((state) => state.myDriver)
  const [driver, setDriver] = useState([])
  const dispatch = useDispatch()
  const { id } = useParams();
 

  useEffect(() =>{
    dispatch(getDriverDetail(id))
  },[dispatch])

   console.log(driverDetail)
   if (!driverDetail) {
    return <p>Loading...</p>; // Or any loading indicator you prefer
  }
  return(
      <div className={styles.container}>
      <p>ID:{driverDetail.id}</p>
      <h1>Nombre:{driverDetail.nombre}</h1>
      <h1>Apellido:{driverDetail.apellido}</h1>
      <h4>Nacionalidad:{driverDetail.nacionalidad}</h4>
      <h6>Fecha de Nacimiento:{driverDetail.fechaNac}</h6>
      <h6>Teams:{driverDetail.teams}</h6>
      <p>Descripcion: {driverDetail.descripcion}</p>
      {driverDetail.imagen && driverDetail.imagen.url && (
      <img src={driverDetail.imagen.url} alt={`Image of ${driverDetail.nombre} ${driverDetail.apellido}`} />
      )}
      </div>
      )
     
    }