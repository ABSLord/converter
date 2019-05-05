import React, {Component} from 'react';
import Header from './components/Header'
import NavTabs from './components/NavTabs';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <div className="container">
          <NavTabs/>
        </div>
      </div>
    );
  }
}

export default App;
