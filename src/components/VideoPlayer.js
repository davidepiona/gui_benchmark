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
    const {streamId} = this.props
    const {openStream} = this.props

    return (
        <Dialog
          open= {openStream===undefined? false : openStream}
          contentStyle={{width: 320, height: 180}}
          bodyStyle={{padding: 0}}
          onRequestClose={(e) => this.closeRequest()}
          >
        <video className="video-js"
            controls= {true} preload="auto"
            style={{backgroundColor: darkBlack,  width: 320, height: 180}}
            autoPlay>
            <source src={`http://localhost:8888/stream/${streamId}.mp4`} type="video/mp4" />
          </video>
        </Dialog> 
    )
  }
}



export default VideoPlayer;