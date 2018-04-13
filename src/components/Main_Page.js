import React from 'react'
import MovieList from '../container/MovieList'
import MovieDialog from '../container/MovieDialog'
import AppBarIcon from '../container/AppBarIcon';
class Main_Page extends React.Component {
    componentWillMount() {
    }

  
    render() {
        
        return (
            <div>
                <AppBarIcon> </AppBarIcon>
                <MovieList > </MovieList> 
                <MovieDialog> </MovieDialog>
            </div>
        );
    }
}

export default Main_Page;