import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import MovieList from '../container/MovieList'
import MovieDialog from '../container/MovieDialog'
class Main_Page extends React.Component {
    componentWillMount() {
    }

  
    render() {
        
        return (
            <div>
                <div id="header">
                    <RaisedButton label="Default" > </RaisedButton>
                </div>
                <MovieList > </MovieList> 
                <MovieDialog> </MovieDialog>
            </div>
        );
    }
}

export default Main_Page;