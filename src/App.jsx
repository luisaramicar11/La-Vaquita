import './App.css';
import { Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {Header} from "./components/Header.jsx"
import {Footer} from "./components/Footer.jsx"
import {Groups} from "./pages/Groups.jsx"
import {Friends} from "./pages/Friends.jsx"
import { Group } from './pages/Group.jsx';
import {LoginPage} from './pages/AuthPage.jsx';
import {Registration} from './pages/RegistrationPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';


function App() {

  const location = useLocation();

  return (
    <>
    {!["/auth/login", "/registration"].includes(location.pathname) && <Header />}

<Routes>
  <Route path="/amigos"  element={<PrivateRoute element={<Friends />} />} />
  <Route path="/gastos" element={<PrivateRoute element={<div>Gastos Page</div>} />}/>
  <Route path="/grupos" element={<PrivateRoute element={<Groups />} />} />
  <Route path="/" element={<Navigate to="/auth/login" />} />
  <Route path="/auth/login" element={<LoginPage />} />
  <Route path="/registration" element={<Registration />} />
  <Route path="/grupos/:id" element={<PrivateRoute element={<Group />} />} />
</Routes>

{!["/auth/login", "/registration"].includes(location.pathname) && <Footer />}
   
  </>
  )
}

export default App
