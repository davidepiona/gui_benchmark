const path = '/'

export const getMovies = () => fetch(`/api/movies`)
    .then(response => response.json());

export const getSingleMovie = (id) => fetch(`/api/movies/${id}`)
    .then(response => response.json());

export const uploadMovie = (id, movie) => fetch(`/api/upload/${id}`, {
  method: 'POST',
  body: movie
})
.catch(error => console.error('Error:', error));

export const postMovie = (movie) => fetch(`/api/movies`, {
  method: 'POST',
  body: JSON.stringify(movie), 
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(res => res.status!==409? res.json(): Promise.reject("Yet extisting movie"))
.catch(error => console.error('Error:', error));

export const editMovie = (id, movie) => fetch(`/api/movies/${id}`, {
  method: 'PUT',
  body: JSON.stringify(movie), 
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(res => res.status!==409? res : Promise.reject("Not extisting movie"))
.catch(error => console.error('Error:', error));

export const deleteMovie = (id) => fetch(`/api/movies/${id}`, {
  method:'DELETE',
})
.catch(error => console.error('Error:', error));