import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import person from '../../../assets/person.jpg';
import '../../../scss/Manager/bootstrap-manager.scss';
import { Users } from "../../../dummyData";

function ManagerProf(){

    return(
        <>
        <div className="man-profile-overall">
            
            <div className='man-profile-header'>
            <Link to='/landing'><FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /></Link>
            </div>

            <div className="man-profileContent">
                <img src={person} alt="persons profile"/>
                <p>Name: </p>
                <p>Email Address:</p>
                <p>Phone Number:</p>
                <p>Department: </p>
            </div>

        </div>

        </>
    )
}

export default ManagerProf