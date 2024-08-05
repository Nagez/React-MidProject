import {useEffect, useState } from "react"

export default function OtherData({ address, backGroundcallback, updateOtherDataCallback }) {
    const [userAddress, setUserAddress] = useState({
        street: address.street,
        city: address.city,
        zipcode: address.zipcode,
    });

    const handleClick = () => {
        backGroundcallback(false);
    };

    //Stop click on inputs from closing the section
    const handleInputClick = (event) => {
        event.stopPropagation();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserAddress((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    useEffect(() => {
        updateOtherDataCallback(userAddress);
    }, [userAddress]);

    return (
        <>
            <div onClick={handleClick} style={{ border: "1px black solid", borderRadius: "15px", padding: "5px", margin: "3px", backgroundColor: "lightgray" }}>
                street: <input name="street" value={userAddress.street} onClick={handleInputClick} onChange={handleInputChange}></input><br />
                city: <input name="city" value={userAddress.city} onClick={handleInputClick} onChange={handleInputChange}></input><br />
                zipcode: <input name="zipcode" value={userAddress.zipcode} onClick={handleInputClick} onChange={handleInputChange}></input><br />
            </div>
            <button style={{ visibility: 'hidden' }}>hidden</button>
        </>
    )
}