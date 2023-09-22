import {orderCards, orderCardsAlpha, orderCardsDob, filterCardSource, getTeams } from '../../redux/action';
import { useDispatch,useSelector } from 'react-redux';

export default function filterCards(props){
const dispatch = useDispatch()
const driverOrdered = useSelector((state) => state.orderedDrivers)
const teams = useSelector((state) => state.allTeams)

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
    const handleFilterSource = (event) => {
        const filter = event.target.value
        dispatch(filterCardSource(filter))
        }
    const handleFilterTeams = (event) => {
        const filter = event.target.value
        dispatch(filterCardTeams(filter))
        }
        getTeams()
        console.log(teams)
   
     return(

        <div >
        <select onChange={handleOrder} >
              <option value="A">Ascending</option>
              <option value="D">Descending</option>
          </select>
          <select onChange={handleOrderAlpha} >
               <option value="orden">Alfabetico</option>
               <option value="Alpha">A-Z</option>
               <option value="Reverse">Z-A</option>
          </select>
          <select onChange={handleOrderDob} >
              <option value="Fecha">Fecha de Nacimiento</option>
              <option value="Pasado a Presente">Pasado a presente</option>
              <option value="Presente a Pasado">Presente a pasado</option>
          </select>
           <select onChange={handleFilterSource} >
              <option value="orden">Por origen</option>
              <option value="bdd">Base de datos</option>
              <option value="api">API</option>
          </select>
          <select onChange={handleFilterTeams}>
            {teams.map((team, index) => (
            <option key={index} value={team.name}>
             {team.name}
            </option>
         ))}
              
          </select>
          </div>
        )
}
