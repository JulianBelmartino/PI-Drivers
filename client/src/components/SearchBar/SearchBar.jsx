import { useState } from "react";
import styles from './SearchBar.module.css'
import {orderCards,getDriverByName} from '../../redux/action'
import {useDispatch, useSelector} from 'react-redux'

export default function SearchBar() {
   const [name, setName] = useState('');
   const dispatch = useDispatch()
   
   const handleChange = (event) => {
      setName(event.target.value)
   }

   const handleSearch = (event) => {
      const order = event.target.value
      dispatch(getDriverByName(name));
      dispatch(orderCards(order))
      
   }

   return (
      <div>
      <input className={styles.input} type='search' onChange={handleChange} />
     <button className={styles.button} value="A" onClick={handleSearch} >BUSCAR</button>
  </div>
   );
}
