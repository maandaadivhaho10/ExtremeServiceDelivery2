import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../../../scss/Admin/viewaccount.scss';

const Forms = () => {
    const [activeForm, setActiveForm] = useState('manager');
    const [supervisors, setSupervisors] = useState([]);
    const [managers, setManagers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
   const token = localStorage.getItem('token');
    useEffect(() => {
        // Fetch all users grouped by role from the backend
        axios.get('http://localhost:5000/api/updates/municipal-emps',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
            
        )
            .then(res => {
                setSupervisors(res.data.supervisors);
                setManagers(res.data.managers);
                setAdmins(res.data.admins);
            })
            .catch(err => console.log(err));
    }, []);

    const handleFormSwitch = (formType) => {
        setActiveForm(formType);
    };

    const handleDeleteUser = (role, email) => {
        axios.delete(`https://localhost:3030/${role}/${email}`)
            .then(() => {
                if (role === 'supervisors') setSupervisors(supervisors.filter(user => user.email !== email));
                if (role === 'managers') setManagers(managers.filter(user => user.email !== email));
                if (role === 'admins') setAdmins(admins.filter(user => user.email !== email));
            })
            .catch(err => console.log(err));
    };

    const filteredUsers = (users) => users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="form-container">
            <FontAwesomeIcon
                icon={faArrowLeft}
                className="back-button"
                onClick={() => window.history.back()} // Go back to the previous page
            />
            <nav>
                <button onClick={() => handleFormSwitch('manager')}>Manager</button>
                <button onClick={() => handleFormSwitch('supervisor')}>Supervisor</button>
                <button onClick={() => handleFormSwitch('admin')}>Admin</button>
            </nav>

            {activeForm === 'manager' && (
                <section className="managers-list">
                    <h2>Managers List</h2>
                    <input
                        type="text"
                        placeholder="Search Manager"
                        className="search-bar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {filteredUsers(managers).map((manager) => (
                        <div className="manager-card" key={manager.email}>
                            <div className="manager-info">
                                <span className="manager-name">{manager.name}</span>
                                <span className="manager-email">{manager.email}</span>
                            </div>
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteUser('managers', manager.email)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </section>
            )}

            {activeForm === 'supervisor' && (
                <section className="supervisors-list">
                    <h2>Supervisors List</h2>
                    <input
                        type="text"
                        placeholder="Search Supervisor"
                        className="search-bar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {filteredUsers(supervisors).map((supervisor) => (
                        <div className="supervisor-card" key={supervisor.email}>
                            <div className="supervisor-info">
                                <span className="supervisor-name">{supervisor.name}</span>
                                <span className="supervisor-email">{supervisor.email}</span>
                            </div>
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteUser('supervisors', supervisor.email)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </section>
            )}

            {activeForm === 'admin' && (
                <section className="admins-list">
                    <h2>Admins List</h2>
                    <input
                        type="text"
                        placeholder="Search Admin"
                        className="search-bar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {filteredUsers(admins).map((admin) => (
                        <div className="admin-card" key={admin.email}>
                            <div className="admin-info">
                                <span className="admin-name">{admin.name}</span>
                                <span className="admin-email">{admin.email}</span>
                            </div>
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteUser('admins', admin.email)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
};

export default Forms;
