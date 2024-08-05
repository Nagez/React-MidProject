import { useEffect, useState } from "react"
import User from "./User";
import { getAll } from "./utils"

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

export default function Users({completedUserIds, callback, isAddUserCallback, newUserData}) {

    const [input, setInput] = useState('');
    const [userList, setUserList] = useState([]);
    const [currentUserId, setCurrentUserId]= useState('');

    const filteredUserList = userList.filter((user) =>
        user?.name?.toLowerCase().includes(input.toLowerCase()) ||
        user?.email?.toLowerCase().includes(input.toLowerCase())
    );

    useEffect(() => {
        async function fetchData() {
            let { data } = await getAll(USERS_URL);
            setUserList(data)
        }
        fetchData();

    }, [])

    useEffect(() => {
        if (newUserData) {
            const newUser = {
                ...newUserData,
                isNew: true,
                id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            };
            setUserList(prevList => [...prevList, newUser]);
            //alert(`Added user ${newUserData?.name}`)
        }
    }, [newUserData]);

    const handleChange = ({ target }) => {
        setInput(target.value)
    }

    const getDataFromChild = (childValue) => {
        setCurrentUserId(childValue)
        callback(childValue);
      };

    const deleteUserCallback = (id) =>{
        setUserList(prevList => prevList.filter((user) => user.id !== id));
    }  

    const updateUserCallback =(updatedUser) =>{
        //console.log(updatedUser)
        setUserList(prevList =>
            prevList.map(user =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
        alert('User updated!')  
    }

    const handleAdd = () =>{
        isAddUserCallback(true)
    }
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Search <input onChange={handleChange}></input>
                <button value="Add" onClick={handleAdd}>Add</button>
            </div>
            <div>
                {
                    filteredUserList.map((user) => {
                        return <User key={user.id} user={user} currentUserId={currentUserId} isCompleted={completedUserIds[user.id]} idParentCallback={getDataFromChild} deleteUserCallback={deleteUserCallback} updateUserCallback={updateUserCallback} />
                    })
                }
            </div>
        </>
    )
}