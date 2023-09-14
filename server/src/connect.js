axios.get('http://localhost:5000/drivers')
.then((response) => {
  let allDrivers = response.data;
  allDrivers.forEach(({ c}) => {
    if (!image) {
      image = ["Without Imagel"];
    }
    Country.create({
      id: cca3,
      name: name.common,
      flag: flags.png,
      continents: continents[0],
      capital: capital[0],
      subregion: subregion,
      area: area,
      population: population
    })
  });
})