// const registry = 'http://localhost:9999'   //per alcuni utilizzi in locale
// const upload = 'http://localhost:9999'     //per alcuni utilizzi in locale
const registry = ''
const upload = ''

export const getMovies = () => fetch(`${registry}/api/movies`)
    .then(response => response.json());

export const getSingleMovie = (id) => fetch(`${registry}/api/movies/${id}`)
    .then(response => response.json());

export const uploadMovie = (id, movie) => fetch(`${upload}/api/upload/${id}`, {
  method: 'POST',
  body: movie
})
.catch(error => console.error('Error:', error));

export const postMovie = (movie) => fetch(`${registry}/api/movies`, {
  method: 'POST',
  body: JSON.stringify(movie), 
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(res => res.status!==409? res.json(): Promise.reject("Yet extisting movie"))
.catch(error => console.error('Error:', error));

export const editMovie = (id, movie) => fetch(`${registry}/api/movies/${id}`, {
  method: 'PUT',
  body: JSON.stringify(movie), 
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(res => res.status!==409? res : Promise.reject("Not extisting movie"))
.catch(error => console.error('Error:', error));

export const deleteMovie = (id) => fetch(`${registry}/api/upload/delete/${id}`, {
  method:'DELETE',
})
.catch(error => console.error('Error:', error));