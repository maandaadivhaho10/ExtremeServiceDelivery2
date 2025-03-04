import { useEffect, useState } from "react";
import React from "react";
import welcomeImg from '../assets/welcome.png'
import img1 from '../assets/emalahleni.png'
import loadingImg from '../assets/esdl2.png';
import '../scss/welcomePage.scss'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'

function Welcome(){
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        setTimeout(() => {
            setIsLoading(false);
        }, 3000); 
    }, []);

    if (isLoading) {
        return (
            <div className="loading-screen">
                <img src={loadingImg} alt="Loading..." className="loading-image" />
            </div>
        );
    }


    return(
        <>
        <div className="welcome-page">
                <div className="welcome-header">
                <img src={img1} alt="" />
                <h2>Extreme Service Delivery Portal</h2>
                <ul className="navbar">
                    <li><Link to='/' onClick={() => window.location.reload()}>Home</Link></li>
                    <li><Link to='/about'>About Us</Link></li>
                    <li><Link>Contact Us</Link></li>
                    <li><Link to='/login'><button>Login</button></Link></li>
                </ul>
                </div>

            <div className="welcome-content">
                
                <div className="welcome-message">
                    <h1 className="welcome-head">WELCOME</h1>

                    <p>Welcome to the <b>Extreme Service Delivery Portal</b>, the ultimate platform designed to empower communities and enhance government responsiveness in addressing service delivery challenges. Our mission is to bridge the gap between citizens and local authorities by providing a streamlined, efficient way to report and resolve issues. Whether it's fixing a pothole, addressing water shortages, or improving waste management, our web application connects you directly with the right government departments, ensuring that your voice is heard and action is taken. Join us in making our communities stronger, more responsive, and better connected for everyone.</p>

                    <h3>To better your community. </h3>
                    
                </div>

                <div className="welcome-img-sec">
                <img src={welcomeImg} alt="" />
                <Link to='/signup'><button className="sign-up-button">Sign Up</button></Link>
                </div>

            </div>

            <div className="welcome-footer">
                <FontAwesomeIcon icon={faFacebook} className="welcome-footer-icons"/>
                <FontAwesomeIcon icon={faInstagram} className="welcome-footer-icons"/>
                <FontAwesomeIcon icon={faXTwitter} className="welcome-footer-icons"/>
            </div>
            </div>
        </>
    )
}

export default Welcome