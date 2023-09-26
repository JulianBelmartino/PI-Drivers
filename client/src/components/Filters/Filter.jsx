import {orderCards, orderCardsAlpha, orderCardsDob, filterCardsSource, filterCardsTeams, getTeams } from '../../redux/action';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import styles from './filter.module.css'

export default function filterCards(){
    const dispatch = useDispatch()
    const driverOrdered = useSelector((state) => state.orderedDrivers)
    const teams = useSelector((state) => state.allTeams)
    
    const [flag, setFlag] = useState(false)
    
    const handleFilterSource = (event) => {
        const filter = event.target.value
        dispatch(filterCardsSource(filter,flag))
        setFlag(true)
        }
    const handleFilterTeams = (event) => {
        const filter = event.target.value
        dispatch(filterCardsTeams(filter))
        }

        useEffect(() => {
    dispatch(getTeams());
    }, []);
    
    const handleOrder = (event) => {
        const order = event.target.value
        dispatch(orderCards(order))
        }
    const handleOrderAlpha = (event) => {
        const order = event.target.value
        dispatch(orderCardsAlpha(order))
        }    
    const handleOrderDob = (event) => {
        const order = event.target.value
        dispatch(orderCardsDob(order))
        }    

     return(

        
        <div>
           <select className={styles.filter} onChange={handleFilterSource} >
              <option value="All">Por origen</option>
              <option value="bdd">Base de datos</option>
              <option value="api">API</option>
          </select>
          <select className={styles.filter} onChange={handleFilterTeams}>
           <option>Escuderias</option>
            {teams.map((team) => (
            <option key={team.id} value={team.name}>
             {team.nombre}
            </option>
            
         ))}
              
          </select>
          
        <select className={styles.filter} onChange={handleOrder} >
              <option value="Id">Por ID</option>
              <option value="A">Ascendente</option>
              <option value="D">Descendente</option>
          </select>
          <select className={styles.filter} onChange={handleOrderAlpha} >
               <option value="orden">Alfabetico</option>
               <option value="Alpha">A-Z</option>
               <option value="Reverse">Z-A</option>
          </select>
          <select className={styles.filter} onChange={handleOrderDob} >
              <option value="Fecha">Fecha de Nacimiento</option>
              <option value="Pasado a Presente">Pasado a presente</option>
              <option value="Presente a Pasado">Presente a pasado</option>
          </select>
  
          </div>
        )
}
