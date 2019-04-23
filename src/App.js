import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

import CrimeScreen from './Screens/CrimeScreen';
import StationsScreen from './Screens/StationsScreen';
import StatsScreen from './Screens/StatsScreen';
import NoMatch from './Components/NoMatch/NoMatchComponent';
import FooterComponent from './Components/Footer/FooterComponent';

// * App.js shows all the routes on the page

// * Redirect the startpage / to /brott/
const redirectStartPageToCrimes = () => {
  return <Redirect from="/" to="/brott/" />
}

function App() {
  return (
    <div className="App">

      <FooterComponent />

      <Router>
        <Switch>
          <Route path="/" exact component={redirectStartPageToCrimes}/>
          <Route path="/brott/" component={CrimeScreen} />
          <Route path="/polisstationer/" component={StationsScreen} />
          <Route path="/statistik/" component={StatsScreen} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
