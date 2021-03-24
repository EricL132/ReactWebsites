import React from 'react'
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Room from './Room'
import Home from './firstpage'
class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/room' exact component={Room}></Route>
            <Route path='*' exact component={Home}></Route>
          </Switch>
        </BrowserRouter>
      </>
    )
  }

}

export default App;
