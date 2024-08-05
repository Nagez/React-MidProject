import { useState } from "react";
import Posts from "./Posts";
import Todos from "./Todos";
import Users from "./Users";
import AddUser from "./addUser";


export default function MainPage() {

    const [userId, setUserId] = useState('');
    const [completedUserIds, setCompletedUserIds] = useState([]);
    const [isAddUser, setIsAddUser] = useState(false);
    const [newUserData, setNewUserData] = useState({});

    const getDataFromUserChild = (childValue) => {
        setUserId(childValue);
    };

    const getDataFromTodoChild = (childValue) => {
        setCompletedUserIds(childValue);
    };

    const isAddUserCallback = (childValue) => {
        setIsAddUser(childValue);
    };

    const cancleAddUserCallback = (childValue) => {
        setIsAddUser(childValue)
    }

    const addUserCallback = (newUserData) => {
        setIsAddUser(false)
        setNewUserData(newUserData)

    }
    return (
        <div style={{ display: 'flex', padding: '20px', alignItems: 'flex-start' }}>

            <div style={{ border: "1px black solid", borderRadius: "50px", minWidth: "320px", minHeight: "500px", padding: '10px', margin: '20px', float: "left" }}>

                <Users completedUserIds={completedUserIds} callback={getDataFromUserChild} isAddUserCallback={isAddUserCallback} newUserData={newUserData}/>
            </div>

            {isAddUser ? (
                <AddUser cancleAddUserCallback={cancleAddUserCallback} addUserCallback={addUserCallback} />
            ) :
                userId && (
                    <div style={{ "width": "50%", maxWidth: "600px", height: "80%", "float": "right" }}>
                        <Todos id={userId} callbackAllCompleted={getDataFromTodoChild} />
                        <br />
                        <Posts id={userId} />

                    </div>
                )}
        </div>
    )
}