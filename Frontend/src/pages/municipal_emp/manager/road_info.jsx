import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

function RoadInfo() {
    return(
        <>
        <div className="manager-info-header">
            <Link to='/landing'><FontAwesomeIcon icon={faArrowLeft} className="back-home"/></Link>
        </div>

        <div className="manager-info-sec">

                <h1 className="manager-info-header">ROAD AND TRANSPORT DEPARTMENT</h1>
                <hr className="seperator"/>

                <h2 className="manger-info-sub-headings">Overview</h2>
                <hr className="seperator"/>

                <p className="info-p">Welcome to the Road and Transport Department page. This section provides comprehensive information on the municipality's road infrastructure, public transportation services, ongoing construction projects, and key performance indicators. Stay informed about the latest developments and ensure the smooth operation of road and transport services.</p>
                <br/>
                
                <h2 className="manger-info-sub-headings">Current Status</h2>
                <hr className="seperator"/>
            <h3 className="manager-info-part-headings">Road Conditions:</h3>
            <p className="info-p"><b>Main Roads:</b> All major roads are currently operational, with regular maintenance schedules in place.</p>

            <p className="info-p"><b>Secondary Roads:</b> Minor pothole issues reported on Nelson Mandela Ave; repairs scheduled for the coming week.</p>

            <p className="info-p"><b>Traffic Flow:</b> Moderate congestion observed during peak hours on Highway 7. Traffic management measures are being implemented.</p>

            <h3 className="manager-info-part-headings">Public Transportation:</h3> 
            <p className="info-p"><b>Bus Services:</b> All routes are running as scheduled, with an average on-time performance of 95%.</p>

            <p className="info-p"><b>Taxi:</b> No significant issues reported. Monitoring ongoing for any service disruptions.</p>

            <p className="info-p"><b>Bicycle Lanes:</b> New lanes added in Mandela Ext 4 to promote eco-friendly commuting; feedback from users is positive.</p>

            <br/>
            

            <h2 className="manger-info-sub-headings">Performance Metrics</h2>
            <hr className="seperator"/>

                <h3 className="manager-info-part-headings">Road Infrastructure:</h3>
                <p className="info-p"><b>Road Surface Quality: </b>85% of roads are rated as 'Good' or 'Very Good' based on the latest inspection.</p>

                <p className="info-p"><b>Average Repair Time: </b>48 hours for minor repairs; 2 weeks for major overhauls.</p>

                <p className="info-p"><b>Annual Road Maintenance: </b>120 kilometers of road maintained this year, with a focus on high-traffic areas.</p>

                <h3 className="manager-info-part-headings">Transportation Services:</h3>
                <p className="info-p"><b>Public Transport Usage: </b>60% of residents utilize public transport regularly, with a yearly increase of 5%.</p>

                <p className="info-p"><b>On-Time Performance: </b>95% for buses, 90% for trains.</p>

                <p className="info-p"><b>Safety Record: </b>Zero major accidents reported in the past quarter, reflecting a strong safety protocol.</p>

            <br/>
            

            <h2 className="manger-info-sub-headings">Reports and Documents</h2>
            <hr className="seperator"/>

                <h3 className="manager-info-part-headings">Monthly Reports:</h3>
                <p className="info-p"><b>August 2024 Report: </b>Includes detailed data on water usage, quality, and service performance.</p>

                <p className="info-p"><b>July 2024 Report:</b> Available here for reference.</p>

            <br/>
            

        </div>
        </>
    )
}

export default RoadInfo;