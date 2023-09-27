import { useState } from "react";
import styles from './SearchBar.module.css'
import {getDriverByName} from '../../redux/action'
import {useDispatch, useSelector} from 'react-redux'

export default function SearchBar({ onSearch }) {
   const [name, setName] = useState('');
   const dispatch = useDispatch()
   const [isModalOpen, setModalOpen] = useState(false);

   const handleChange = (event) => {
      setName(event.target.value)
   }

   const handleSearch = (event) => {
      if(name.length === 0 || !name){
         event.preventDefault();
        setModalOpen(true)
      }else{
         dispatch(getDriverByName(name));
      }
   
   }
   const closeModal = () => {
      setModalOpen(false);
   }

   return (
      <div>
          {isModalOpen && (
            <div className={styles.overlay}></div>
         )}
         {isModalOpen && (
            <div className={styles.modal} >
               <div className={styles.modalContent}>
                  <span className={styles.close} onClick={closeModal}>X</span>
                  <img className={styles.image}  src='/f1white.png' />
                  <h3>Please insert some text to conduct a search</h3>
               </div>
            </div>
         )}

      <input className={styles.input} type='search' onChange={handleChange} />
      
     <button id="myBtn" className={styles.button} value="A" onClick={handleSearch} >BUSCAR</button>
     
     </div>
   );
}
