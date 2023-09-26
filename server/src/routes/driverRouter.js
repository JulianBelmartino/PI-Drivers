const { Router } = require('express');
const driverRouter = Router();
const validate = require('../middlewares/driversValidate');

const { getDriverHandler, getDriversHandler, createDriverHandler } = require('../handlers/driversHandlers');


driverRouter.get('/', getDriversHandler);
driverRouter.get('/:id', getDriverHandler); 
driverRouter.post('/', validate, createDriverHandler); 

module.exports = driverRouter;