const path = '/'

export const getMovies = () => fetch(`http://localhost:9999/api/movies`)
    .then(response => response.json());

export const uploadMovie = (movie) => fetch('http://localhost:8020/api/upload', {
  method: 'POST',
  body: movie
})
.catch(error => console.error('Error:', error));

export const postMovie = (movie) => fetch(`http://localhost:8010/api/movies`, {
  method: 'POST',
  body: JSON.stringify(movie), 
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(res => res.status!==409? res.json(): Promise.reject("Yet extisting movie"))
.catch(error => console.error('Error:', error));