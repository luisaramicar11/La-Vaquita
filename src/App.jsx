import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Header} from "./components/Header.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
      <Header></Header>
      </BrowserRouter>
    </>
  )
}

export default App
