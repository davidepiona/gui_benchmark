import EditDialog from '../components/EditDialog'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions'


const mapStateToProps = (state) => {
    return {
        editId: state.movies.editId,
        openEdit: state.movies.openEdit,
        editMovie: state.movies.editMovie
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        onEditMovieEnd: () => dispatch(ActionTypes.editMovieEnd()),
        onEditMovieFailure: (error) => dispatch(ActionTypes.editMovieFailure(error)),

        onGetMoviesRequest: () => dispatch(ActionTypes.getMoviesRequest()),
        onGetMoviesSuccess: (data) => dispatch(ActionTypes.getMoviesSuccess(data)),
        onGetMoviesFailure: (error) => dispatch(ActionTypes.getMoviesFailure(error)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog);