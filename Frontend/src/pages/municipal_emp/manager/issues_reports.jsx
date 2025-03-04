import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import 'bootstrap-icons/font/bootstrap-icons.css'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PdfReport = () => {
    const [isActive, setIsActive] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [issues, setIssues] = useState([]);
    const [originalIssues, setOriginalIssues] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [filterBy, setFilterBy] = useState('');

    const token = localStorage.getItem('token');

    const notify = () => {
        toast("Supervisor asssigned successfully!", {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick:true,
            pauseonHover: true,
            draggable: true,
            progress: undefined,
            className: 'manager-custom-toast'
        });
    };

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/issue/dept-issues', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIssues(response.data);
                setOriginalIssues(response.data);
            } catch (error) {
                console.error("There was an error fetching the issues!", error);
            }
        };

        const fetchSupervisors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/supervisor/supervisors', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            
                setSupervisors(response.data);
            } catch (error) {
                console.error("There was an error fetching the supervisors!", error);
            }
        };

        fetchIssues();
        fetchSupervisors();
    }, [token]);

    useEffect(() => {
        let updatedIssues = [...originalIssues];

        // Apply filtering
        if (filterBy) {
            switch (filterBy) {
                case 'Location':
                    updatedIssues = updatedIssues.filter(issue => issue.location === 'specific location');
                    break;
                case 'Date':
                    updatedIssues = updatedIssues.filter(issue => issue.dateReported === 'specific date');
                    break;
                case 'Status':
                    updatedIssues = updatedIssues.filter(issue => issue.status === 'specific status');
                    break;
                default:
                    break;
            }
        }

        // Apply sorting
        if (sortBy) {
            switch (sortBy) {
                case 'Location':
                    updatedIssues.sort((a, b) => a.location.localeCompare(b.location));
                    break;
                case 'Date':
                    updatedIssues.sort((a, b) => new Date(a.dateReported) - new Date(b.dateReported));
                    break;
                case 'Status':
                    updatedIssues.sort((a, b) => a.status.localeCompare(b.status));
                    break;
                default:
                    break;
            }
        }

        setIssues(updatedIssues);
    }, [sortBy, filterBy, originalIssues]);

    const handleSort = (criteria) => {
        setSortBy(criteria);
    };


     const handleFilter = (criteria) => {
        setFilterBy(criteria);
    };

    const handleAssignSupervisor = async (issueID, supervisorID) => {
        try {
            const response = await axios.post('http://localhost:5000/api/issue/assign-supervisor', {
                issueID, supervisorID
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                // alert('Supervisor assigned successfully');
                notify();
                // Update the state to reflect the assigned supervisor
                setIssues((prevIssues) =>
                    prevIssues.map((issue) =>
                        issue.issueID === issueID
                            ? { ...issue, assignedSupervisorID: supervisorID }
                            : issue
                    )
                );
            }
        } catch (error) {
            console.log(error.message);
            alert('Failed to assign supervisor, Try again later');
        }
    };

    const generatePdf = () => {
        const input = document.getElementById('pdf-content');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'p',
                    unit: 'mm',
                    format: 'a4',
                });

                const imgWidth = 210;
                const pageHeight = 297;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('report.pdf');
            });
    };

    const toggleSection = (issue) => {
        setSelectedIssue(issue);
        setIsActive(!isActive);
    };

    return (
        <>

        <div className="issues-page">
            <ToastContainer/>

            <span className="overlay" onClick={toggleSection}></span>

            <header  className="issues-header">
                <Link to='/landing'><FontAwesomeIcon icon={faArrowLeft} className="back-landing" /></Link>
                <h1 className="reported-header">REPORTED ISSUES</h1>
                <Button onClick={generatePdf} className="btn save-button" data-toggle="tooltip" data-placement="bottom" title="Download Report"><i class="bi bi-file-earmark-arrow-down-fill"></i></Button>
            </header>

            <div className="filt-sort">
                <DropdownButton title='Sort By' className='btn sorting btn-lg'>
                    <Dropdown.Item onClick={() => handleSort('Location')}>Location</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort('Date')}>Date</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort('Status')}>Status</Dropdown.Item>
                </DropdownButton>

                <DropdownButton title='Filter By' className='btn sorting btn-lg'>
                    <Dropdown.Item onClick={() => handleFilter('Location')}>Location</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter('Date')}>Date</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter('Status')}>Status</Dropdown.Item>

                </DropdownButton>
            </div>

            <div id="pdf-content" className="sections col-md-6 mb-4">
                {issues.map((issue, index) => (
                    <Card key={index} className="report-sec">
                        <Card.Body>
                            <Card.Text>
                                <div className="issue">Date Reported: {issue.dateReported} </div>
                                <div className="issue">Status: {issue.status}</div>
                                <div className="issue">Location: {issue.location} </div>
                            </Card.Text>

                            {issue.assignedSupervisorID === null ? (
                                <DropdownButton title='ASSIGN' className='btn assign-btn'>
                                    {supervisors.map((supervisor) => (
                                        <Dropdown.Item key={supervisor.id} onClick={() => handleAssignSupervisor(issue.issueID, supervisor.id)}>
                                            {supervisor.name}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            ) : (
                                <Button className="btn assigned-btn" variant="secondary" disabled>Assigned</Button>
                            )}

                            <Button className="btn details-btn" onClick={() => toggleSection(issue)}>DETAILS</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {isActive && selectedIssue && (
                <section className={`modal ${isActive ? 'active' : ''}`}>
                    <div className="pop-up-box">
                        <FontAwesomeIcon icon={faCircleInfo} className="pop-up-icon" />
                        <h2>Details</h2>
                        <div>Issue Type: {selectedIssue.issueCategory}</div>
                        <div>Issue Description: {selectedIssue.description}</div>
                        <div className="button-sec">
                            <Button className="btn close-btn" onClick={() => toggleSection(null)}>Ok, Close</Button>
                        </div>
                    </div>
                </section>
            )}

            <div className="save-sec">
                {/* <Button onClick={generatePdf} className="btn save-button">Save As PDF</Button> */}
            </div>

        </div>
        </>
    );
};

export default PdfReport;
