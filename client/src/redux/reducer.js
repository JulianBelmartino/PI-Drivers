import { GET_DRIVERS, GET_TEAMS, CREATE_DRIVER, DRIVER_DETAIL, DRIVERS_NAME, ORDER, ORDER_ALPHA, ORDER_DOB, FILTER_SOURCE, FILTER_TEAM } from "./action";

const initialState ={
    myDriver: [],
    allDrivers: [],
    orderedDrivers: [],
    idDrivers:[],
    allTeams: [],
    driverDetail: [],
    cleanState: []
};
const rootReducer = (state = initialState,action) => {
    switch(action.type){
      
        case GET_DRIVERS:
         return{ ...state, allDrivers: action.payload}
        
         case GET_TEAMS:
          return{ ...state, allTeams: action.payload}
 
        case DRIVER_DETAIL:
         return {...state, driverDetail: action.payload}
       
        case CREATE_DRIVER:
         return { ...state, allDrivers: action.payload }
                
        case DRIVERS_NAME:
            return { ...state, myDriver: action.payload}
    
        case ORDER:
                let idDrivers = [];
              if (state.myDriver.length !== 0) {
                idDrivers = [...state.myDriver];
              } else if (state.orderedDrivers.length !== 0) {
                idDrivers = [...state.orderedDrivers];
              } else {
                idDrivers = [...state.allDrivers];
              }
              
              if (action.payload === "A") {
                
                idDrivers.sort((a, b) => {
              // Handle NaN values by moving them to the end
              if (isNaN(a.id)) return 1;
              if (isNaN(b.id)) return -1;
                return a.id - b.id;
              });
              } else if (action.payload === "D") {
                idDrivers.sort((a, b) => {
              // Handle NaN values by moving them to the end
              if (isNaN(a.id)) return -1;
              if (isNaN(b.id)) return 1;
                 return b.id - a.id;
               });
              }

            return {...state, orderedDrivers: idDrivers};
       
        case ORDER_ALPHA:
                let alphabeticalDrivers = [];
                if (state.myDriver.length !== 0) {
                  alphabeticalDrivers = [...state.myDriver];
                } else if (state.orderedDrivers.length !== 0) {
                  alphabeticalDrivers = [...state.orderedDrivers];
                } else {
                  alphabeticalDrivers = [...state.allDrivers];
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
          if (state.myDriver.length !== 0) {
            dobDrivers = [...state.myDriver];
          } else if (state.orderedDrivers.length !== 0) {
            dobDrivers = [...state.orderedDrivers];
          } else {
            dobDrivers = [...state.allDrivers];
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
            if (state.myDriver.length !== 0) {
              sourceDrivers = [...state.myDriver];
            } else if (state.orderedDrivers.length !== 0) {
              sourceDrivers = [...state.orderedDrivers];
            } else {
              sourceDrivers = [...state.allDrivers];
            }
            
            if (action.payload === "bdd") {
              const driversApi = sourceDrivers.filter((driver) => driver.created === false);
              const driversBdd = sourceDrivers.filter((driver) => driver.created === true);
              console.log("Drivers in 'bdd' category:", driversBdd.length)
              console.log("Drivers in 'api' category:", driversApi.length);
              return { ...state, orderedDrivers: driversBdd, discartedDrivers : driversApi };
            } else if (action.payload === "api") {
              const driversApi = sourceDrivers.filter((driver) => driver.created === false);
              const driversBdd = sourceDrivers.filter((driver) => driver.created === true);
              console.log("Drivers in 'bdd' category:", driversBdd.length)
              console.log("Drivers in 'api' category:", driversApi.length);
              return { ...state, orderedDrivers: driversApi, discartedDrivers : driversBdd };
            }else if(action.payload === "All"){
              let cleanDrivers = [...state.allDrivers]
              console.log("Drivers in 'all' category:", driversAll.length);
              return { ...state, orderedDrivers: cleanDrivers };
            }
          
            return { ...state, orderedDrivers: sourceDrivers };
          
          case FILTER_TEAM:
            let teamDrivers = [];
            if (state.myDriver.length !== 0) {
              teamDrivers = [...state.myDriver];
            } else if (state.orderedDrivers.length !== 0) {
              teamDrivers = [...state.orderedDrivers];
            } else {
              teamDrivers = [...state.allDrivers];
            }
            
            const filteredDbTeamDrivers = teamDrivers.filter((driver) => driver.Teams);
            const driversDbTeam = filteredDbTeamDrivers.filter((driver) => driver.Teams.includes(action.payload));

            const filteredTeamDrivers = teamDrivers.filter((driver) => driver.teams);
            const driversTeam = filteredTeamDrivers.filter((driver) => driver.teams.includes(action.payload));
            
            let mergedfTeams = [...driversTeam, ...driversDbTeam];
            return { ...state, orderedDrivers: mergedfTeams };
            
            default:
              return {...state}
             
          } 
  
}
export default rootReducer