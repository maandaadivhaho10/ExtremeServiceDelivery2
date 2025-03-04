import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

function ElectricityInfo() {
    return(
        <>
        <div className="manager-info-header">
            <Link to='/landing'><FontAwesomeIcon icon={faArrowLeft} className="back-home"/></Link>
        </div>

        <div className="manager-info-sec">

                <h1 className="manager-info-header">ELECTRICITY DEPARTMENT</h1>
                <hr className="seperator"/>

                <h2 className="manger-info-sub-headings">Overview</h2>
                <hr className="seperator"/>

                <p className="info-p">Welcome to the Electricity Department page. This section provides detailed information and updates on the municipality's electricity services</p>
                <br/>
                
                <h2 className="manger-info-sub-headings">Current Status</h2>
                <hr className="seperator"/>
            <h3 className="manager-info-part-headings">Power Supply:</h3>
            <p className="info-p">Stable across all sectors, with no major disruptions reported. Grid performance is within optimal levels.</p>

            <h3 className="manager-info-part-headings">Outage Reports:</h3> 
            <p className="info-p"><b>Plessis Substation:</b> Minor outage reported on September 12, 2024, due to a transformer issue. Resolved within 2 hours.</p>
            <p className="info-p"><b>Siyakha Substation:</b> Planned maintenance outage on September 20, 2024, from 1:00 AM to 4:00 AM.</p>

            <h3 className="manager-info-part-headings">Recent Updates:</h3>
             <p className="info-p"><b>September 10, 2024:</b> ompletion of a new substation in Siyanqoba, enhancing grid reliability.</p>
            <p className="info-p"><b>August 28, 2024:</b>  Introduction of smart meters across the municipality for better monitoring and efficiency.</p>

            <br/>
            

            <h2 className="manger-info-sub-headings">Performance Metrics</h2>
            <hr className="seperator"/>

                <h3 className="manager-info-part-headings">Energy Consumption:</h3>
                <p className="info-p"><b>Average Daily Consumption: </b>50,000 MWh</p>
                <p className="info-p"><b>Peak Demand: </b> 70,000 MWh (August 2024)</p>

                <h3 className="manager-info-part-headings">Grid Reliability:</h3>
                <p className="info-p"><b>Uptime: </b>99.8% for the past month, with only minor, localized outages.</p>
                <p className="info-p"><b>Maintenance Response Time: </b>Average of 45 minutes per incident.</p>


            <br/>
            

            <h2 className="manger-info-sub-headings">Reports and Documents</h2>
            <hr className="seperator"/>

                <h3 className="manager-info-part-headings">Monthly Reports:</h3>
                <p className="info-p"><b>August 2024 Report: </b>Detailed analysis of energy consumption, grid performance, and outage management.</p>

                <p className="info-p"><b>July 2024 Report:</b> Available here for reference.</p>

            <br/>
            

        </div>
        </>
    )
}

export default ElectricityInfo;