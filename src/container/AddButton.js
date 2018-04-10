import AddButton from '../components/AddButton'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions'


const mapStateToProps = (state) => {
    return {
        
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        onUploadMovieRequest: () => dispatch(ActionTypes.uploadMovieRequest()),
        onUploadMovieSuccess: (data) => dispatch(ActionTypes.uploadMovieSuccess(data)),
        onUploadMovieFailure: (error) => dispatch(ActionTypes.uploadMovieFailure(error))
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddButton);