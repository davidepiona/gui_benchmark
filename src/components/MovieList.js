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
import Paper from 'material-ui/Paper';
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
    this.props.onStreamMovieRequest(streamId);

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
    return (
      <Paper style={list_container} zDepth={3}>
      {/* <button className="MyButton" onClick={(e) => this.handleClick()}> {"Click me"} </button> */}
        
        <List>
          <Subheader inset={true}>Movies</Subheader>
          {
            _.map(movies, (movie) =>
              <ListItem
                leftAvatar={
                    <Avatar 
                      icon={<Movie />} 
                      backgroundColor={movie.pending===true? grey400 : blue500} 
                      onClick= {movie.pending===true? (e) => this.uploadMovie(movie.movieId) : (e) => this.streamMovie(movie.movieId)}/>}
                rightIcon={
                    <ActionInfo
                      onClick={(e)=> this.editMovie(movie.movieId)}/>}
                primaryText={movie.title}
                key={movie.movieId}
                secondaryText={movie.releaseDate}
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
      </Paper>
    )
  }
}

const list_container = {

  marginRight: 24,
  marginLeft: 200,
  maxWidth: 700,
  maxHeight: 350,
  border: 'solid 1px #d9d9d9',
  borderBottom: 'none',
  overflow: 'scroll',

};


export default MovieList;