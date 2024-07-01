import {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import "./ModalNewGroup.css";


export function ModalUpdateGroup({groupData, setGroupData, title}){
  title = title || "Nuevo grupo";
  const navigate = useNavigate();
  console.log(groupData.name)
  const [group, setGroup]=useState(groupData.name);
  const [color, setColor]=useState(groupData.color);
  const [validationError, setValidationError]=useState("");
  const [showModal, setShowModal] = useState(false);


  const { id } = useParams();
  console.log(id)
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
      setValidationError("Elige un nombre para continuar");
      return false;
    }else if(group.length>30){
      setValidationError("La extensión del nombre debe ser menor o igual a 30 carácteres");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validationsForm()) return;
  
    try {
      const response = await fetch(`http://localhost:3000/groups/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: group, color: color, owneruserid: localStorage.getItem("id") }),
      });
  
      if (response.ok) {
        const updatedGroup = await response.json();
        setGroupData(updatedGroup);
        setShowModal(false); // Cerrar el modal
        navigate("/grupos")
      } else {
        const errorText = await response.text();
        console.log("Error:", errorText);
        setValidationError("Error al actualizar el grupo.");
      }
    } catch (err) {
      console.log("Error:", err);
      setValidationError("Error de conexión.");
      setShowModal(false); // Cerrar el modal
      navigate(`/grupos`)
    }
  };
  
  return (
    <>
      <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block custom-backgound-firts custom-text-white font-medium rounded-md h-8 w-32" 
      type="button"
        onClick={() => setShowModal(true)}
      >
        {title}
      </button>
      {showModal ? (
        <>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
    <div className="relative p-4 w-full max-w-md max-h-full">

        <div className="relative bg-white rounded-lg shadow">
        <div className="flex items-center justify-end p-0 md:p-5 rounded-t">
           <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={handleCloseModal}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                </div>
            <div className="flex items-center justify-center p-1 md:p-5 rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                    Editar grupo
                </h3>
            </div>
           
            <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <i className="fa fa-users" aria-hidden="true"></i>
                        <input type="text" name="grupo" id="grupo"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={handleGroup} value={group}/>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-4 ">

                        
  <button type="button" style={{backgroundColor:"#A65293"}} onClick={()=>handleColor("#A65293")} className="w-full h-12 rounded-md"></button>
  <button type="button" style={{backgroundColor:"#66B04C"}} onClick={()=>handleColor("#66B04C")} className="w-full h-12 rounded-md"></button>
  <button type="button" style={{backgroundColor:"#995036"}} onClick={()=>handleColor("#995036")} className="w-full h-12 rounded-md"></button>
  <button type="button" style={{backgroundColor:"#4F80A4"}} onClick={()=>handleColor("#4F80A4")} className="w-full h-12 rounded-md"></button>
  <button type="button" style={{backgroundColor:"#FFFFFF"}} onClick={()=>handleColor("#FFFFFF")} className="w-full h-12 rounded-md border border-solid border-black"></button>
  <button type="button" style={{backgroundColor:"#FFA72E"}} onClick={()=>handleColor("#FFA72E")} className="w-full h-12 rounded-md"></button>
  <button type="button" style={{backgroundColor:"#FEE3E2"}} onClick={()=>handleColor("#FEE3E2")} className="w-full h-12 rounded-md"></button>
  <button type="button" style={{backgroundColor:"#FF2630"}} onClick={()=>handleColor("#FF2630")} className="w-full h-12 rounded-md"></button>

                        </div>
                       
                    <button type="submit" className="w-full  custom-backgound-firts custom-text-white focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-5 py-2.5 text-center">Editar grupo</button>
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

                    