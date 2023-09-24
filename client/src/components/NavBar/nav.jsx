import styles from './nav.module.css'
import {Link} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
export default function Nav() {

   return (
      <div>
         <div className={styles.linkBar}>
            <img className={styles.barLogo} src="https://miro.medium.com/v2/resize:fit:1358/1*GuII-UeSxb8nKklfdTaQDA.png" />
         <Link className={styles.linkNav} to="/home" >HOME</Link>
         <Link className={styles.linkNav} to="/form">CREATE NEW DRIVER</Link>
         </div>
      </div>
   );
}