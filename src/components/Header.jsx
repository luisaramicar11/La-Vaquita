import { useState, useEffect } from 'react';
import {MenuMobile} from "./MenuMobile"
import {MenuDesktop} from "./MenuDesktop"

export function Header(){
    const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)'); // Define la media query para dispositivos móviles
    setIsMobile(mobileMediaQuery.matches); // Establece el estado inicial basado en si coincide con la media query o no

    const handleResize = () => {
      setIsMobile(mobileMediaQuery.matches); // Actualiza el estado cuando cambia el tamaño de la ventana
    };

    mobileMediaQuery.addEventListener('change', handleResize); // Agrega un listener para manejar los cambios de tamaño de la ventana

    return () => {
      mobileMediaQuery.removeEventListener('change', handleResize); // Remueve el listener cuando el componente se desmonta
    };
  }, []);

  return(
    <>
    {isMobile?(<MenuMobile/>):(<MenuDesktop/>)}
    </>
  )
  }

