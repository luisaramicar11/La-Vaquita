import { useState, useEffect } from "react"
import { GroupCard } from "../components/GroupCard"
export function Groups(){
    const [groups, setGroups] = useState([])

    useEffect(()=>{
        const groups=fetch("http://localhost:3000/groups")
        groups.then(
          (res)=>res.json()
          .then(data=>{
            console.log("response", res);
            console.log("data", data);
            setGroups(data)
          }),
          (err)=>{
            console.log("request error", err);
          }
        )
      }, [])
    return(
        <section className="p-6">
        <div className="flex justify-end">
            <button className="custom-backgound-firts custom-text-white font-medium rounded-md h-8 w-32">
                Nuevo Grupo
            </button>
        </div>
        <div className="pb-8">
            <h2 className="font-bold">Debes</h2>
            <p className="custom-text-red font-bold text-2xl">${groups.reduce(function(total, current){return total + current.state.owe;},0)}</p>
        </div>
        <div className="grid grid-cols-1 gap-3">
        {
          <GroupCard data={groups}/>
        }
        </div>
        </section>

    )
}
