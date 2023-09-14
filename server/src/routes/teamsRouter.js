const {Router} = require('express')

    const teamsRouter = Router()
    const { teamsHandler } = require('../handlers/teamsHandlers')

    teamsRouter.get('/', teamsHandler);
    
    module.exports = teamsRouter