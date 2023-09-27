import Card from '../Card/Card';
import styles from './Cards.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers } from '../../redux/action';
import { toggleFlag } from '../../redux/action';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filters/Filter';

export default function Cards(props) {
  const allDrivers = useSelector((state) => state.allDrivers);
  const myDriver = useSelector((state) => state.myDriver);
  const orderedDrivers = useSelector((state) => state.orderedDrivers);
  const filterFlag = useSelector((state) => state.filterFlag)
  const matchFlag = useSelector((state) => state.matchFlag)
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.isLoading);
  

  const itemsPerPage = 9; 
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem('currentPage')) || 1
  );


  useEffect(() => {
    dispatch(getDrivers());
    localStorage.setItem('currentPage', currentPage);
  }, [dispatch, orderedDrivers, myDriver,currentPage]);

  
  let currentDrivers = [];

  if (isLoading) {
    return <p>Loading...</p>; 
  }

  if (myDriver.length > 0) { //si hay algo
    if(matchFlag === true){ //si buscaste
      currentDrivers = myDriver;
    }else{  //si hay algo y no buscaste       
    if(filterFlag === false) {
       currentDrivers = myDriver;
    }else{
      currentDrivers = orderedDrivers;
    }
  }
  } else if (orderedDrivers.length > 0) {
    if(matchFlag === true){
      currentDrivers = []
    }else{
      currentDrivers = orderedDrivers;
    }
  } else {
    if(matchFlag === true){
      currentDrivers = []
    }else{
      currentDrivers = allDrivers;
    }
  }


 
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  
  const driversToDisplay = currentDrivers.slice(startIndex, endIndex);

  
  const totalPages = Math.ceil(currentDrivers.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleButtonClick = () => {
    // Dispatch the action to toggle the flag
    dispatch(toggleFlag());
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}><Filter/><SearchBar/></div>
      <div className={styles.cards}>
        {currentDrivers.length === 0 ?
        <div>
        <h1>NO DRIVERS FOUND</h1>
        <button onClick={handleButtonClick} >RESET</button>
        </div>
        :
        driversToDisplay.map((drivers) => (
          <Card
            key={drivers.id}
            id={drivers.id}
            name={drivers.nombre}
            apellido={drivers.apellido}
            teams={drivers.Teams ? drivers.Teams : drivers.teams}
            imagen={drivers.imagen.url ? drivers.imagen.url : drivers.imagen}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.navButton}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          PREVIOUS
        </button>
        <span>{`PAGE ${currentPage} OF ${totalPages}`}</span>
        <button
          className={styles.navButton}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}