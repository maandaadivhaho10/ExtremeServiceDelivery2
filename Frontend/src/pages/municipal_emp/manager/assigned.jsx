import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { Card, DropdownButton, Dropdown, Row, Col, Container } from "react-bootstrap";
import { Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    }

    return (
        <Form className='search-form' onSubmit={handleSearch}>
            <FormControl
                type='search'
                placeholder="Search..."
                className="search-field"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant='outline-success' type='submit' className="sup-search-btn">Search</Button>
        </Form>
    );
}

function AssignedIssues() {
    const [assignedSupervisors, setAssignedSupervisors] = useState([]);
    const [filteredSupervisors, setFilteredSupervisors] = useState([]);

    useEffect(() => {
        const fetchAssignedSupervisors = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/issue/getAssignedSupervisors', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAssignedSupervisors(response.data);
                setFilteredSupervisors(response.data); // Initialize filteredSupervisors
            } catch (error) {
                console.log(error);
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert('An error occurred');
                }
            }
        };

        fetchAssignedSupervisors();
    }, []);

    const handleSearch = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = assignedSupervisors.filter(supervisor =>
            supervisor.name.toLowerCase().includes(lowercasedQuery) ||
            supervisor.surname.toLowerCase().includes(lowercasedQuery) || 
            supervisor.email.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredSupervisors(filtered);
    };

    const getIssuesAssignedToSupervisor = async (supervisorID) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/issue/getIssuesAssignedToSupervisors/${supervisorID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data; // Return the fetched issues
        } catch (error) {
            console.error('Error fetching issues:', error);
            return [];
        }
    }

    const [issuesBySupervisor, setIssuesBySupervisor] = useState({});

    const handleViewIssues = async (supervisorID) => {
        if (!issuesBySupervisor[supervisorID]) { // Only fetch if not already fetched
            const issues = await getIssuesAssignedToSupervisor(supervisorID);
            setIssuesBySupervisor(prev => ({ ...prev, [supervisorID]: issues }));
        }
    }
    const handleDelete = (id) => {
        setFilteredSupervisors(prevSupervisors =>
            prevSupervisors.filter(supervisor => supervisor.id !== id)
        );
    };

    return (
        <>
            <header>
                <Link to='/landing'><FontAwesomeIcon icon={faArrowLeft} className="back-home" /></Link>
            </header>

            <SearchBar onSearch={handleSearch} />

            <Container fluid>
                <Row>
                    {filteredSupervisors.map((supervisor) => (
                        <Col sm={12} md={6} lg={4} className="mb-4" key={supervisor.id}>
                            <Card className="assignment-card">
                                <Card.Header as="h5"><h2>{supervisor.name} {supervisor.surname}</h2></Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <div className="assignezd-text"><h5>Email: {supervisor.email}</h5></div>
                                        <div className="supervisor-btns">
                                            <DropdownButton title="View Assigned Issues" className='viewing-btn' onClick={() => handleViewIssues(supervisor.id)}>
                                                {issuesBySupervisor[supervisor.id] && issuesBySupervisor[supervisor.id].length > 0 ? (
                                                    issuesBySupervisor[supervisor.id].map((issue, index) => (
                                                        <Dropdown.Item key={issue.issueId}>
                                                            <b>Issue {index + 1}:</b>
                                                            <br />
                                                            <div>Issue ID: {issue.issueId}</div>
                                                            <br />
                                                            <div>Issue Description: {issue.description}</div>
                                                            <br />
                                                            <div>Issue Status: {issue.status}</div>
                                                            {index < issuesBySupervisor[supervisor.id].length - 1 && <hr className="dropdown-divider" />}
                                                        </Dropdown.Item>
                                                    ))
                                                ) : (<Dropdown.Item>No issues Assigned</Dropdown.Item>
                                                )}
                                            </DropdownButton>
                                            <Button variant="danger" className="del-btn" onClick={() => handleDelete(supervisor.id)}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default AssignedIssues;
