import './App.css';
import Form from './components/Form';
import Signup from './components/Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { useState } from 'react';
import UserHome from './components/userHome';
import AdminHome from './components/adminHome';

function App() {
  const [user, setUser] = useState(null);
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Form callback={setUser}/>}></Route>
        <Route path="/Signup" element={<Signup role="user"/>} />
        <Route path="/SignupAdmin" element={<Signup role="admin"/>} />
        <Route path="/Form" element={<Form callback={setUser}/>} />
        <Route path="/userHome" element={<UserHome user={user}/>}></Route>
        <Route path="/adminHome" element={<AdminHome user={user}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
