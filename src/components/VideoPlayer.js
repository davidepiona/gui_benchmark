import React from 'react'
import Dialog from 'material-ui/Dialog';
import { darkBlack } from 'material-ui/styles/colors';

class VideoPlayer extends React.Component {

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  closeRequest() {
    this.props.onCloseStream();
  }

  render() {
    const {streamMovie} = this.props
    const {openStream} = this.props

    return (
        <Dialog
          open= {openStream===undefined? false : openStream}
          contentStyle={{width: streamMovie.width, height: streamMovie.height, maxWidth: 1920, maxHeight: 1080}}
          bodyStyle={{padding: 0}}
          onRequestClose={(e) => this.closeRequest()}
          >
        <video className="video-js"
            controls= {true} preload="auto"
            style={{backgroundColor: darkBlack,  width: streamMovie.width, height: streamMovie.height, maxWidth: 1920, maxHeight: 1080}}
            autoPlay>
            <source src={`/stream/${streamMovie.movieId}.mp4`} type="video/mp4" />
          </video>
        </Dialog> 
    )
  }
}



export default VideoPlayer;