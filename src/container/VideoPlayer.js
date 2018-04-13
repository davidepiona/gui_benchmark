import VideoPlayer from '../components/VideoPlayer'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions'


const mapStateToProps = (state) => {
    return {
        streamId: state.movies.streamId,
        openStream: state.movies.openStream
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseStream: () => dispatch(ActionTypes.closeStream())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);