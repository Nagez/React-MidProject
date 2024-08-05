import {  useState } from "react"
import OtherData from './OtherData'

export default function User({ user, idParentCallback, currentUserId, isCompleted, deleteUserCallback, updateUserCallback }) {
  const [userData, setUserData] = useState({
    id: user.id,
    name: user.name,
    email: user?.email,
    address: user?.address,
  });
  const [otherDataVisible, setOtherDataVisibile] = useState(false);
  const [userBackground, setUserBackground] = useState('');
  
  const handleMouseOver = (isVisible) => {
    if(!user?.isNew){
      setOtherDataVisibile(isVisible)
    }
  }

  const getDataFromChild = (childValue) => {
    setOtherDataVisibile(childValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleIdClicked = (id)=> {
    setUserBackground('rgb(248, 203, 173)');
    idParentCallback(id)
  }

  const handleDelete = () =>{
    deleteUserCallback(user.id)
  }

  const handleUpdate = () =>{
    // Merge userData with existing user data
    const updatedUser = {
      ...user,      // Existing user data
      ...userData, // User data from state (overrides existing data)
    };
    updateUserCallback(updatedUser);
  }

  //callback function to get the address from otherData
  const updateOtherDataCallback = (userAddress) =>{
    const updatedUser = {
      ...user,      
      address: {
        ...userAddress,
      },
    };
    setUserData(updatedUser);
  }

  return (

    <div style={{ border: '1px solid',borderColor: isCompleted ? "green" : "red", backgroundColor: currentUserId===userData.id ? userBackground : '', margin: '8px 0', padding: '5px 10px',position:'relative'}}>
      <label onClick={() => handleIdClicked(userData.id)}>ID: {userData.id}</label> <br />
      Name: <input type="text" name="name" value={userData.name} onChange={handleInputChange}></input><br />
      Email: <input type="text" name="email" value={userData.email} onChange={handleInputChange}></input><br />

      <button style={{ backgroundColor: "gray" }} onMouseOver={() => handleMouseOver(true)}>Other Data</button>
      {
        otherDataVisible && <OtherData address={userData.address} backGroundcallback={getDataFromChild} updateOtherDataCallback={updateOtherDataCallback}/>
      }
      
      <div style={{position:'absolute', right:'3px',bottom:'0px', }}>
        <button style={{margin:'3px'}} onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

    </div>

  )
}