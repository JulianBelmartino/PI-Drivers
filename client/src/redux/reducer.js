import { GET_DRIVERS, GET_TEAMS, CREATE_DRIVER, DRIVER_DETAIL, DRIVERS_NAME, ORDER, ORDER_ALPHA, ORDER_DOB, FILTER_SOURCE, FILTER_TEAM } from "./action";

const initialState ={
    myDriver: [],
    allDrivers: [],
    orderedDrivers: [],
    allTeams: []
};
const rootReducer = (state = initialState,action) => {
    switch(action.type){
      default:
        return {...state}
       
        case GET_DRIVERS:
         return{ ...state, allDrivers: action.payload}
        
         case GET_TEAMS:
          return{ ...state, allTeams: action.payload}
 
        case DRIVER_DETAIL:
            return { myDriver: action.payload}
       
        case CREATE_DRIVER:
         return { ...state, allDrivers: action.payload };
                
        case DRIVERS_NAME:
            return { ...state, myDriver: action.payload}
    
        case ORDER:
            let orderedDrivers = [];
              if (state.myDriver.length === 0) {
                  orderedDrivers = [...state.allDrivers];
              } else {
                  orderedDrivers = [...state.myDriver];
              }

              if (action.payload === "A") {
                 orderedDrivers.sort((a, b) => {
              // Handle NaN values by moving them to the end
              if (isNaN(a.id)) return 1;
              if (isNaN(b.id)) return -1;
                return a.id - b.id;
              });
              } else if (action.payload === "D") {
                 orderedDrivers.sort((a, b) => {
              // Handle NaN values by moving them to the end
              if (isNaN(a.id)) return -1;
              if (isNaN(b.id)) return 1;
                 return b.id - a.id;
               });
              }

            return {...state, orderedDrivers: orderedDrivers};
       
        case ORDER_ALPHA:
              let alphabeticalDrivers = [];
               if (state.myDriver.length === 0) {
                 alphabeticalDrivers = [...state.allDrivers];
          } else {
            alphabeticalDrivers = [...state.myDriver];
          }
  
        if (action.payload === "Alpha") {
            alphabeticalDrivers.sort((a, b) => {
                 // Use localeCompare for accurate alphabetical sorting
            return a.nombre.localeCompare(b.nombre);
        });
        } else if (action.payload === "Reverse") {
          alphabeticalDrivers.sort((a, b) => {
          // Use localeCompare for accurate alphabetical sorting in reverse
          return b.nombre.localeCompare(a.nombre);
        });
        }
  
        return {...state, orderedDrivers: alphabeticalDrivers};
        
        case ORDER_DOB:
        let dobDrivers = [];

          if (state.myDriver.length === 0) {
            dobDrivers = [...state.allDrivers];
          } else {
            dobDrivers = [...state.myDriver];
          }

          if (action.payload === "Pasado a Presente") {
            dobDrivers.sort((a, b) => {
             if (!a.fechaNac) return 1; // Si no hay fecha de nacimiento, a va al final
             if (!b.fechaNac) return -1; // Si no hay fecha de nacimiento, b va al final
               return new Date(a.fechaNac) - new Date(b.fechaNac);
           });
          } else if (action.payload === "Presente a Pasado") {
            dobDrivers.sort((a, b) => {
             if (!a.fechaNac) return 1; // Si no hay fecha de nacimiento, a va al final
             if (!b.fechaNac) return -1; // Si no hay fecha de nacimiento, b va al final
             return new Date(b.fechaNac) - new Date(a.fechaNac);
             });
            }
          return { ...state, orderedDrivers: dobDrivers };
          
          case FILTER_SOURCE:
            let sourceDrivers = [];
            if (state.myDriver.length === 0) {
              sourceDrivers = [...state.allDrivers];
            } else if (state.orderedDrivers.length === 0) {
              sourceDrivers = [...state.myDriver];
            } else {
              sourceDrivers = [...state.orderedDrivers];
            }
          
            if (action.payload === "bdd") {
              const driversBdd = sourceDrivers.filter((driver) => isNaN(driver.id));
              return { ...state, orderedDrivers: driversBdd };
            } else if (action.payload === "api") {
              const driversApi = sourceDrivers.filter((driver) => !isNaN(driver.id));
              return { ...state, orderedDrivers: driversApi };
            }
          
            return { ...state, orderedDrivers: sourceDrivers };
          
          case FILTER_TEAM:
            // Implementar lógica para filtrar controladores por equipo aquí
            return { ...state, orderedDrivers: orderedDrivers };
}
}
export default rootReducer