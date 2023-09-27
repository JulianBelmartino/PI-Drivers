const axios = require("axios");
const { Driver, Team } = require("../db");


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
      
      const formattedTeams = driver.Teams.map((team) => team.nombre).join(', ');

      const description = driver.description || "No description available";
      const image = driver.image || 'https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png';

      return {
        ...driver.toJSON(),
        teams: formattedTeams,
        description: description,
      };
    } else {
      const description = driver.description || "No description available";
      const image = driver.image || 'https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png';
      return {
        id: driver.id,
        nombre: driver.name.forename,
        apellido: driver.name.surname,
        descripcion: description,
        nacionalidad: driver.nationality,
        fechaNac: driver.dob,
        imagen: image,
        teams: driver.teams,
        created: false,
      };
    }
  } catch (error) {
    // Manejar errores aquí
    console.error(`Error obteniendo conductor por ID ${id}:`, error);
    throw error;
  }
};
    //Get todos los drivers

    const getAllDrivers = async () => {
      try {
       
        const driversDatabase = await Driver.findAll({
          include: {
            model: Team,
            attributes: ["nombre"],
            through: {
              attributes: []
            }
          }
        });
    
        // formatea la bdd
        const formattedDatabaseData = driversDatabase.map(driver => ({
          ...driver.toJSON(), // Convert the Sequelize object to JSON
          Teams: driver.Teams.map(team => team.nombre).join(', ') // Transform the "Teams" field
        }));
    
      
        const driverApiOriginal = (await axios.get("http://localhost:5000/drivers")).data;
        const driversApi = formatArray(driverApiOriginal);
        //eliminada entradas de conductores sin escuderias.
        const cleanDrivers = driversApi.filter((driver) => driver.teams)
        
        //une las dos fuentes de conductores
        return [...cleanDrivers, ...formattedDatabaseData];
      } catch (error) {
        
        throw error; 
      }
    };

    //buscar por nombre

    const getDriversByName = async (nombre) => {
        try {
          console.log(nombre)
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
      driver.apellido.toLowerCase().includes(nombre.toLowerCase()) ||
      driver.nombre.toLowerCase().includes(nombre.toLowerCase()) 
    );

    
    const formattedDatabaseFiltrada = databaseFiltrada.map((driver) => ({
      ...driver.toJSON(),
      Teams: driver.Teams.map((team) => team.nombre).join(', '),
    }));

    // Búsqueda en la API externa
    const driverApiOriginal = (await axios.get("http://localhost:5000/drivers")).data;
    const driversApi = formatArray(driverApiOriginal);
    const apiFiltrada = driversApi.filter((driver) => {
      return driver.apellido !== undefined && (
          driver.apellido.toLowerCase().includes(nombre.toLowerCase()) ||
          driver.nombre.toLowerCase().includes(nombre.toLowerCase()) 
        );
    })

    //Combinar resultados y limitar a 15
    const allDrivers = [...formattedDatabaseFiltrada, ...apiFiltrada].slice(0, 15);

    return allDrivers;
  } catch (error) {
    
    throw error; 
  }
};

    module.exports = { createDriver, getDriverById, getAllDrivers, getDriversByName };