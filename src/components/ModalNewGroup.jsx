import {useState} from "react"
export function ModalNewGroup(){
  const [showModal, setShowModal] = useState(false);
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
           <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={() => setShowModal(false)}>
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
                <form className="space-y-4" action="#">
                    <div>
                        <input type="text" name="grupo" id="grupo" placeholder="Nombre del grupo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div className="grid grid-cols-4 grid-rows-2 ">
                        
                        
  <label htmlFor="color-input-purple" className="bg-#A65293"></label>
  <label htmlFor="color-input-green" className="bg-#66B04C"></label>
  <label htmlFor="color-input-brown" className="bg-#995036"></label>
  <label htmlFor="color-input-blue" className="bg-#4F80A4"></label>
  <label htmlFor="color-input-white" className="bg-#FFFFFF"></label>
  <label htmlFor="color-input-orange" className="bg-#FFA72E"></label>
  <label htmlFor="color-input-pink" className="col-span-1 row-span-1 bg-#FEE3E2"></label>
  <label htmlFor="color-input-red" className="col-span-full row-span-1 bg-#FF2630"></label>


<input type="color" id="color-input-purple" value="#A65293"/>
<input type="color" id="color-input-green" value="#66B04C"/>
<input type="color" id="color-input-brown" value="#995036"/>
<input type="color" id="color-input-blue" value="#4F80A4"/>
<input type="color" id="color-input-white" value="#FFFFFF"/>
<input type="color" id="color-input-orange" value="#FFA72E"/>
<input type="color" id="color-input-pink" value="#FEE3E2"/>
<input type="color" id="color-input-red" value="#FF2630"/>
                        </div>
                       
                    <button type="submit" className="w-full  custom-backgound-firts custom-text-white focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-5 py-2.5 text-center">Crear</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                         
                    </div>
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

                    