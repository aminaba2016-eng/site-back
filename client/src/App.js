import {useEffect} from "react"
import {useDispatch} from "react-redux"
import Signup from "./Components/Signup/Signup";
import {Switch, Route} from "react-router-dom";
import Dashbord from "./Components/Dashbord/Dashbord";
import PrivateRoute from "./Components/router/PrivateRoute"
import './App.css';
import { current } from "./JS/actions/user"

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(current())
  })
  return (
    <div className="App">
      
      <header className="App-header">
      <Switch>
        <Route exact path= '/' component={Signup}/>
        <PrivateRoute path= "/dashbord" component={Dashbord}/>

      </Switch>
      </header>
    </div>
  );
}

export default App;
