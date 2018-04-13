import React from 'react';
import _ from 'lodash'
import { getMovies, getSingleMovie } from '../Api'
import EditDialog from '../container/EditDialog'


import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Movie from 'material-ui/svg-icons/av/movie';
import { blue500, grey400} from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import { black } from 'material-ui/styles/colors';


class MovieList extends React.Component {

  componentWillMount() {
    this.props.onGetMoviesRequest();
    getMovies()
      .then(
        movie => {
          this.props.onGetMoviesSuccess(movie)
        },
        error => this.props.onGetMoviesFailure(error)
      )
  }

  streamMovie(streamId) {
    console.log(streamId)
    getSingleMovie(streamId)
      .then(streamMovie => this.props.onStreamMovieRequest(streamMovie));

  }
  
  editMovie(movieId) {
    getSingleMovie(movieId)
      .then(movie => this.props.onEditMovieRequest(movieId, movie));
  }

  uploadMovie(movieId) {
    this.props.onOpenUpload(movieId)
  }

  render() {
    const { movies } = this.props
    const { search } = this.props
    return (
      <div style={{paddingTop: '64px'}}>
      {/* <button className="MyButton" onClick={(e) => this.handleClick()}> {"Click me"} </button> */}
        
        <List>
          <Subheader inset={true}>Movies</Subheader>
          {
            _.map(
              _.filter(movies, (mov) => search!==""? _.includes(mov.title, search) : true)
              , (movie) =>
              <ListItem
                leftAvatar={
                    <Avatar 
                      icon={<Movie />} 
                      backgroundColor={movie.pending===true? grey400 : blue500} 
                      onClick= {movie.pending===true? (e) => this.uploadMovie(movie.movieId) : (e) => this.streamMovie(movie.movieId)}/>}
                rightIcon={
                    <ActionInfo
                      onClick={(e)=> this.editMovie(movie.movieId)}/>}
                primaryText={movie.title===""? "No title" : movie.title}
                key={movie.movieId}
                secondaryText={movie.releaseDate===null? " " : movie.releaseDate}
                disabled={movie.pending}
                style={{color: movie.pending===true? grey400 : black}}  
              />)
          }
        </List>
        <Divider inset={true} />
        <List>
          <Subheader inset={true}>Folders</Subheader>
          <ListItem
            leftAvatar={<Avatar icon={<FileFolder />} />}
            rightIcon={<ActionInfo />}
            primaryText="Drama films"
          />
          <ListItem
            leftAvatar={<Avatar icon={<FileFolder />}/>}
            rightIcon={<ActionInfo />}
            primaryText="Action films"
            
          />
        </List>
        <EditDialog> </EditDialog>
      </div>
    )
  }
}



export default MovieList;