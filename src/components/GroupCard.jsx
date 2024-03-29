import layer from "../assets/img/layer-MC1.svg"

export function GroupCard({data}){
  
    return(
        <>
          {data.map((group)=>(
            <div key={group.name} className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-col md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="w-1/4"><img className="object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={layer} alt="vaquita"/></div>
            <div className="flex flex-col justify-between p-4 leading-normal">
               <h5 className="mb-1 text-2xl font-bold tracking-tight custom-text-dark-gray">{group.name}</h5>
               <p className="mb-1 font-bold">Debes: <span className="custom-text-red font-bold">{group.state.owe}</span></p>
               <div className="flex">
                <button type="button" className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ">Editar</button>
                <button type="button" className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ">Eliminar</button>
               </div>
            </div>
          </div>
          ))}
          
        </>

    )
}