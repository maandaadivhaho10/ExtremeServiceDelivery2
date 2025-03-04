import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

function WaterInfo() {
    return(
        <>
        <div className="manager-info-header">
            <Link to='/landing'><FontAwesomeIcon icon={faArrowLeft} className="back-home"/></Link>
        </div>

        <div className="manager-info-sec">

                <h1 className="manager-info-header">WATER DEPARTMENT</h1>
                <hr className="seperator"/>

                <h2 className="manger-info-sub-headings">Overview</h2>
                <hr className="seperator"/>

                <p className="info-p">Welcome to the Water Department page. Here you can find the latest updates and essential information about the municipality’s water services.</p>
                <br/>
                
                <h2 className="manger-info-sub-headings">Current Status</h2>
                <hr className="seperator"/>
            <h3 className="manager-info-part-headings">Water Supply:</h3>
            <p className="info-p">Currently stable, with no major interruptions reported. Routine monitoring is ongoing.</p>

            <h3 className="manager-info-part-headings">Water Quality:</h3> 
            <p className="info-p">All recent tests indicate compliance with health and safety standards. No advisories in effect.</p>

            <h3 className="manager-info-part-headings">Recent Updates:</h3>
             <p className="info-p"><b>September 15, 2024:</b> Completed a major upgrade to the water filtration system.</p>
            <p className="info-p"><b>September 10, 2024:</b> Temporary water outage in Block B due to maintenance, resolved.</p>

            <br/>
            

            <h2 className="manger-info-sub-headings">Performance Metrics</h2>
            <hr className="seperator"/>

                <h3 className="manager-info-part-headings">Water Usage:</h3>
                <p className="info-p"><b>Average Daily Consumption: </b>1.2 million litres</p>
                <p className="info-p"><b>Peak Consumption: </b>1.5 million litres (August 2024)</p>

                <h3 className="manager-info-part-headings">Quality Reports:</h3>
                <p className="info-p"><b>Recent Test Results: </b>All parameters (pH, turbidity, contaminants) within safe limits.</p>
                <p className="info-p"><b>Last Inspection: </b>September 2024, compliant with regulations.</p>

                <h3 className="manager-info-part-headings">Service Reliability:</h3>
                <p className="info-p"><b>Outages: </b>No major outages in the past month.</p>
                <p className="info-p"><b>Maintenance Requests: </b>15 requests resolved, 2 pending.</p>

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

export default WaterInfo;