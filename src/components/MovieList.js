import React from 'react';
import { List, ListItem } from 'material-ui/List';
import _ from 'lodash'

import MobileTearSheet from './MobileTearSheet';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Movie from 'material-ui/svg-icons/av/movie';
import { blue500, yellow600 } from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import Paper from 'material-ui/Paper';
import { getMovies } from '../Api'


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

  // handleClick(){
  //   console.log(this.props.open)
  // }

  render() {
    const { movies } = this.props
    return (
      <Paper style={list_container} zDepth={3}>
      {/* <button className="MyButton" onClick={(e) => this.handleClick()}> {"Click me"} </button> */}
        <List>
          <Subheader inset={true}>Folders</Subheader>
          <ListItem
            leftAvatar={<Avatar icon={<FileFolder />} />}
            rightIcon={<ActionInfo />}
            primaryText="Drama films"
          />
          <ListItem
            leftAvatar={<Avatar icon={<FileFolder />} />}
            rightIcon={<ActionInfo />}
            primaryText="Action films"
          />
        </List>
        <Divider inset={true} />
        <List>
          <Subheader inset={true}>Movies</Subheader>
          {
            _.map(movies, (movie) =>
              <ListItem
                leftAvatar={<Avatar icon={<Movie />} backgroundColor={blue500} />}
                rightIcon={<ActionInfo />}
                primaryText={movie.title}
                key={movie.movieId}
                secondaryText={movie.releaseDate}
              />)
          }
        </List>
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

const list_item = {
  border: '5px',
  fontSize: 10,
  lineHeight: '10px',
  maxHeight: 50,
  // boxSizing: 

};

export default MovieList;