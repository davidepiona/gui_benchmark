import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { getMovies} from '../Api'
import TextField from 'material-ui/TextField';


class AppBarIcon extends React.Component {
  

  refresh() {
    this.props.onGetMoviesRequest();
      getMovies()
        .then(
          movie => {
            this.props.onGetMoviesSuccess(movie)
          },
          error => this.props.onGetMoviesFailure(error)
        )
  }

  onSearchChange(e) {
    this.props.onSearchChange(e.target.value);
  }


  render(){
  
    return (
      <AppBar
      title={
      <div>
        <span style={styles.title}>Movie - Benchmark </span>
        <img alt= 'megnifier' style={{heigth: '24px', width: '24px', marginLeft:'150px', marginRight:'5px'}} src='/magnifier.svg'></img>
        <TextField hintText='Search movies' onChange={ (e) => this.onSearchChange(e)}/>
      </div>
      
      }

      iconElementRight={<FlatButton label="Refresh"/>}
      onRightIconButtonClick={(e) => this.refresh()}
      style={{position: 'fixed'}}
      showMenuIconButton={true}>
      
      </AppBar>
    );
  }
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};


export default AppBarIcon;