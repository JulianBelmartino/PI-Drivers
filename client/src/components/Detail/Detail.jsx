import styles from './detail.module.css'
import { useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getDriverDetail} from '../../redux/action'



export default function Detail(){
  const driverDetail = useSelector((state) => state.driverDetail)
  const [driver, setDriver] = useState([])
  const dispatch = useDispatch()
  const { id } = useParams();
 

  useEffect(() =>{
    dispatch(getDriverDetail(id))
  },[dispatch])

   
  console.log(driverDetail)
   if (!driverDetail || driverDetail.length === 0) {
    return <p>Loading...</p>; 
  }
  return(
      <div className={styles.container}>
      <div className={styles.leftside}>
        <img className={styles.formula1} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZLI-GlYOv2VmST7P5CJugV78yBmXA6kpAPFpewcunFLlKmQgRTZB7eMZPj1aEGgxvck&usqp=CAU" />
      <img  className={styles.image} src={driverDetail.imagen.url? driverDetail.imagen.url : driverDetail.imagen} alt={`Image of ${driverDetail.nombre} ${driverDetail.apellido}`} />
      </div>
        <div  className={styles.info}>
      <p>Driver Id: N°{driverDetail.id}</p>
      <h2>{driverDetail.nombre} {driverDetail.apellido}</h2>
      <div className={styles.row}>
      <h3>Nationality: {driverDetail.nacionalidad}</h3>
      <h3>Date of Birth: {driverDetail.fechaNac}</h3>
      </div>
      <h3 >Teams: {driverDetail.teams}</h3>
      </div>

      <div className={styles.rightSide}>
      <h4>Descripcion:</h4>
      <p className={styles.descripcion}>{driverDetail.descripcion}</p>
      </div>
      </div>
      )
     
    }