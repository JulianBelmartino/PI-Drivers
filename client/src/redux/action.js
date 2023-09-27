export const FILTER_SOURCE = 'FILTER_SOURCE'
export const FILTER_TEAM = 'FILTER_TEAM'
export const ORDER = 'ORDER'
export const ORDER_ALPHA = 'ORDER_ALPHA'
export const ORDER_DOB = 'ORDER_DOB'
export const GET_DRIVERS = 'GET_DRIVERS'
export const GET_TEAMS = 'GET_TEAMS'
export const DRIVER_DETAIL = 'DRIVER_DETAIL'
export const CREATE_DRIVER = 'CREATE_DRIVER_SUCCESS'
export const DRIVERS_NAME = 'DRIVERS_NAME'
export const TOGGLE_FLAG = 'TOGGLE_FLAG'
import axios from "axios";

// ACTION | addFav
export function getDrivers(){
   return async function(dispatch){
  const response = await axios('http://localhost:3001/drivers')
  return dispatch({
   type: GET_DRIVERS,
   payload: response.data,
});
}
}

export function getDriverDetail(id){
   return async function(dispatch){
      const response = await axios(`http://localhost:3001/drivers/${id}`)
      return dispatch({
         type: DRIVER_DETAIL,
         payload: response.data,
      });
   }
}

export function getDriverByName(name){
   return async function(dispatch){
      const response = await axios(`http://localhost:3001/drivers?name.forename=${name}`)
      return dispatch({
         type: DRIVERS_NAME,
         payload: response.data,
      });
   }
}

export function createDriver(driverData) {
   return async function(dispatch) {
     try {
       const response = await axios.post('http://localhost:3001/drivers/', driverData);
       return dispatch({
         type: CREATE_DRIVER,
         payload: response.data,
         
       });
       
     } catch (error) {
       console.error('Error al crear el conductor:', error);
     }
   };
 }

export const filterCardsSource = (filter, flag) => {
    return{type:FILTER_SOURCE,payload:{filter,flag}}
}
export const filterCardsTeams = (filter,teamsFlag) => {
   return{type:FILTER_TEAM,payload:{filter,teamsFlag}}
}
export function getTeams(){
   return async function(dispatch){
  const response = await axios('http://localhost:3001/teams')
  return dispatch({
   type: GET_TEAMS,
   payload: response.data,
});
}
}
export const orderCards = (orden) => {
    return{type:ORDER,payload:orden}
}
export const orderCardsAlpha = (orden) => {
   return{type:ORDER_ALPHA, payload:orden}
}
export const orderCardsDob = (orden) => {
   return{type:ORDER_DOB,payload:orden}
}
export const toggleFlag = () => ({
   type: TOGGLE_FLAG,
 });