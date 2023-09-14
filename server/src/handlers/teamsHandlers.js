const {getAllTeams} = require('../controllers/teamsController.js')

const teamsHandler = async (req, res) => {
    const respuesta = await getAllTeams()
    res.status(200).json(respuesta)
}
module.exports = {teamsHandler}