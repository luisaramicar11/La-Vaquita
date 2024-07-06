import { useEffect, useState} from "react";
import layer from "../assets/img/layer-MC1.svg"
export function Friends(){
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/friends`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFriends(data);
        }
      } catch (error) {
        console.log("Request error", error);
      }
    };
  
    fetchData();
  }, []);

  function getRandomColor() {
    const colors = ["#A65293", "#66B04C", "#995036", "#4F80A4", "#FFFFFF", "#FFA72E", "#FEE3E2", "#FF2630"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

    return(
        <>
        {friends?.map((friend)=>(
            <div key={friend.id} className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-col md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div style={{backgroundColor:getRandomColor()}} className="w-1/4"><img className="object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={layer} alt="vaquita"/></div>
            <div className="flex flex-col justify-between p-4 leading-normal">
               <h5 className="mb-1 text-2xl font-bold tracking-tight custom-text-dark-gray">{friend.name}</h5>
            </div>
          </div>
          ))}
        </>
    )
}