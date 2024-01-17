import React, { useState } from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card({ name, teams, imagen, id, apellido }) {
  
    



  return (
     <div className={styles.container}>
       <div className={styles.driverInfo}>
      <img
        className={styles.imagebox}
        src={
          typeof imagen === 'string' && imagen !== ''
            ? imagen
            : 'https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png'
        }
        alt={`${name} ${apellido}`}
      />

      <Link className={styles.titulo} to={`/detail/${id}`}>
        <h5 className={styles.titulo}>
          {name}
        </h5>
        <h5 className={styles.titulo}>
          {apellido}
        </h5>
      </Link>
      </div>
      <div className={styles.teamInfo}>
         <h4>Teams:</h4>
      
          <p >
             {teams}
          </p>
       
    </div>
    </div>
  );
}






