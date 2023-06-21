import { useContext } from "react";
import "./EducationInfo.css";
import { EducationalPopupContext } from "../../contexts/educationalPopupContext";

export const EducationInfo = () => {
    const { educationPopup, setEducationPopup } = useContext(EducationalPopupContext);
    const hideEducationPopup = () => {
        setEducationPopup(false);
    };

    return (
        <div className={`frame-education ${educationPopup == true ? "show-education-popup" : ""}`}>
            <div className='education-popup'>
                <h2 className='title'>Important Notice - Educational Use Only</h2>
                <p className='p-1'>
                    Welcome to <span>Shoecommerce</span>!
                </p>
                <p className='p-2'>
                    This website is created solely for educational purposes and to showcase my skills as a developer.
                    Please note that no commercial usage or transactions are permitted on this site.
                </p>
                <p className='p-3'>
                    All the content, images, and information available here are used for demonstration and educational
                    purposes only. They may be copyrighted or owned by their respective creators or organizations.
                </p>
                <div className='btn' onClick={() => hideEducationPopup()}>
                    OK!
                </div>
            </div>
        </div>
    );
};
