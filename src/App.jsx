import './App.css';
import { Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {Header} from "./components/Header.jsx"
import {Footer} from "./components/Footer.jsx"
import {Groups} from "./pages/Groups.jsx"
import {Friends} from "./pages/Friends.jsx"
import { Group } from './pages/Group.jsx';
import {LoginPage} from './pages/AuthPage.jsx';
import {Registration} from './pages/RegistrationPage.jsx';


function App() {

  const location = useLocation();

  return (
    <>
    {location.pathname !== "/auth/login" && <Header />}
    <Routes>
      <Route path="/amigos" element={<Friends />} />
      <Route path="/gastos" element="" />
      <Route path="/grupos" element={<Groups />} />
      <Route path="/" element={<Navigate to="/auth/login" />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/grupos/:id" element={<Group />} />
    </Routes>
    {location.pathname !== "/auth/login" && <Footer />}
  </>
  )
}

export default App
