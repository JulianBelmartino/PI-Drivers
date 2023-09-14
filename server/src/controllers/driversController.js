const axios = require("axios");
const { Driver, Team } = require("../db");
const { Op } = require("sequelize");

const formatArray = (array) => 
    array.map((elemento) => {
        return{
            id: elemento.id,
            nombre: elemento.name.forename,
            apellido: elemento.name.surname,
            descripcion: elemento.description,
            imagen: elemento.image,
            nacionalidad: elemento.nationality,
            fechaNac: elemento.dob,
            created: false

        }

    })

    const createDriver = async  (nombre, apellido,descripcion,imagen,nacionalidad,fechaNac,teams) => {
        const resultado = await Driver.create({nombre, apellido, descripcion, imagen, nacionalidad, fechaNac})
    
    //agregar teams a drivers-teams
    await resultado.addTeams(teams)
    
    const driverNew = await Driver.findByPk(resultado.id, {
        include: {
            model: Team,
            attributes:["nombres"],
            through:{
                attributes: []
            }
        }
    }) 
    return driverNew
}

//Get Driver BY ID

const getDriverById = async (id,source) => {
//el parametro source define donde buscara los drivers
const driver =
    source === 'api'?
        await (await axios.get(`http://localhost:5000/drivers/${id}`)).data
    :
        await Driver.findByPk(id,{include:{
            model: Team,
            attributes:["nombre"],
            through:{
                attributes: []
            }
        },
    });
        if(source === 'bdd'){
            return driver
        }else{
            return {
                id: driver.id,
                nombre: driver.name.forename,
                apellido: driver.name.surname,
                descripcion: driver.description,
                nacionalidad: driver.nationality,
                fechaNac: driver.dob,
                imagen: driver.image,
                teams: driver.teams,
                created: false
        
            }
        }
    }   

    //Get todos los drivers

    const getAllDrivers = async () => {
        const driversDatabase = await Driver.findAll();

        const driverApiOriginal = (await axios.get("http://localhost:5000/drivers")).data 
        const driversApi = formatArray(driverApiOriginal)
    
        return [...driversApi, ...driversDatabase]
    }

    //buscar por nombre

    const getDriversByName = async (nombre) => {
        try {
          // Búsqueda en la base de datos local
          const driversDatabase = await Driver.findAll();
          const databaseFiltrada = driversDatabase.filter((driver) => driver.nombre.toLowerCase().includes(nombre.toLowerCase()));
      
          // Búsqueda en la API externa
          const driverApiOriginal = (await axios.get("http://localhost:5000/drivers")).data;
          const driversApi = formatArray(driverApiOriginal);
          const apiFiltrada = driversApi.filter((driver) => {
            return driver.nombre !== undefined && (
                driver.apellido.toLowerCase().includes(nombre.toLowerCase()) ||
                driver.nombre.toLowerCase().includes(nombre.toLowerCase())
              );
          })
          //console.log(driversApi)
          // Combinar resultados y limitar a 15
          const allDriversNames = databaseFiltrada.concat(apiFiltrada).slice(0, 15);
          return allDriversNames;
        } catch (error) {
          // Manejar errores aquí
          console.error("Error en la búsqueda de conductores:", error);
          throw error; // Puedes decidir si deseas propagar el error o manejarlo de otra manera
        }
      };

    module.exports = { createDriver, getDriverById, getAllDrivers, getDriversByName };