import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { AlertContext } from "../../../contexts/alertContext";
import { AuthContext } from "../../../contexts/Auth";
import * as userRequest from "../../../services/user";

import "./ProfileDetails.css";
import { useNavigationWithHistory } from "../../../hooks/useNavigation";

export const ProfileDetails = () => {
    const { user, userLogout } = useContext(AuthContext);
    const { setAlert } = useContext(AlertContext);

    const [validInput, setValidInput] = useState({ f_name: "", l_name: "", phone: "" });
    const [editable, setEditable] = useState(false);
    const [userData, setUserData] = useState({
        user_data: { f_name: "", l_name: "", phone: "", created_on: "" },
        email: "",
    });

    const navigate = useNavigationWithHistory();

    useEffect(() => {
        userRequest
            .getUser(user.user_id)
            .then((user) => {
                setUserData(JSON.parse(user));
            })
            .catch((err) => {
                console.log(err);
                setAlert({ color: "red", text: "A valid token is missing!" });
                userLogout();
                navigate("/");
            });
    }, []);

    const validateDataInput = (key, inputData) => {
        let validation = { ...validInput };
        if (key == "phone") {
            if (3 >= inputData.user_data[key].length || inputData.user_data[key].length >= 11) {
                validation[key] = "incorrect";
            } else validation[key] = "";
        } else if (inputData.user_data[key].length <= 2) validation[key] = "incorrect";
        else validation[key] = "";

        setValidInput(validation);
    };

    const isValidDataInput = () => {
        if (Object.values(validInput).includes("incorrect")) return false;
        return true;
    };

    const dataInput = (e) => {
        const key = e.target.name;
        let updatedData = { ...userData };
        updatedData.user_data[key] = e.target.value;
        setUserData(updatedData);
        validateDataInput(key, updatedData);
    };

    const updateUserData = () => {
        if (isValidDataInput()) {
            const updatedData = { ...userData };
            delete updatedData.id;
            delete updatedData.user_data.wishes;
            delete updatedData.user_data.created_on;
            userRequest
                .updateUser(user.user_id, updatedData)
                .then((_) => {
                    setEditable((prev) => !prev);
                    setAlert({ color: "green", text: "Updated user info successfully!" });
                })
                .catch((err) => {
                    console.log(err.message);
                    setAlert({ color: "red", text: "Somethings gone wrong. Try again!" });
                    // setAlert({ color: "red", text: err.message });
                });
        } else setAlert({ color: "red", text: "You should fill with valid data all fields!" });
    };

    return (
        <>
            <div className='detail-form'>
                <label for='f_name'>First Name</label>
                <input
                    className={"first-name " + validInput.f_name}
                    type='text'
                    name='f_name'
                    placeholder='First Name'
                    onChange={(e) => dataInput(e)}
                    value={userData.user_data.f_name}
                    disabled={editable ? false : true}></input>
                <label for='l_name'>Last Name</label>
                <input
                    className={"last-name " + validInput.l_name}
                    type='text'
                    name='l_name'
                    placeholder='Last Name'
                    onChange={(e) => dataInput(e)}
                    value={userData.user_data.l_name}
                    disabled={editable ? false : true}></input>
                <label for='phone'>Phone</label>
                <input
                    className={"phone " + validInput.phone}
                    type='number'
                    name='phone'
                    placeholder='Phone'
                    onChange={(e) => dataInput(e)}
                    value={userData.user_data.phone}
                    disabled={editable ? false : true}></input>
                <label for='email'>Email</label>
                <input
                    className='email'
                    type='text'
                    name='email'
                    placeholder='email'
                    value={userData.email}
                    disabled></input>
                <label for='created_on'>Created on</label>
                <input
                    className='created-on'
                    type='text'
                    name='created_on'
                    placeholder='created_on'
                    value={userData.user_data.created_on}
                    disabled></input>
                <div
                    className='edit-btn btn'
                    onClick={() => {
                        if (editable) updateUserData();
                        else setEditable((prev) => !prev);
                    }}>
                    {editable ? "Update" : "Edit"}
                </div>
            </div>
        </>
    );
};
