import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Login from '../src/components/Login'
import Home from '../src/components/Home'

function App () {
  const NoMatchPage = () => {
    return (
      <h3>404 - Not found</h3>
    )
  }

  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/" component={Login} />
        <Route component={NoMatchPage} />
      </Switch>
    </div>
  </Router>
  )
}

export default App
