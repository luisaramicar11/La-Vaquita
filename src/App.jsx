import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {Header} from "./components/Header.jsx"
import {Footer} from "./components/Footer.jsx"
import {Groups} from "./pages/Groups.jsx"
import {Friends} from "./pages/Friends.jsx"
import {ModalNewGroup} from "./components/ModalNewGroup.jsx"
import { Group } from './pages/Group.jsx';

function App() {
  return (
    <>
         
     <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/amigos" element={<Friends/>} />
          <Route path="/gastos" element="" />
          <Route path="/grupos" element={<Groups/>} />
          <Route
            path="/grupos/:id"
            element={<Group/>}
          ></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>  
  
    </>
  )
}

export default App
