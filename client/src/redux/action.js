export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const FILTER = 'FILTER'
export const ORDER = 'ORDER'
export const GET_DRIVERS = 'GET_DRIVERS'
export const DRIVER_DETAIL = 'DRIVER_DETAIL'
export const CREATE_DRIVER = 'CREATE_DRIVER_SUCCESS'
export const DRIVERS_NAME = 'DRIVERS_NAME'

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
      const response = await axios(`http://localhost:3001/drivers?name=${name}`)
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
       // You can dispatch an error action or handle errors in a way that suits your application.
     }
   };
 }

export const removeFavorite = (id) => async (dispatch) => {
   try {
      const endpoint = `http://localhost:3001/rickandmorty/fav/${id}`;
      const response = await axios.delete(endpoint);

      return dispatch({
         type: REMOVE_FAVORITE,
         payload: response.data,
      });
   } catch (error) {
      console.error('Error while removing favorite:', error);
   }
};

export const filterCards = (gender) => {
    return{type:FILTER,payload:gender}
}
export const orderCards = (orden) => {
    return{type:ORDER,payload:orden}
}