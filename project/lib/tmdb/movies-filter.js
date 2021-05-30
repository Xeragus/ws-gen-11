const axios = require('axios');

module.exports = async (name) => {
  const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=6b1f4395852e8557b06be0c1ce52c1aa&query=${name}`)

  const arr = []
  res.data.results.forEach(element => {
    const movies = {
      title: element.title,
      rating: element.vote_average,
      overview: element.overview,
      release_date: element.release_date
    }
    arr.push(movies)
  });
  return arr
}