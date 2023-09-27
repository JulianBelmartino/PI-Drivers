import {orderCards, orderCardsAlpha, orderCardsDob, filterCardsSource, filterCardsTeams, getTeams } from '../../redux/action';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import styles from './filter.module.css'

export default function filterCards(){
    const dispatch = useDispatch()
    const driverOrdered = useSelector((state) => state.orderedDrivers)
    const teams = useSelector((state) => state.allTeams)
    
    const [flag, setFlag] = useState(false)
    const [teamsFlag, setTeamsFlag] = useState(false)
    
    const handleFilterSource = (event) => {
        const filter = event.target.value
        dispatch(filterCardsSource(filter,flag))
        setFlag(true)
        }
    const handleFilterTeams = (event) => {
        const filter = event.target.value
        dispatch(filterCardsTeams(filter,teamsFlag))
        setTeamsFlag(true)
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
              <option value="All">By Source</option>
              <option value="bdd">Database</option>
              <option value="api">API</option>
          </select>
          <select className={styles.filter} onChange={handleFilterTeams}>
           <option value="All">Teams</option>
            {teams.map((team) => (
            <option key={team.id} value={team.name}>
             {team.nombre}
            </option>
            
         ))}
              
          </select>
          
        <select className={styles.filter} onChange={handleOrder} >
              <option value="Id">By ID</option>
              <option value="A">Ascendent</option>
              <option value="D">Descendent</option>
          </select>
          <select className={styles.filter} onChange={handleOrderAlpha} >
               <option value="orden">Alphabetical</option>
               <option value="Alpha">A-Z</option>
               <option value="Reverse">Z-A</option>
          </select>
          <select className={styles.filter} onChange={handleOrderDob} >
              <option value="Fecha">By Birthdate</option>
              <option value="Pasado a Presente">Past to Present</option>
              <option value="Presente a Pasado">Present to Past</option>
          </select>
  
          </div>
        )
}
