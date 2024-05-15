//import { useParams } from "react-router-dom";
import layer from "../assets/img/layer-MC1.svg"
import {Link} from "react-router-dom"

export function GroupCard({data}){

    const messageDeleteGroup=(group)=>{
      let message=`¿Estas seguro que deseas eliminar el grupo "${group.name}"?`
      if(confirm(message)==true){
        handleDelete(group)
      }
    }
    
    const handleDelete=(group)=>{
      if(!group.id) return;
        fetch(`http://localhost:3000/groups/${group.id}`,{
        method:"DELETE",
        headers:{
          'Content-type':'application/json'
        }
      }).then((response)=>{
        if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      response.json()
      window.location.reload();
    })
      .catch((err)=>{
        console.log('Error al eliminar el grupo:', err)
      });
    };

    return(
        <>
          {data.map((group)=>(
            <div key={group.id} className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-col md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div style={{backgroundColor:group.color}} className="w-1/4"><img className="object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={layer} alt="vaquita"/></div>
            <div className="flex flex-col justify-between p-4 leading-normal">
               <h5 className="mb-1 text-2xl font-bold tracking-tight custom-text-dark-gray">{group.name}</h5>
               <p className="mb-1 font-bold">Debes: <span className="custom-text-red font-bold">$35000</span></p>
               <div className="flex">
                <button type="button" className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 "><Link to={`/grupos/${group.id}`}>Ver</Link></button>
                <button type="button" className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 " onClick={()=>messageDeleteGroup(group)}>Eliminar</button>
               </div>
            </div>
          </div>
          ))}
          
        </>

    )
}