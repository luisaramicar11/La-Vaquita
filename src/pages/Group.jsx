import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import layer from "../assets/img/layer-MC1.svg";
import { ModalUpdateGroup } from "../components/ModalUpdateGroup";

export function Group() {
  let title = "Editar grupo";
  const { id } = useParams();
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState({
    name: "",
    color: "",
    friends: 0, // Inicializado como número
  } );
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  console.log(groupData)
  console.log(setGroupData)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/groups/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setGroupData(data);
        }
      } catch (error) {
        console.log("Request error", error);
      }
    };

    fetchData();
  }, [id]);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalToggle2 = () => {
    setIsModalOpen2(!isModalOpen2);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.log("Request error", error);
      }
    };
    if (isModalOpen2) {
      fetchUsers();
    }
  }, [isModalOpen2]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/groups/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        navigate("/grupos");
      } else {
        const errorText = await response.text();
        console.log("Error deleting group:", errorText);
      }
    } catch (error) {
      console.log("Request error", error);
    }
  };

 /*  const handleCreateFriend = async () => {
    if (selectedUsers.length === 0) {
      console.log("No users selected.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/groups/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userIds: selectedUsers, groupId: id }),
      });
  
      if (response.ok) {
        console.log("Friends added successfully");
        setIsModalOpen2(false);
      } else {
        const errorText = await response.text();
        console.log("Error adding friends:", errorText);
      }
    } catch (error) {
      console.log("Request error", error);
    }
  }; */

  const handleCreateFriend = async () => {
    if (selectedUsers.length === 0) {
      console.log("No users selected.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/groups/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userIds: selectedUsers, groupId: id }),
      });
  
      if (response.ok) {
        const addedFriendsCount = selectedUsers.length;
        setGroupData((prevData) => ({
          ...prevData,
          friends: prevData.friends + addedFriendsCount, // Suma aritmética
        }));
        setIsModalOpen2(false);
      } else {
        const errorText = await response.text();
        console.log("Error adding friends:", errorText);
      }
    } catch (error) {
      console.log("Request error", error);
    }
  };
  
  
  const handleUserSelection = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  return (
    <>
      <nav className="flex justify-around items-center mt-8">
        <button type="button" className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2">
          Nuevo Gasto
        </button>
        <button type="button" className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2" onClick={handleModalToggle2}>
          Nuevo amigo
        </button>
        <button type="button" className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2">
          {
              <ModalUpdateGroup groupData={groupData} setGroupData={setGroupData} title={title}/>
            }
        </button>
      </nav>

      <div className="mt-16 flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-col md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div style={{ backgroundColor: groupData.color }} className="w-1/4">
          <img className="object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={layer} alt="vaquita" />
        </div>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-1 text-2xl font-bold tracking-tight custom-text-dark-gray">{groupData.name}</h5>
          <p className="mb-1 font-bold">Debes en total:<span className="custom-text-red font-bold px-1">$5000</span></p>
          <p className="mb-1 font-bold">Participantes:<span className="custom-text-red font-bold px-1">{groupData.friends}</span></p>
          <div className="flex">
            <button type="button" className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2" onClick={handleModalToggle}>
              Eliminar grupo
            </button>
          </div>
        </div>
      </div>

      <div id="default-modal" tabIndex="-1" aria-hidden={!isModalOpen} className={`${isModalOpen ? 'block' : 'hidden'}  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex`}>
        <div className="w-100 relative p-4 w-90 max-w-2xl max-h-full justify-center items-center flex">
          <div className="w-50 custom-border-modal relative bg-white shadow dark:bg-gray-700 ">
            <div className="p-4 md:p-5  rounded-t dark:border-gray-600">
              <button type="button" className="custom-text-first-color bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleModalToggle}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <h3 className="text-xl font-bold custom-text-first-color text-center">Eliminar grupo</h3>
            </div>
            <div className="p-4 md:p-5 space-y-4 text-center">
              <p className="text-base leading-relaxed custom-text-dark-gray font-semibold">¿Está seguro de que desea borrar el grupo? Toda la información se perderá</p>
            </div>
            <div className="flex items-center gap-4 justify-center p-4 md:p-5  border-gray-200 rounded-b dark:border-gray-600">
              <button type="button" className="text-white custom-background-first hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={handleDelete}>Eliminar</button>
              <button type="button" className="text-white custom-background-first hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={handleModalToggle}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>

      <div id="default-modal" tabIndex="-1" aria-hidden={!isModalOpen2} className={`${isModalOpen2 ? 'block' : 'hidden'}  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex`}>
        <div className="w-100 relative p-4 w-90 max-w-2xl max-h-full justify-center items-center flex">
          <div className="w-50 custom-border-modal relative bg-white shadow dark:bg-gray-700 ">
            <div className="p-4 md:p-5  rounded-t dark:border-gray-600">
              <button type="button" className="custom-text-first-color bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleModalToggle2}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <h3 className="text-xl font-bold custom-text-first-color text-center">{groupData.name}</h3>
            </div>
            <div className="p-4 md:p-5 space-y-4 text-center">
              <p className="text-base leading-relaxed custom-text-dark-gray font-semibold">Elige al menos a un amigo para continuar.</p>
            </div>
            <div className="flex items-center gap-4 justify-center p-4 md:p-5  border-gray-200 rounded-b dark:border-gray-600">
              <button type="button" className="text-white custom-background-first hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Agregar</button>
            </div>
          </div>
        </div>
      </div>

     {/* Modal para nuevo amigo */}
     <div
        id="default-modal2"
        tabIndex="-1"
        aria-hidden={!isModalOpen2}
        className={`${isModalOpen2 ? "block" : "hidden"}  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex`}
      >
        <div className="w-100 relative p-4 w-90 max-w-2xl max-h-full justify-center items-center flex">
          <div className="w-50 custom-border-modal relative bg-white shadow dark:bg-gray-700">
            <div className="p-4 md:p-5  rounded-t dark:border-gray-600">
              <button
                type="button"
                className="custom-text-first-color bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleModalToggle2}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <h3 className="text-xl font-bold custom-text-first-color text-center">{groupData.name}</h3>
            </div>
            <div className="p-4 md:p-5 space-y-4 text-center overflow-y-auto max-h-[400px]">
              <p className="text-base leading-relaxed custom-text-dark-gray font-semibold">
                Elige al menos a un amigo para continuar.
              </p>
              <div className="overflow-y-auto max-h-[100px]">
                {users.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {users.map((user) => (
                      <li key={user.id} className="flex items-center">
                        <input
                        type="checkbox"
                        id={`user-${user.id}`}
                        className="form-checkbox h-5 w-5 text-blue-600"
                        onChange={() => handleUserSelection(user.id)}
                        checked={selectedUsers.includes(user.id)}
                      />
                      <label htmlFor={`user-${user.id}`} className="ml-2">{user.email}</label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm">Cargando usuarios...</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center p-4 md:p-5  border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="text-white custom-background-first hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={handleCreateFriend}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="custom-text-yellow text-lg p-4 font-bold border-b-2 border-custom-text-gray">GASTOS</h2>
    </>
  );
}
