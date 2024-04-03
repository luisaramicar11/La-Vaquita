import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import layer from "../assets/img/layer-MC1.svg"
export function Group(){
    const { id } = useParams();
    const [groupData, setGroupData] = useState("");

    useEffect(()=>{
      const groupData=fetch(`http://localhost:3000/groups/${id}`)
      groupData.then(
        (res)=>res.json()
        .then(data=>{
          console.log("response", res);
          console.log("data", data);
          setGroupData(data)
        }),
        (err)=>{
          console.log("request error", err);
        }
      )
    }, [])


return(   
        <>
        <nav className="flex justify-around items-center mt-8">
        <button type="button" className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ">Nuevo Gasto</button>
        <button type="button" className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ">Nuevo amigo</button>
        <button type="button" className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ">Editar grupo</button>
        </nav>

        <div className=" mt-16 flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-col md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div style={{backgroundColor:groupData.color}} className="w-1/4"><img className="object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={layer} alt="vaquita"/></div>
            <div className="flex flex-col justify-between p-4 leading-normal">
               <h5 className="mb-1 text-2xl font-bold tracking-tight custom-text-dark-gray">{groupData.name}</h5>
              <p className="mb-1 font-bold">Debes en total: <span className="custom-text-red font-bold"></span></p>
               <div className="flex">
                <button type="button" className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ">Salir del grupo</button>
               </div>
            </div>
        </div>

        <h2 className="custom-text-yellow text-lg p-4 font-bold border-b-2 border-custom-text-gray">GASTOS</h2>


        
        </>
    )
}