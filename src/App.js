import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  // const [user, setUser] = useState(null)
  const [{user},dispatch]=useStateValue()
  // create a array
  return (
    <Router>
      <div className="App">
        {!user ? (
          <Login/>
        ) :
          (
            <div className="app_body">
              {/* Sidebar  */}
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
              </Switch>
              {/* chat */}
            </div>)
        }

      </div>
    </Router>
  );

}

export default App;
