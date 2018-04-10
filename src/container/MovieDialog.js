import MovieDialog from '../components/MovieDialog'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions'


const mapStateToProps = (state) => {
    return {
        open: state.movies.open
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        
        onPostMovieRequest: () => dispatch(ActionTypes.postMovieRequest()),
        onPostMovieSuccess: (data) => dispatch(ActionTypes.postMovieSuccess(data)),
        onPostMovieFailure: (error) => dispatch(ActionTypes.postMovieFailure(error))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDialog);