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
    friends: 0,
    total_value:0 // Inicializado como número
  });
  const [users, setUsers] = useState([]);
  const [usersGroup, setUsersGroup] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [expenseData, setExpenseData] = useState({
    total: 0,
    description: "",
    paidBy: "",
    splitBetween: "",
    expenses: [],
  });
  //const [totalDebt, setTotalDebt] = useState(0);
  console.log(selectedUsers.length)
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

  const handleExpenseModalToggle = () => {
    setIsExpenseModalOpen(!isExpenseModalOpen);
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
    if (isModalOpen2 ) {
      fetchUsers();
    }
  }, [isModalOpen2]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users?groupId=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsersGroup(data);
        }
      } catch (error) {
        console.log("Request error", error);
      }
    };
    if (isExpenseModalOpen) {
      fetchUsers();
    }
  }, [isExpenseModalOpen, id]);

   // Obtener gastos del grupo
   useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/groups/${id}/expenses`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setExpenses(data);
        }
      } catch (error) {
        console.log("Request error", error);
      }
    };

    fetchExpenses();
  }, [id]);


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

  const handleUserSelectionForExpense = (userId) => {
    console.log(userId);
    
      if(!selectedUsers.includes(userId)){
        setSelectedUsers([...selectedUsers, userId]);
      }
  
  };

  const handleUserPaidForExpense = (userId) => {
    console.log(userId);
        setSelectedUser(userId);
      }
  
  

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveExpense = async () => {
    if (selectedUsers.length === 0) {
      console.log("No users selected.");
      return;
    }
  
    // Calcular el valor a pagar por cada usuario seleccionado
    const splitAmount = expenseData.total / selectedUsers.length;
  
    // Crear la lista de gastos para cada usuario seleccionado
    const userExpenses = selectedUsers.map((userId) => ({
      userId,
      value: splitAmount,
    }));
  
    // Construir el payload para enviar al backend
    const expensePayload = {
      total: expenseData.total,
      description: expenseData.description,
      splitBetween: userExpenses,
      userpaid: selectedUser, // Enviamos el usuario seleccionado para pagar el gasto
    };
  
    try {
      const response = await fetch(`http://localhost:3000/groups/${id}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(expensePayload),
      });
  
      if (response.ok) {
        //const newExpense = await response.json();
        //setExpenses([...expenses, newExpense]); // Agregar el gasto al arreglo de gastos
        setIsExpenseModalOpen(false); // Cerrar el modal de agregar gasto si la solicitud es exitosa
      } else {
        const errorText = await response.text();
        console.log("Error adding expense:", errorText);
      }
    } catch (error) {
      console.log("Request error", error);
    }
  };
  
  return (
    <>
      <nav className="flex justify-around items-center mt-8">
        <button
          type="button"
          className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
          onClick={handleExpenseModalToggle}
        >
          Nuevo Gasto
        </button>
        <button
          type="button"
          className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
          onClick={handleModalToggle2}
        >
          Nuevo amigo
        </button>
        <button type="button" className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2">
          {
            <ModalUpdateGroup groupData={groupData} setGroupData={setGroupData} title={title} />
          }
        </button>
      </nav>

      <div className="mt-16 flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-col md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div style={{ backgroundColor: groupData.color }} className="w-1/4">
          <img className="object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={layer} alt="vaquita" />
        </div>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-1 text-2xl font-bold tracking-tight custom-text-dark-gray">{groupData.name}</h5>
          <p className="mb-1 font-bold">Debes en total:<span className="custom-text-red font-bold px-1">{groupData.total_value}</span></p>
          <p className="mb-1 font-bold">Participantes:<span className="custom-text-red font-bold px-1">{groupData.friends}</span></p>
          <div className="flex">
            <button type="button" className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2" onClick={handleModalToggle}>
              Eliminar grupo
            </button>
          </div>
        </div>
      </div>
      <h3>GASTOS</h3>
      {expenses.map((expense) => (
    <div key={expense.id} className="mt-4 bg-white border border-gray-200 rounded-lg shadow p-4">
      <h4 className="text-lg font-semibold mb-2">{expense.description}</h4>
      <p className="text-gray-600 mb-2">Pagado por: {expense.paid_by}</p>
      <p className="text-gray-600 mb-2">Valor: ${expense.amount_paid}</p>
      <p className="text-gray-600 mb-2">Participantes: {expense.members}</p>
      <div className="flex justify-end">
        <button
          className="custom-text-white custom-background-first shadow font-medium rounded-lg text-sm px-4 py-1 text-center mr-2"
           
        >
          Ver
        </button>
        <button
          className="custom-text-white custom-background-first shadow font-medium rounded-lg text-sm px-4 py-1 text-center"
          
        >
          Eliminar
        </button>
      </div>
    </div>
  ))}

      <div id="default-modal" tabIndex="-1" aria-hidden={!isModalOpen} className={`${isModalOpen ? 'block' : 'hidden'}  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex`}>
        <div className="w-100 relative p-4 w-90 max-w-2xl max-h-full justify-center items-center flex">
          <div className="w-50 custom-border-modal relative bg-white shadow dark:bg-gray-700 ">
            <div className="p-4 md:p-5  rounded-t dark:border-gray-600">
              <button type="button" className="custom-text-first-color bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleModalToggle}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7L1 13m6-6l6-6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 pt-0 text-center">
              <h2 className="custom-text-dark-gray font-bold text-lg pb-8">Eliminar Grupo</h2>
              <p className="text-gray-500">¿Está seguro de que desea eliminar el grupo? Esta acción no se puede deshacer.</p>
              <button className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2" onClick={handleDelete}>Confirmar</button>
              <button className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2" onClick={handleModalToggle}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>

      <div id="modal-friends" tabIndex="-1" aria-hidden={!isModalOpen2} className={`${isModalOpen2 ? 'block' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex`}>
        <div className="w-100 relative p-4 w-90 max-w-2xl max-h-full justify-center items-center flex">
          <div className="w-50 custom-border-modal relative bg-white shadow dark:bg-gray-700">
            <div className="p-4 md:p-5  rounded-t dark:border-gray-600">
              <button type="button" className="custom-text-first-color bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleModalToggle2}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7L1 13m6-6l6-6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 pt-0 text-center">
              <h2 className="custom-text-dark-gray font-bold text-lg pb-8">Agregar Amigos</h2>
              <div className="text-gray-500">
                <ul>
                  {users.map((user) => (
                    <li key={user.id}>
                      <label>
                        <input type="checkbox" value={user.id} onChange={() =>  handleUserSelectionForExpense(user.id)} />
                        {user.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2" onClick={handleCreateFriend}>Guardar</button>
              <button className="custom-text-white custom-backgound-firts shadow font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2" onClick={handleModalToggle2}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>

      <div id="modal-expense" tabIndex="-1" aria-hidden={!isExpenseModalOpen} className={`${isExpenseModalOpen ? 'block' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex`}>
  <div className="w-100 relative p-4 w-90 max-w-2xl max-h-full justify-center items-center flex">
    <div className="w-50 custom-border-modal relative bg-white shadow dark:bg-gray-700">
      <div className="p-4 md:p-5  rounded-t dark:border-gray-600">
        <button type="button" className="custom-text-first-color bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleExpenseModalToggle}>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7L1 13m6-6l6-6" />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      <div className="p-6 pt-0 text-center">
        <h2 className="custom-text-dark-gray font-bold text-lg pb-8">Agregar Gasto</h2>
        <div className="text-gray-500">
          <form className="flex flex-col space-y-4 md:space-y-6 gap-1 w-full">
            <div className="w-full px-12">
                <input type="number" 
                placeholder="Monto" 
                name="total" 
                value={expenseData.total} 
                className="bg-white border border-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-black placeholder-black font-medium"
                onChange={handleExpenseChange} />
            </div>
            <div className="w-full px-12">
                <input type="text" 
                placeholder="Descripción"
                name="description" 
                value={expenseData.description} 
                className="bg-white border border-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-black placeholder-black font-medium"
                onChange={handleExpenseChange} />
            </div>
            <div className="w-full px-12">
              <h3>Participantes</h3>
              {usersGroup.map((user) => (
                <label key={user.id}>
                  <input
                    type="checkbox"
                    value={user.id}
                    onChange={() => handleUserSelectionForExpense(user.id)}
                  />
                  {user.name}
                </label>
              ))}
            </div>
            <div className="w-full px-12">
            <h3>Pagado por</h3>
            <select onChange={(e) => handleUserPaidForExpense(e.target.value)}>
             <option value="">Selecciona un usuario</option>
              {usersGroup.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
              ))}
             </select>
             </div>
            <div className="flex flex-col gap-3 w-full px-12">
            <button
              className="custom-background-first border rounded block p-2 text-white font-semibold"
              type="button"
              onClick={handleSaveExpense}
            >
              Agregar
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
