import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPeopleGroup, faQuestionCircle, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../../../scss/Supervisor/supervisor.scss';
import '../../../scss/Supervisor/IssuesComponent.scss';
import person from '../../../assets/person.jpg';

const Suplanding = () => {
    const [issueCounts, setIssueCounts] = useState({
        submitted: 0,
        inProgress: 0,
        completed: 0,
        complicated: 0,
    });

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                const response = await axios.get('http://localhost:5000/api/supervisor/assigned-issues', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
       const issues = response.data;
                const counts = issues.reduce((acc, issue) => {
                    console.log("Processing issue status:", issue.status);
                    switch (issue.status) {
                        case 'Pending':
                            acc.submitted += 1;
                            break;
                        case 'In Progress':
                            acc.inProgress += 1;
                            break;
                        case 'Completed':
                            acc.completed += 1;
                            break;
                        case 'Complicated':
                            acc.complicated += 1;
                            break;
                        default:
                            break;
                    }
                    return acc;
                }, {
                    submitted: 0,
                    inProgress: 0,
                    completed: 0,
                    complicated: 0,
                });
                
                console.log("Issue counts:", counts);
                

                setIssueCounts(counts);
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };

        fetchIssues();
    }, []);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="dashboard">
            <aside className='supervisor-sidebar'>
                <img src={person} className='profile-pic' alt="Profile" />
                <h2>{user.name} {user.surname}</h2>
                <p className='email'>{user.email}</p>

                <Link to='/issueupdate'><p className='links'><FontAwesomeIcon icon={faQuestionCircle} /> View Assigned Issues</p></Link>
                <Link to='/writereport'><p className='links'><FontAwesomeIcon icon={faQuestionCircle} /> Write Report</p></Link>
                <Link to='/help'><p className='links'><FontAwesomeIcon icon={faQuestionCircle} /> Help</p></Link>
                {/* <Link to='/about'><p className='links'><FontAwesomeIcon icon={faPeopleGroup} /> About Us</p></Link>
                <Link to='/settings'><p className='links'><FontAwesomeIcon icon={faGear} /> Settings</p></Link> */}
                <Link to='/logoutpage'><p className='links'><FontAwesomeIcon icon={faRightFromBracket} /> Sign out</p></Link>
            </aside>

            <div className='supervisor-header'></div>

            <main className="content">
                <div className="dashboard-summary">
                    <h1>Issue Summary</h1>

                    <div className="summary-cards">
                        <div className="summary-card">
                            <h2>Total Issues</h2>
                            <p>{issueCounts.submitted + issueCounts.inProgress + issueCounts.completed + issueCounts.complicated}</p>
                        </div>
                        <div className="summary-card">
                            <h2>In Progress</h2>
                            <p>{issueCounts.inProgress}</p>
                        </div>
                        <div className="summary-card">
                            <h2>Completed</h2>
                            <p>{issueCounts.completed}</p>
                        </div>
                        <div className="summary-card">
                            <h2>Complicated</h2>
                            <p>{issueCounts.complicated}</p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="supervisor-footer">
                Copyright ©
            </footer>
        </div>
    );
};

export default Suplanding;
