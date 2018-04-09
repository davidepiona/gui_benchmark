import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main_Page from './components/Main_Page';
import './Root.css';
import createStore from './store';
import DevTools from './DevTools';
import { Provider } from 'react-redux';
// class Root extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
const Root = () => (
  <Provider store={ createStore() }>
  
    <BrowserRouter> 
    <React.Fragment>
        <DevTools/>
        <Route path="/" component={ Main_Page } />
      </React.Fragment>
    </BrowserRouter>
  </Provider>
);

export default Root;
