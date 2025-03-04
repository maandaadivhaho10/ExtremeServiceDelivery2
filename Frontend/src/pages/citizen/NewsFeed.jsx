import React, { useState, useEffect } from 'react';
import '../../scss/newsfeed.scss';
import person from '../../assets/person.jpg'; // Assuming person.jpg is the default profile picture
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faArrowLeft, faLocationDot, faSearch, faLayerGroup, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ProfilePicture from '../../assets/profile_picture.png';

const Newsfeed = () => {
  const [verificationCounts, setVerificationCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [newsfeedData, setNewsfeedData] = useState([]);
  const [reporterNames, setReporterNames] = useState({});
  const [profilePic, setProfilePic] = useState(ProfilePicture)

  // Fetch issues and reporter names from the backend
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/issue/getAllIssues', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const issues = response.data;
          setNewsfeedData(issues);
  
          const initialCounts = issues.reduce((acc, post) => {
            acc[post.issueID] = post.verificationCount || 0;
            return acc;
          }, {});
          setVerificationCounts(initialCounts);
  
          const reporters = await Promise.all(
            issues.map(async (issue) => {
              const reporter = await getIssueReporter(issue.residentID);
              console.log(reporter.name);
              return { id: issue.residentID, name: `${reporter.name} ${reporter.surname}` };
            })
          );
          console.log(reporters);
  
          const reporterNamesMap = reporters.reduce((acc, reporter) => {
            acc[reporter.id] = reporter.name;
            return acc;
          }, {});
          setReporterNames(reporterNamesMap);
          console.log('Reporter names:', reporterNamesMap); // Log the reporter names map
        } else {
          console.error('Failed to fetch issues');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchIssues();
  }, []);
  
  // Get user details from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Update profile picture if available in user object
  useEffect(() => {
      if (user && user.profilePic) {
          setProfilePic(`http://localhost:5000${user.profilePic}`);
      }
  }, [user]);

  const getIssueReporter = async (residentID) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/issue/get-issue-reporter/${residentID}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log('Reporter response:', response.data); // Log the response data
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('Error occurred');
      }
    }
  };

  const handleVerification = (id) => {
    setVerificationCounts((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const getStatusClass = (count) => {
    if (count > 5) return 'resolved';
    if (count > 0) return 'pending';
    return 'unresolved';
  };

  const getStatus = (count) => {
    if (count > 5) return 'Resolved';
    if (count > 0) return 'Pending';
    return 'Unresolved';
  };

  const getDateFilterCondition = (dateReported, filterDate) => {
    const reportedDate = new Date(dateReported);
    const currentDate = new Date();

    switch (filterDate) {
      case 'Today':
        return reportedDate.toDateString() === currentDate.toDateString();
      case 'Yesterday':
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - 1);
        return reportedDate.toDateString() === yesterday.toDateString();
      case 'Last 7 Days':
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        return reportedDate >= sevenDaysAgo && reportedDate <= currentDate;
      case 'Last 30 Days':
        const thirtyDaysAgo = new Date(currentDate);
        thirtyDaysAgo.setDate(currentDate.getDate() - 30);
        return reportedDate >= thirtyDaysAgo && reportedDate <= currentDate;
      default:
        return true; // If no filter is applied, include all posts
    }
  };

  const filteredPosts = newsfeedData.filter((post) => {
    const matchesSearch =
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.issueCategory.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === '' || post.issueCategory === filterCategory;

    const matchesDate = getDateFilterCondition(post.dateReported, filterDate);

    return matchesSearch && matchesCategory && matchesDate;
  });

  const getImageUrl = (path) => {
    return path ? `http://localhost:5000${path}` : null;
  };

  const getFormattedTimestamp = (dateReported) => {
    const reportedDate = new Date(dateReported);
    const currentDate = new Date();
    console.log(currentDate);
    const timeDifference = currentDate - reportedDate; // Time difference in milliseconds
    
    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return reportedDate.toLocaleString(); // Customize the format if needed
    }
  };


  return (
    <div className="newsfeed">
            <FontAwesomeIcon
                icon={faArrowLeft}
                className="back-button"
                onClick={() => window.history.back()}
            />
      {/* Search and Filter Box */}
      <div className="search-filter-box">
        {/* Category filter */}
        <div className='category-box'>
          <span className='icon'><FontAwesomeIcon icon={faLayerGroup} className='login-icon' /></span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Power & Electricity">Power & Electricity</option>
            <option value="Water & Sanitation">Water & Sanitation</option>
            <option value="Road & Traffic">Road & Traffic</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Waste Management">Waste Management</option>
            <option value="Public Safety">Public Safety</option>
            <option value="Public Facilities">Public Facilities</option>
          </select>
        </div>

        {/* Date filter */}
        <div className='search-box'>
          <span className='icon'><FontAwesomeIcon icon={faCalendarDays} className='login-icon' /></span>
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          >
            <option value="">All Dates</option>
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
          </select>
        </div>

        {/* Search by keyword */}
        <div className='keyword-box'>
          <span className='icon'><FontAwesomeIcon icon={faSearch} className='login-icon' /></span>
          <input
            type="text"
            placeholder="Search keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredPosts.map((post) => (
        <div className="newsfeed-item" key={post.issueID}>
          <div className="newsfeed-header">
            <img className="profile-pic" src={profilePic} alt={person} />
            <div className="post-details">
              <span className="username">{reporterNames[post.residentID] || `User ${post.residentID}`}</span>
              <span className="category">{post.issueCategory}</span>
              <span className="timestamp">{getFormattedTimestamp(post.dateReported)}</span>
            </div>
          </div>
          <div className="issue-description">
            {post.description}
          </div>

          {post.issue_image_path && (
            <img className="issue-image" src={getImageUrl(post.issue_image_path)} alt="Issue" />
          )}

          <div className="verification-section">
            <button
              className="verification-button"
              onClick={() => handleVerification(post.issueID)}
            >
              <FontAwesomeIcon icon={faCheckDouble} className="verify-icon" />
            </button>
            <span className="verification-count">{verificationCounts[post.issueID]}</span>
            <div className="location-line">
              <span className="location-icon"><FontAwesomeIcon icon={faLocationDot} /></span>
              <span className="address">
                {post.location ? post.location.split(',').slice(0, 2).join(', ') : ''}
              </span>
            </div>

            <div className="status-line">
              Status: <p className={`status ${getStatusClass(verificationCounts[post.issueID])}`}>{getStatus(verificationCounts[post.issueID])}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Newsfeed;
