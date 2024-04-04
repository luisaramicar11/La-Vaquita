import {useState} from "react";
import {useNavigate} from "react-router-dom"

export function ModalNewGroup({groups, setGroups, totalRegistros}){
  
  const [group, setGroup]=useState("");
  const [color, setColor]=useState("#A65293");
  const [validationError, setValidationError]=useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    // Navegar a una ruta específica cuando se hace clic en algún elemento
    navigate(`/grupos/${totalRegistros}`);
  };
  
  const handleGroup=(e)=>{
    setGroup(e.target.value)
    console.log(group)
  }

  const handleCloseModal=()=>{
   setShowModal(false);
   setValidationError("")
  }

   const handleColor=(color)=>{
    setColor(color);
    console.log(color)
  }

  const validationsForm=()=>{
    console.log("funciones validacion")
    if(!group.trim()){
      setValidationError("Elige un nombre para continuar")
    }
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    validationsForm();
    try{
        const response = await fetch("http://localhost:3000/groups",{
        method:"POST",
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify({id:totalRegistros, name:group, color:color})
      });
      

      const newGroup=await response.json();
      setGroups([...groups, newGroup]);
      console.log(newGroup);
      console.log(groups); 
    }catch(err){
      console.log("error", err)
    }
  }
  return (
    <>
      <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block custom-backgound-firts custom-text-white font-medium rounded-md h-8 w-32" 
      type="button"
        onClick={() => setShowModal(true)}
      >
        Nuevo Grupo
      </button>
      {showModal ? (
        <>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
    <div className="relative p-4 w-full max-w-md max-h-full">

        <div className="relative bg-white rounded-lg shadow">
        <div className="flex items-center justify-end p-1 md:p-5 rounded-t">
           <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={handleCloseModal}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                </div>
            <div className="flex items-center justify-center p-1 md:p-5 rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                    Nuevo grupo
                </h3>
            </div>
           
            <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <input type="text" name="grupo" id="grupo" placeholder="Nombre del grupo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={handleGroup}  />
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-4 ">

                        
  <button type="button" style={{backgroundColor:"#A65293"}} onClick={()=>handleColor("#A65293")} className="w-full h-12 rounded-md"></button>
  <button type="button" style={{backgroundColor:"#66B04C"}} onClick={()=>handleColor("#66B04C")} className="w-full h-12 rounded-md"></button>
  <button type="button" style={{backgroundColor:"#995036"}} onClick={()=>handleColor("#995036")} className="w-full h-12 rounded-md"></button>
  <button type="button" style={{backgroundColor:"#4F80A4"}} onClick={()=>handleColor("#4F80A4")} className="w-full h-12 rounded-md"></button>
  <button type="button" style={{backgroundColor:"#FFFFFF"}} onClick={()=>handleColor("#FFFFFF")} className="w-full h-12 rounded-md"></button>
  <button type="button" style={{backgroundColor:"#FFA72E"}} onClick={()=>handleColor("#FFA72E")} className="w-full h-12 rounded-md"></button>
  <button type="button" style={{backgroundColor:"#FEE3E2"}} onClick={()=>handleColor("#FEE3E2")} className="w-full h-12 rounded-md"></button>
  <button type="button" style={{backgroundColor:"#FF2630"}} onClick={()=>handleColor("#FF2630")} className="w-full h-12 rounded-md"></button>

                        </div>
                       
                    <button type="submit" className="w-full  custom-backgound-firts custom-text-white focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-5 py-2.5 text-center"  onClick={handleClick}>Crear</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                         
                    </div>
                    <div className="custom-error-color text-sm font-bold">{validationError}</div>
                </form>
                
            </div>
            
        </div>
        
    </div>
    
</div> 
        </>
      ) : null}
    </>
  );
}

                    