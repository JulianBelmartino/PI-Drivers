const {createDriver, getAllDrivers, getDriverById, getDriversByName} = require('../controllers/driversController.js')

const getDriversHandler = async ( req , res) => {
    try {
        const nombre = req.query.name;
        const resultado = nombre ? await getDriversByName(nombre) : await getAllDrivers();
        res.status(200).json(resultado);
      } catch (error) {
        console.error("Error en el controlador de conductores:", error);
        res.status(500).json({ error: "Error en el servidor" });
      }
    }

const getDriverHandler = async (req, res) => {
    const {id} = req.params
    const source = isNaN(id)? 'bdd': 'api';
    try {
        const driver = await getDriverById(id,source);
        res.status(200).json(driver)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createDriverHandler = async (req, res) => {
    const {nombre,apellido,nacionalidad,imagen,descripcion,fechaNac,Teams} = req.body;

    try {
        const newDriver = await createDriver(nombre,apellido,nacionalidad,imagen,descripcion,fechaNac,Teams);
        res.status(200).json(newDriver)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {getDriverHandler,getDriversHandler,createDriverHandler}