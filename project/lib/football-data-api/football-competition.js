const axios = require('axios');


module.exports = async (competition) => {
  const res = await axios({
    headers: { 'X-Auth-Token': '5585eb6627f94cf4bcf408f59abf28f6' },
    url: `https://api.football-data.org/v2/competitions/${competition}/standings?`,
    dataType: 'json',
    type: 'GET',
  })

  const array = []
  res.data.standings[0].table.forEach(element => {
    const stats = {
      position: element.position,
      points: element.points,
      team: element.team.name,
      won: element.won,
      draw: element.draw,
      lost: element.lost
    }
    array.push(stats)
  });
  return array
}