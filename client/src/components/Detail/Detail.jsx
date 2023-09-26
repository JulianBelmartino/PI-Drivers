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
      <div>
        <img className={styles.formula1} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZLI-GlYOv2VmST7P5CJugV78yBmXA6kpAPFpewcunFLlKmQgRTZB7eMZPj1aEGgxvck&usqp=CAU" />
      <img  className={styles.image} src={driverDetail.imagen.url? driverDetail.imagen.url : driverDetail.imagen} alt={`Image of ${driverDetail.nombre} ${driverDetail.apellido}`} />
      </div>
        <div  className={styles.info}>
      <p>{driverDetail.id}</p>
      <h1>{driverDetail.nombre} {driverDetail.apellido}</h1>
      <h4>Nationality:{driverDetail.nacionalidad}</h4>
      <h6>Date of Birth:{driverDetail.fechaNac}</h6>
      <h6>Teams:{driverDetail.teams}</h6>
      <p>Descripcion: {driverDetail.descripcion ? driverDetail.descripcion : 'No discription available'}</p>
      </div>
      </div>
      )
     
    }