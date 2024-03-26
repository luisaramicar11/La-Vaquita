import './App.css';

import {Header} from "./components/Header.jsx"
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <>
  {/* <BrowserRouter>
 <img src={logo} alt="layer" />
 <img src={logoDecoraction} alt="" />
 <img src={layer} alt="" />

    <Menu/>
  </BrowserRouter> */}
{/* <SmallLogo></SmallLogo>
<BigLogo></BigLogo> */}
<BrowserRouter>
<Header></Header>
</BrowserRouter>

    
    </>
  )
}

export default App
