import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { darkBlack } from 'material-ui/styles/colors';

import moment from 'moment'
import {editMovie} from '../Api'



/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class EditDialog extends React.Component {

  componentWillMount() {
    console.log(this.props.editMovie)
    const date = new Date();
    this.setState({title:"", director:"", releaseDate:date, language:"", duration:"", open:false});
  }

  inputValueChanged (value, e) {
    this.setState({[value]: e.target.value})
  }

  dateChange(event, x) {
    var date = event.toJSON().slice(0,10)
    this.setState({
      releaseDate: date
    });
  }

  closeRequestEdit() {
    this.props.onEditMovieEnd();
  }

  closeRequestSubmit() {
    this.setState({open: false});
  }

  closeDialog=() =>{
    movieInfo.id=this.props.editMovie.movieId 
    movieInfo.title=this.state.title
    movieInfo.director=this.state.director
    movieInfo.releaseDate=this.state.releaseDate
    movieInfo.language=this.state.language
    movieInfo.duration=this.state.duration
    movieInfo.pending=this.props.editMovie.pending
    // console.log(movieInfo)
    editMovie(movieInfo)
        .then(
            data => {
                this.props.onEditMovieEnd()
            },
            error => this.props.onEditMovieFailure(error)
        )
    this.setState({open: false})
    this.setState({open2: true})
  }

  updateState() {
    const {editMovie} = this.props
    this.setState({title:editMovie.title, director:editMovie.director, 
      releaseDate:editMovie.releaseDate, language:editMovie.language, 
      duration:editMovie.duration, open: true})
  }

  render() {
    const{openEdit} = this.props
    return (
      <div>
        <Dialog
          title="Do you want to edit the movie?"
          open={openEdit} 
          onRequestClose={(e) => this.closeRequestEdit()}
          actions= {
            <FloatingActionButton
            label="Edit"
            disabled={false}
            onClick={(e) => this.updateState()}>
            <ContentAdd />
          </FloatingActionButton> 
          }>
        </Dialog>
       
        <Dialog
          title="Movie-Edit"
          open={this.state.open}
          onRequestClose={(e) => this.closeRequestSubmit()}
          actions= {
            <FloatingActionButton
            label="Submit"
            disabled={false}
            onClick={(e) => this.closeDialog()}>
            <ContentAdd />
            </FloatingActionButton>
          }>
          <input placeholder={this.state.title} value={this.state.title} onChange={ (e) => this.inputValueChanged("title",e) }/>
          <input placeholder="Director" value={this.state.director} onChange={ (e) => this.inputValueChanged("director",e) } />
          <input placeholder="Language" value={this.state.language} onChange={ (e) => this.inputValueChanged("language", e) } />
          <input placeholder="Duration" value={this.state.duration} onChange={ (e) => this.inputValueChanged("duration", e) } />       
          <DatePicker id="datePicker" defaultDate={new Date(this.state.releaseDate)} openToYearSelection={true} onChange={(x, event) =>this.dateChange(event)}/>
          
        </Dialog>
      </div>
    );
  }
}


const style = {
  marginLeft: 200,
  marginRight: 24,

};

const movieInfo = {
  "id":"",
	"title": "",
	"director": "",
	"releaseDate": "",
	"language": "",
  "duration": "",
  "pending": true
}