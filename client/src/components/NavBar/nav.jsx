import styles from './nav.module.css'
import {Link} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
export default function Nav() {

   return (
      <div>
         <div className={styles.linkBar}>
         <Link className={styles.linkNav} to="/form">CREATE</Link>
         <Link className={styles.linkNav} to="/home" >HOME</Link>
         </div>
      </div>
   );
}