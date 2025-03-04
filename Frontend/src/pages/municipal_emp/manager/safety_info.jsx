import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

function SafetyInfo() {
    return(
        <>
        <div className="manager-info-header">
            <Link to='/landing'><FontAwesomeIcon icon={faArrowLeft} className="back-home"/></Link>
        </div>

        <div className="manager-info-sec">

                <h1 className="manager-info-header">SAFETY DEPARTMENT</h1>
                <hr className="seperator"/>

                <h2 className="manger-info-sub-headings">Overview</h2>
                <hr className="seperator"/>

                <p className="info-p">Welcome to the Safety Department page. This section provides essential information on public safety initiatives, emergency response services, crime prevention programs, and community outreach efforts. The goal of the Safety Department is to ensure a secure and safe environment for all residents of the municipality.</p>
                <br/>
                
                <h2 className="manger-info-sub-headings">Current Status</h2>
                <hr className="seperator"/>

            <h3 className="manager-info-part-headings">Emergency Services:</h3>
            <p className="info-p"><b>Police Department: </b>Operating 24/7 with an average response time of 5 minutes for emergencies.</p>

            <p className="info-p"><b>Fire Department: </b>Fully staffed with all fire stations operational. Average response time is 7 minutes.</p>

            <p className="info-p"><b>Medical Emergency Services: </b>Ambulance services are on standby with an average response time of 8 minutes.</p>

            <h3 className="manager-info-part-headings">Crime Rates:</h3> 
            <p className="info-p"><b>Violent Crime: </b>Decreased by 10% this quarter compared to the previous year, thanks to enhanced patrols and community engagement.</p>

            <p className="info-p"><b>Property Crime: </b>Reports of burglaries have reduced by 15% due to the installation of new surveillance systems in high-risk areas.</p>

            <p className="info-p"><b>Traffic Violations: </b>Increased monitoring has led to a 20% reduction in speeding incidents.</p>

            <h3 className="manager-info-part-headings">Public Safety Alerts:</h3>
             <p className="info-p"><b>Severe Weather:</b>A storm warning has been issued for the northern sector. Residents are advised to stay indoors and follow safety guidelines.</p>

            <p className="info-p"><b>Community Watch:</b> Increased surveillance in Sector 3 due to recent reports of suspicious activity. Residents are encouraged to report any unusual behavior.</p>

            <br/>
            

            <h2 className="manger-info-sub-headings">Performance Metrics</h2>
            <hr className="seperator"/>

                <h3 className="manager-info-part-headings">Emergency Response:</h3>
                <p className="info-p"><b>Average Response Time: </b>5 minutes for police, 7 minutes for fire, and 8 minutes for medical emergencies.</p>

                <p className="info-p"><b>Emergency Preparedness: </b>90% of households participated in recent fire drills and safety training sessions.</p>

                <p className="info-p"><b>Disaster Readiness: </b>All evacuation routes have been tested and are fully operational.</p>

                <h3 className="manager-info-part-headings">Crime Prevention:</h3>

                <p className="info-p"><b>Community Engagement: </b>75% of neighborhoods have active community watch programs.</p>

                <p className="info-p"><b>Surveillance Coverage: </b> 80% of public areas are monitored by CCTV, with real-time data feeding into the central command center.</p>

                <p className="info-p"><b>Crime Resolution Rate: </b>85% of reported crimes have been resolved or are under active investigation.</p>

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

export default SafetyInfo;