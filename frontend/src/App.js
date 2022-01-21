import './App.css'
import Homepage from "./components/homepage/homepage"
import Login from "./components/login/login"
import Register from "./components/register/register"
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import {useState }from 'react'

function App() {

  const [ user, setLoginUser] = useState({})
  return (
    <div className="App">
      <Router>
        <Routes >
          <Route exact path="/" element={
              user && user._id ? <Homepage setLoginUser={user} /> : <Login setLoginUser={setLoginUser}/>
            }>
            
          </Route>
          <Route path='/Login' element={<Login setLoginUser={setLoginUser} />} />

          <Route path="/register" element={<Register />} /> 
     
        </Routes >
      </Router>
    </div>
  );
}

export default App;