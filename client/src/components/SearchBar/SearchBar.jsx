import { useState } from "react";
import styles from './SearchBar.module.css'
import {getDriverByName} from '../../redux/action'
import {useDispatch, useSelector} from 'react-redux'

export default function SearchBar() {
   const [name, setName] = useState('');
   const dispatch = useDispatch()
   
   const handleChange = (event) => {
      setName(event.target.value)
     
   }

   const handleSearch = () => {
      // Dispatch the getDriverByName action with the current 'name' value
      dispatch(getDriverByName(name));
      console.log(name)
   }

   return (
      <div>
      <input className={styles.input} type='search' onChange={handleChange} />
     <button className={styles.button} onClick={handleSearch} >BUSCAR</button>
  </div>
   );
}
