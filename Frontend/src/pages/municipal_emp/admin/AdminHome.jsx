import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../scss/Admin/adminhome.scss';
import person from '../../../assets/person.jpg';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminHome = ({ handleLogout }) => {
  const [barData, setBarData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Issues per Month',
        data: new Array(12).fill(0),  // Initialize with zeros for all 12 months
        backgroundColor: '#60cc4af1',
        borderColor: '#575757',
        borderWidth: 1,
      },
    ],
  });

  // Y-Axis step pattern (5, 10, 15, ...)
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5, // Set step size
        },
      },
    },
  };

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    const fetchIssueData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/issue/issue-counts', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const issueData = response.data;

        // Create an array with 12 entries, where each index corresponds to a month
        const issuesPerMonth = new Array(12).fill(0);

        // Populate the issuesPerMonth array with actual data from issueData
        issueData.forEach(item => {
          issuesPerMonth[item.month - 1] = item.issues_reported;
        });

        setBarData({
          labels: monthNames,
          datasets: [
            {
              label: 'Issues per Month',
              data: issuesPerMonth,
              backgroundColor: '#60cc4af1',
              borderColor: '#575757',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching issue data:', error);
      }
    };

    fetchIssueData();
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="admin-home">
      <aside className="menu-aside">
        <img src={person} className="profile-pic" alt="Profile" />
        <h2 className='profile-heading'>{user.name} {user.surname}</h2>
        <ul className="menu-list">
          <li><Link to='/addemployees' className='menu-item'>Create User Accounts</Link></li>
          <li><Link to='/monthly' className="menu-item">Generate Reports</Link></li>
          <li><Link to='/viewaccount' className="menu-item">View Account</Link></li>
          <li><Link to='/logoutpage' onClick={handleLogout} className="menu-item">Sign out</Link></li>
        </ul>
      </aside>

      <header className="header">Dashboard</header>
      <menu className="content">
        <h2 className="exd-head">Extreme Service Delivery</h2>
        <Bar data={barData} options={options} />
      </menu>

      <footer className="footer">Copyright© 2024</footer>
    </div>
  );
};

export default AdminHome;
