import Card from '../Card/Card';
import styles from './Cards.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers } from '../../redux/action';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filters/Filter';

export default function Cards(props) {
  const allDrivers = useSelector((state) => state.allDrivers);
  const myDriver = useSelector((state) => state.myDriver);
  const orderedDrivers = useSelector((state) => state.orderedDrivers);
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.isLoading);

  const itemsPerPage = 9; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch, orderedDrivers]);

  // Determine the currentDrivers based on conditions
  let currentDrivers = [];

  if (isLoading) {
    return <p>Loading...</p>; // Show loading indicator while data is being fetched
  }

  if (myDriver.length > 0) {
    currentDrivers = myDriver;
  } else if (orderedDrivers.length > 0) {
    currentDrivers = orderedDrivers;
  } else {
    currentDrivers = allDrivers;
  }

  if (currentDrivers.length === 0) {
    return <p>No drivers available</p>; // Handle case when no data is present
  }

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data to display only the items for the current page
  const driversToDisplay = currentDrivers.slice(startIndex, endIndex);

  // Calculate the total number of pages based on the number of drivers
  const totalPages = Math.ceil(currentDrivers.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  return (
    <div className={styles.container}>
      <div><SearchBar /></div>
      <div><Filter /></div>
      <div className={styles.cards}>
        {driversToDisplay.map((drivers) => (
          <Card
            key={drivers.id}
            id={drivers.id}
            name={drivers.nombre}
            teams={drivers.Teams ? drivers.Teams : drivers.teams}
            imagen={drivers.imagen.url ? drivers.imagen.url : drivers.imagen}
          />
        ))}
      </div>
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
  );
}