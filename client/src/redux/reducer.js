import { GET_DRIVERS, CREATE_DRIVER, DRIVER_DETAIL, DRIVERS_NAME, ORDER, FILTER } from "./action";

const initialState ={
    myDriver: [],
    allDrivers: []
};
const rootReducer = (state = initialState,action) => {
    switch(action.type){
       
        case GET_DRIVERS:
         return{ ...state, allDrivers: action.payload}

         case DRIVER_DETAIL:
            return { myDriver: action.payload}
       
        case CREATE_DRIVER:
         return { ...state, allDrivers: action.payload };
                
         case DRIVERS_NAME:
            return { ...state, myDriver: action.payload}
            
         case FILTER:
            
            let filteredCharacters = [...state.myFavorites]
            if (action.payload === 'all') {
                return { ...state, myFavorites: filteredCharacters };
            } else if ( action.payload === 'Female' || action.payload === 'Male' || action.payload === 'Genderless' ||  action.payload === 'unknown'){
                 let result = filteredCharacters.filter(char => char.gender === action.payload);
                return { ...state,myFavorite: filteredCharacters, filteredResult: result  };
            }

        case ORDER:
            const orderedDrivers = [...state.myFavorites];
            if (action.payload === "A") {
              orderedDrivers.sort((a, b) => a.id - b.id); 
            } else if (action.payload === "D") {
              orderedDrivers.sort((a, b) => b.id - a.id); 
            }
            return {...state, myDrivers: orderedCharacters}   

        default:
            return {...state}
    }
}
export default rootReducer