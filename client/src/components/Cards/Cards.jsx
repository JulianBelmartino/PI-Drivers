import Card from '../Card/Card';
import styles from './Cards.module.css'
import axios from 'axios';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getDrivers} from '../../redux/action'
import { useEffect } from 'react';
import Filter from '../Filters/Filter'

export default function Cards() {
const allDrivers = useSelector((state) => state.allDrivers)
const selectedDrivers = useSelector((state) => state.myDriver);
const orderedDrivers = useSelector((state) => state.orderedDrivers);
const dispatch = useDispatch()

const itemsPerPage = 9; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  

  useEffect(() =>{
  dispatch(getDrivers())
},[dispatch])

let currentDrivers = selectedDrivers.length > 0 ? selectedDrivers : allDrivers;

if (!currentDrivers || currentDrivers.length === 0) {
  return <p>Loading...</p>; // Or any loading indicator you prefer
}else if(orderedDrivers.length > 0){
  currentDrivers = orderedDrivers
}

// Calculate the start and end index for the current page
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

// Slice the data to display only the items for the current page

const driversToDisplay = currentDrivers.slice(startIndex, endIndex);

// Calculate the total number of pages
const totalPages = Math.ceil(allDrivers.length / itemsPerPage);

// Function to handle pagination navigation
const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};

return (
  
  <div className={styles.container} >
  <div><Filter /></div>
  <div className={styles.cards} >
  {driversToDisplay.map((drivers) =>{
   return <Card
            key={drivers.id}
             id={drivers.id}
             name={drivers.nombre}
             teams={drivers.Teams?drivers.Teams:drivers.teams}
             imagen={drivers.imagen.url}
             />
    })}
    </div>
      <div>
            {/* Pagination controls */}
            <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
      </div> 

   </div>
   );
}
