const { Router } = require('express');
const driverRouter = Router();

const { getDriverHandler, getDriversHandler, createDriverHandler } = require('../handlers/driversHandlers');

// Configura las rutas para cada controlador
driverRouter.get('/', getDriversHandler); // Ruta para obtener todos los conductores
driverRouter.get('/:id', getDriverHandler); // Ruta para obtener un conductor por ID
driverRouter.post('/', createDriverHandler); // Ruta para crear un nuevo conductor

module.exports = driverRouter;