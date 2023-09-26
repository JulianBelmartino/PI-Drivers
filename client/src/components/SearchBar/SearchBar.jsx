import { useState } from "react";
import styles from './SearchBar.module.css'
import {getDriverByName} from '../../redux/action'
import {useDispatch, useSelector} from 'react-redux'

export default function SearchBar({ onSearch }) {
   const [name, setName] = useState('');
   const dispatch = useDispatch()
   
   const handleChange = (event) => {
      setName(event.target.value)
   }

   const handleSearch = (event) => {
      if(name.length === 0 || !name){
         event.preventDefault();
        alert('please enter a name')
      }else{
         dispatch(getDriverByName(name));
      }
   
   }
  
   return (
      <div>

      <input className={styles.input} type='search' onChange={handleChange} />
      
     <button className={styles.button} value="A" onClick={handleSearch} >BUSCAR</button>
     
     </div>
   );
}
