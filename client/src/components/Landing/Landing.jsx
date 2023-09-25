import styles from './Landing.module.css'
import {Link} from 'react-router-dom'
import { useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'


export default function Detail(){
    

     return(
      <div className={styles.container}>
   
     <Link className={styles.titulo} to={`/home`}> <h1>E N T E R</h1></Link>
      </div>
      )
     
    }