import MovieDialog from '../components/MovieDialog'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions'


const mapStateToProps = (state) => {
    return {
        
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        
        onPostMovieRequest: () => dispatch(ActionTypes.postMovieRequest()),
        onPostMovieSuccess: (data) => dispatch(ActionTypes.postMovieSuccess(data)),
        onPostMovieFailure: (error) => dispatch(ActionTypes.postMovieFailure(error)),

        onUploadMovieRequest: () => dispatch(ActionTypes.uploadMovieRequest()),
        onUploadMovieSuccess: (data) => dispatch(ActionTypes.uploadMovieSuccess(data)),
        onUploadMovieFailure: (error) => dispatch(ActionTypes.uploadMovieFailure(error))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDialog);