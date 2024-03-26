import logoWhc from "../assets/img/logo-whc.png"
export function Footer(){
    return(
        <>
        <footer className="flex justify-center mt-4 shadow-md p-2 h-16 w-full">
          <img className="object-cover" src={logoWhc} alt="Logo Whomen-who-code" />
        </footer>
        </>
    )
}