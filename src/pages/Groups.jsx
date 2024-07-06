
import { useState, useEffect  } from "react"
import { GroupCard } from "../components/GroupCard"
import { ModalNewGroup } from "../components/ModalNewGroup"
export function Groups(){
    let totalUserValue=0;
    let title;
    const id = localStorage.getItem("id");
    const [groups, setGroups] = useState([])
    console.log(groups)
    useEffect(()=>{
        fetch(`http://localhost:3000/groups`,{
          method:"GET",
          headers:{
            "Content-Type": "application/json",
            'Authorization':`Bearer ${localStorage.getItem("token")}`,
          }
        }).then( (res)=>res.json()
          .then(data=>{
            //console.log("response", res);
            console.log("data", data);
            setGroups(data)
            /* let total = 0;
            data.forEach(el=> {
              total += el.total_value 
            });
            totalUserValue = total; */
          }),
          (err)=>{
            console.log("request error", err);
          }
        )
      }, [id])

      groups.forEach(el=> {
        totalUserValue += parseInt(el.total_value ? el.total_value : 0) }); 
      //console.log(totalRegistros);
    return(
        <section className="p-6">
        <div className="flex justify-end"> 
            {
              <ModalNewGroup groups={groups} setGroups={setGroups} title={title}></ModalNewGroup>
            }
        </div>
        <div className="pb-8">
            <h2 className="font-bold">Debes</h2>
            <p className="custom-text-red font-bold text-2xl">{totalUserValue}{/* {groups.reduce(function(total, current){return total + current.state.owe;},0)} */}</p>
        </div>
        <div className="grid grid-cols-1 gap-3">
        {
          <GroupCard data={groups} />
        }
        </div>
        </section>

    )
}

