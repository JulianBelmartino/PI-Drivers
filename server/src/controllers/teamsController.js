const axios = require('axios');
const { Team } = require('../db');

const getAllTeams = async () => {
    //consulta a la api y envio a la Base de Datos
    const driversApi = (await axios.get("http://localhost:5000/drivers")).data

    driversApi.forEach(driver => {
        if(driver.team){
                    //formatea los nombres de los teams
            let allTeams = driver.teams.split(/\s*,\s*/);
            //encuentra o crea el team en la base de datos
            allTeams.forEach(driverTeam => {
                Team.findOrCreate({
                    where:{nombre:driverTeam}
                })
            })
        }
    })
    //llama a los teams de la base de datos
const teamAll = await Team.findAll()
return teamAll
}

module.exports= {getAllTeams}