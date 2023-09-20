import styles from './Card.module.css'
import {Link} from 'react-router-dom'


export default function Card({name,teams,imagen,id}) {

   return (
      <div className={styles.container}>
          <img src={imagen}/>
          <Link className={styles.titulo} to={ `/detail/${id}`}> <h2 className={styles.titulo}>{name}</h2></Link> 
          <h2 className={styles.titulo}>{teams}</h2>        
      </div>
   );
}
