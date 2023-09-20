import styles from './Landing.module.css'
import {Link} from 'react-router-dom'
import { useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'


export default function Detail(){
    

     return(
      <div className={styles.container}>
     <h1>HOLA LANDING</h1>
     <Link className={styles.titulo} to={`/home`}> <p>Home</p></Link>
      </div>
      )
     
    }