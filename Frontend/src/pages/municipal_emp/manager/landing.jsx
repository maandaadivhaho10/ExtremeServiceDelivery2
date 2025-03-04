import React, { useState, useEffect } from 'react';
import '../../../scss/Manager/bootstrap-manager.scss';
import person from '../../../assets/person.jpg';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Electricity from '../../../assets/electricity.png';
import Road from '../../../assets/road.png';
import Water from '../../../assets/water.png';
import Crime from '../../../assets/crime.png';
import 'bootstrap/dist/css/bootstrap.min.css'

function Landing() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    useEffect(() => {
        const numbers = document.querySelectorAll('.number');
        const svgE1 = document.querySelectorAll('svg circle');
        const counters = Array(numbers.length).fill(0);
        const intervals = Array(counters.length);

        numbers.forEach((number, index) => {
            intervals[index] = setInterval(() => {
                if (counters[index] === parseInt(number.dataset.num)) {
                    clearInterval(intervals[index]);
                } else {
                    counters[index] += 1;
                    number.innerHTML = counters[index] + "%";
                    svgE1[index].style.strokeDashoffset = Math.floor(472 - 440 * parseFloat(number.dataset.num / 100));
                }
            }, 20);
        });


        return () => {
            intervals.forEach(interval => clearInterval(interval));
        };
    }, []);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
        <div className="dashboard">

        <aside className='manager-sidebar'>

            <h2>Welcome, <br/> {user.name} {user.surname}</h2>
            <img src={person} className='man-profile-pic' alt='profile for manager'/>
            <p className='email'>{user.email}</p>
            <Link to='/issues'> <Button className='manager-dash-btn'> View Issues </Button></Link>
            <br/>
            <br/>
            <Link to='/assigned'> <Button className='manager-dash-btn'> View Assigned Issues </Button></Link>
            <br/>
            <br/>
            <Link to='/help'><Button className='manager-dash-btn'> Help </Button> </Link>
            <br/>
            <br/>
            {/* <Link to='/manprofile' className='manager-dash-link'><p> Profile</p></Link> */}
            <Link to='/logoutpage'><button className='btn btn-primary custom-manager-btn'>Log Out</button></Link>

        </aside>

            <div className='manager-header'>
            </div>
            
            <div className='main-content'>
            <div className="man-content">
                <div className='progress-sec'>
                    <h3 className='progress-head'>Overview</h3>

                <div className='progress-bars-sec'>

                    <div className='progress-container'>
                        <div className='status'>
                            <div className='outer'>
                                <div className='inner'>
                                    <div className='number' data-num='20'>
                                        
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                <defs>
                    <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="#e91e63" />
                        <stop offset="100%" stop-color="#673ab7" />
                    </linearGradient>
                </defs>
                <circle cx="80" cy="80" r="70" stroke-linecap="round" />
                </svg>
                            </div>
                            Resolved
                        </div>
                    </div>


                    <div className='progress-container'>
                        <div className='status'>
                            <div className='outer'>
                                <div className='inner'>
                                    <div className='number' data-num='20'>
                                        
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                <defs>
                    <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="#e91e63" />
                        <stop offset="100%" stop-color="#673ab7" />
                    </linearGradient>
                </defs>
                <circle cx="80" cy="80" r="70" stroke-linecap="round" />
                </svg>
                            </div>
                            Unresolved
                        </div>
                    </div>

                    <div className='progress-container'>
                        <div className='status'>
                            <div className='outer'>
                                <div className='inner'>
                                    <div className='number' data-num='60'>
                                        
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                <defs>
                    <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="#e91e63" />
                        <stop offset="100%" stop-color="#673ab7" />
                    </linearGradient>
                </defs>
                <circle cx="80" cy="80" r="70" stroke-linecap="round" />
                </svg>
                            </div>
                            In progess
                        </div>
                    </div>

                </div>
                </div>
                
                <div className='stats-update'>
                    <p className='update'>
                        At 50% progress there are very few issues resolved. This indicates a starting phase where initial efforts have been made, but the majority of tasks remain pending.
                    </p>
                </div>

                <div className='departments-sec'>

                    <h3 className='info-head'>Information Centre</h3>

                    <div className='buttons-sec'>

                    <div className='row'>
                        <div className='col-md-6 mb-4'>
                    <Card className='info-card'>
                        <Card.Img  variant='top' src={Electricity}/>
                        <Card.Body>
                            <Card.Title className='card-title'>Electricity</Card.Title>
                            <Card.Text>
                                Explore detailed information on electricity services, rates,loadshedding and policies.
                            </Card.Text>
                            <Link to='/electricity'><Button className='btn btn-primary '>MORE INFO</Button></Link>
                        </Card.Body>
                    </Card>
                    </div>

                    <div className='col-md-6 mb-4'>
                    <Card className='info-card'>
                        <Card.Img  variant='top' src={Road}/>
                        <Card.Body>
                            <Card.Title className='card-title'>Road and Transport</Card.Title>
                            <Card.Text>
                                Access essential details about road conditions, transport services, and local travel updates on our dedicated Road and Transport info page.
                            </Card.Text>
                            <Link to='/road'><Button variant='primary'>MORE INFO</Button></Link>
                        </Card.Body>
                    </Card>
                    </div>

                    <div className='col-md-6 mb-4'>
                    <Card className='info-card'>
                        <Card.Img variant='top' src={Water}/>
                        <Card.Body>
                            <Card.Title className='card-title'>Water Supply and Infrastructure</Card.Title>
                            <Card.Text>
                                Discover important information about water supply and maintenance updates on our Water Supply and Infrastructure info page.
                            </Card.Text>
                            <Link to='/water'><Button className='btn btn-primary '>MORE INFO</Button></Link>
                        </Card.Body>
                    </Card>
                    </div>

                    <div className='col-md-6 mb-4'>
                    <Card className='info-card'>
                        <Card.Img variant='top' src={Crime}/>
                        <Card.Body>
                            <Card.Title className='card-title'>Safety</Card.Title>
                            <Card.Text>
                                Stay informed about local safety initiatives, emergency services, and community safety tips on our dedicated Safety info page.
                            </Card.Text>
                            <Link to='/safety'><Button className='btn btn-primary '>MORE INFO</Button></Link>
                        </Card.Body>
                    </Card>
                    </div>
                    </div>

                    </div>
                </div>
                </div>
    
                
            </div>

            <footer className="manager-footer">
                    Copyright©2024; Designed by esd
            </footer>
        </div>
        </>
    );
};

export default Landing;
