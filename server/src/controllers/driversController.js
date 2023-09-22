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
            teams:elemento.teams,
            created: false

        }

    })

    const createDriver = async (nombre, apellido, nacionalidad, imagen, descripcion, fechaNac, Teams) => {
      try {
        // Crear los equipos y almacenarlos en un array
        const teamInstances = [];
        for (const teamData of Teams) {
         
          for (const driverTeam of teamData.nombre.split(/\s*,\s*/)) {
            const [team, created] = await Team.findOrCreate({
              where: { nombre: driverTeam }
            });
            
            teamInstances.push(team);
          }
        }
      
        // Crear el controlador y asociar los equipos
        const resultado = await Driver.create({ nombre, apellido, nacionalidad, imagen, descripcion, fechaNac });
        await resultado.addTeams(teamInstances)
      //  console.log(teamInstances)
       //console.log(resultado)
        await resultado.save();
        // Recuperar el controlador con los equipos asociados
        const driverNew = await Driver.findByPk(resultado.id, {
          include: {
            model: Team,
            attributes: ["nombre"],
            through: {
              attributes: []
            }
          }
        });

        await resultado.save();
        return driverNew;
      } catch (error) {
        console.error("Error en createDriver:", error);
        throw error;
      }
    };

//Get Driver BY ID

const getDriverById = async (id, source) => {
  // El parámetro source define dónde buscará los drivers
  try {
    const driver =
      source === 'api'
        ? await (await axios.get(`http://localhost:5000/drivers/${id}`)).data
        : await Driver.findByPk(id, {
            include: {
              model: Team,
              attributes: ["nombre"],
              through: {
                attributes: [],
              },
            },
          });

    if (source === 'bdd') {
      // Format the "Teams" field for database source
      const formattedTeams = driver.Teams.map((team) => team.nombre).join(', ');

      return {
        ...driver.toJSON(),
        teams: formattedTeams,
      };
    } else {
      // Transform the data for API source
      return {
        id: driver.id,
        nombre: driver.name.forename,
        apellido: driver.name.surname,
        descripcion: driver.description,
        nacionalidad: driver.nationality,
        fechaNac: driver.dob,
        imagen: driver.image,
        teams: driver.teams,
        created: false,
      };
    }
  } catch (error) {
    // Manejar errores aquí
    console.error(`Error obteniendo conductor por ID ${id}:`, error);
    throw error; // Puedes decidir si deseas propagar el error o manejarlo de otra manera
  }
};
    //Get todos los drivers

    const getAllDrivers = async () => {
      try {
        // Fetch data from the database
        const driversDatabase = await Driver.findAll({
          include: {
            model: Team,
            attributes: ["nombre"],
            through: {
              attributes: []
            }
          }
        });
    
        // Transform the database data
        const formattedDatabaseData = driversDatabase.map(driver => ({
          ...driver.toJSON(), // Convert the Sequelize object to JSON
          Teams: driver.Teams.map(team => team.nombre).join(', ') // Transform the "Teams" field
        }));
    
        // Fetch data from the API
        const driverApiOriginal = (await axios.get("http://localhost:5000/drivers")).data;
        const driversApi = formatArray(driverApiOriginal);
          console.log(formattedDatabaseData)
        // Transform the API data
        // Merge both sets of data
        return [...driversApi, ...formattedDatabaseData];
      } catch (error) {
        console.error('Error in getAllDrivers:', error);
        throw error; // Optionally rethrow the error for handling in the caller
      }
    };

    //buscar por nombre

    const getDriversByName = async (nombre) => {
        try {
          // Búsqueda en la base de datos local
          const driversDatabase = await Driver.findAll({
            include: {
              model: Team,
              attributes: ["nombre"],
              through: {
                attributes: []
              }
            }
          });
          const databaseFiltrada = driversDatabase.filter((driver) =>
      driver.nombre.toLowerCase().includes(nombre.toLowerCase())
    );

    // Format the "Teams" field in the database results
    const formattedDatabaseFiltrada = databaseFiltrada.map((driver) => ({
      ...driver.toJSON(),
      Teams: driver.Teams.map((team) => team.nombre).join(', '),
    }));

    // Búsqueda en la API externa
    const driverApiOriginal = (await axios.get("http://localhost:5000/drivers")).data;
    const driversApi = formatArray(driverApiOriginal);
    const apiFiltrada = driversApi.filter((driver) => {
      return driver.nombre !== undefined && (
          driver.apellido.toLowerCase().includes(nombre.toLowerCase()) ||
          driver.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
    })

    // Combinar resultados y limitar a 15
    const allDrivers = [...formattedDatabaseFiltrada, ...apiFiltrada].slice(0, 15);

    return allDrivers;
  } catch (error) {
    // Manejar errores aquí
    console.error("Error en la búsqueda de conductores:", error);
    throw error; // Puedes decidir si deseas propagar el error o manejarlo de otra manera
  }
};

    module.exports = { createDriver, getDriverById, getAllDrivers, getDriversByName };