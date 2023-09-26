import React, { useState } from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card({ name, teams, imagen, id, apellido }) {
  const teamArray = filteredTeams();

 function filteredTeams() {
    if (teams) {
      const teamsArray = teams.split(',').map((team) => team.trim());
      return teamsArray;
    }
}


  return (
     <div className={styles.container}>
       <div className={styles.driverInfo}>
      <img
        className={styles.imagebox}
        src={
          typeof imagen === 'string' && imagen !== ''
            ? imagen
            : 'data:image/png;base64,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'
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
      {teamArray.map((team, index) => (
          <p key={index}>
             {team}
          </p>
        ))}
    </div>
    </div>
  );
}






