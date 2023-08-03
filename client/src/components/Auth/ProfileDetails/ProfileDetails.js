import { useState, useEffect, useContext } from "react";
import "./ProfileDetails.css";
import * as userRequest from "../../../services/user";
import { AuthContext } from "../../../contexts/Auth";
import { AlertContext } from "../../../contexts/alertContext";
import { useNavigate } from "react-router-dom";

export const ProfileDetails = () => {
    const [editable, setEditable] = useState(false);
    const [userData, setUserData] = useState("");
    const { user, userLogout } = useContext(AuthContext);
    const { setAlert } = useContext(AlertContext);
    const [validInput, setValidInput] = useState({ f_name: "", l_name: "", phone: "" });

    const navigate = useNavigate();

    useEffect(() => {
        userRequest
            .getUser(user.user_id)
            .then((res) => {
                setUserData(JSON.parse(res));
            })
            .catch((err) => {
                console.log(err);
                setAlert({ color: "red", text: "A valid token is missing!" });
                userLogout();
                navigate("/");
            });
    }, []);

    const validateDataInput = (title, inputData) => {
        let validation = { ...validInput };
        if (inputData.user_data[title].length <= 2) {
            validation[title] = "incorrect";
        } else {
            validation[title] = "";
        }
        setValidInput(validation);
    };

    const isValidDataInput = () => {
        if (Object.values(validInput).includes("incorrect")) {
            return false;
        }
        return true;
    };

    const dataInput = (e) => {
        const title = e.target.name;
        let updatedData = { ...userData };
        updatedData.user_data[title] = e.target.value;
        setUserData(updatedData);

        validateDataInput(title, updatedData);
    };

    const updateUserData = () => {
        if (isValidDataInput()) {
            const updatedData = { ...userData };
            delete updatedData.id;
            delete updatedData.user_data.wishes;
            delete updatedData.user_data.created_on;
            userRequest
                .updateUser(user.user_id, updatedData)
                .then((res) => setAlert({ color: "green", text: "Updated user info successfully!" }))
                .catch((err) => console.log(err));
        } else {
            setAlert({ color: "red", text: "You should fill with valid data all fields!" });
        }
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
                    value={userData != "" ? userData.user_data.f_name : ""}
                    disabled={editable ? false : true}></input>
                <label for='l_name'>Last Name</label>
                <input
                    className={"last-name " + validInput.l_name}
                    type='text'
                    name='l_name'
                    placeholder='Last Name'
                    onChange={(e) => dataInput(e)}
                    value={userData != "" ? userData.user_data.l_name : ""}
                    disabled={editable ? false : true}></input>
                <label for='phone'>Phone</label>
                <input
                    className={"phone " + validInput.phone}
                    type='number'
                    name='phone'
                    placeholder='Phone'
                    onChange={(e) => dataInput(e)}
                    value={userData != "" ? userData.user_data.phone : ""}
                    disabled={editable ? false : true}></input>
                <label for='email'>Email</label>
                <input
                    className='email'
                    type='text'
                    name='email'
                    placeholder='email'
                    value={userData != "" ? userData.email : ""}
                    disabled></input>
                <label for='created_on'>Created on</label>
                <input
                    className='created-on'
                    type='text'
                    name='created_on'
                    placeholder='created_on'
                    value={userData != "" ? userData.user_data.created_on : ""}
                    disabled></input>
                <div
                    className='edit-btn btn'
                    onClick={(e) => {
                        if (editable) {
                            updateUserData();
                        }
                        setEditable((prev) => !prev);
                    }}>
                    {editable ? "Update" : "Edit"}
                </div>
            </div>
        </>
    );
};
