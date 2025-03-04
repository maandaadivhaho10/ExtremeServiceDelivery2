import React, { useState, useRef, useEffect } from "react";
import "../../../scss/Admin/addemployee.scss";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faKey,
  faIdBadge,
  faPhone,
  faBuilding,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const Forms = () => {
  const manager = useRef();
  const admin = useRef();
  const [activeForm, setActiveForm] = useState("admin");
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleFormSwitch = (formType) => {
    setActiveForm(formType);
  };

  //Manager and Supervisor
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Step 1: Handle Email Sending
    emailjs
      .sendForm("service_jiykck6", "template_awzyeea", manager.current, {
        publicKey: "m2x_uR6CdDFeKNKZW",
      })
      .then(
        () => {
          console.log("Email sent successfully!");
          // Navigate after successful email submission (optional)
        },
        (error) => {
          console.log("Email sending failed...", error.text);
        }
      );

    // Step 2: Handle Form Submission
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:5000/api/auth/register/municipal-employer",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        const message = response.data.message || "Form submitted successfully!";
        alert(message);
        // Navigate after successful form submission (optional)
        navigate("/adminhome");
      })
      .catch((error) => {
        console.error("There was an error submitting the form!", error);
        alert("Error submitting the form. Please try again.");
      });
  };

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/updates/departments"
        );
        setDepartments(response.data);
      } catch (error) {
        console.error(error);
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred while fetching issues.");
        }
      }
    };

    fetchDepartment();
  }, []);
  //Admin
  const handleSubmit = (e) => {
    e.preventDefault();

    // Step 1: Handle Email Sending
    emailjs
      .sendForm("service_jiykck6", "template_awzyeea", admin.current, {
        publicKey: "m2x_uR6CdDFeKNKZW",
      })
      .then(
        () => {
          console.log("Email sent successfully!");
          // Navigate after successful email submission (optional)
        },
        (error) => {
          console.log("Email sending failed...", error.text);
        }
      );

    // Step 2: Handle Form Submission
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:5000/api/auth/register/municipal-employer",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        const message = response.data.message || "Form submitted successfully!";
        alert(message);
        // Navigate after successful form submission (optional)
        navigate("/adminhome");
      })
      .catch((error) => {
        console.error("There was an error submitting the form!", error);
        alert("Error submitting the form. Please try again.");
      });
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <div className="form-container">
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="back-button"
        onClick={() => window.history.back()} // Go back to the previous page
      />
      <div className="back-button-container"></div>
      <nav>
        <button onClick={() => handleFormSwitch("admin")}>Admin</button>
        <button onClick={() => handleFormSwitch("manager")}>
          Add Employee
        </button>
      </nav>

      {activeForm === "admin" && (
        <form
          ref={admin}
          id="admin-forms"
          onSubmit={(e) => handleSubmit(e, "admin")}
        >
          <h2>Admin Form</h2>
          <label htmlFor="admin-name">
            <FontAwesomeIcon icon={faUser} /> Name:
          </label>
          <input
            type="text"
            id="admin-name"
            name="name"
            placeholder="Name"
            required
          />

          <label htmlFor="admin-email">
            <FontAwesomeIcon icon={faEnvelope} /> Email:
          </label>
          <input
            type="email"
            id="admin-email"
            name="email"
            placeholder="Email"
            required
          />

          <label htmlFor="admin-password">
            <FontAwesomeIcon icon={faKey} /> Password:
          </label>
          <input
            type="password"
            id="admin-password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {activeForm === "manager" && (
        <form
          ref={manager}
          id="manager-form"
          onSubmit={(e) => handleFormSubmit(e, "municipal-employer")}
        >
          <h2>Add Employee</h2>
          <label htmlFor="manager-empID">
            <FontAwesomeIcon icon={faIdBadge} /> Employee ID:
          </label>
          <input
            type="text"
            id="manager-empID"
            name="empID"
            placeholder="Employee ID"
            required
          />

          <label htmlFor="manager-name">
            <FontAwesomeIcon icon={faUser} /> Name:
          </label>
          <input
            type="text"
            id="manager-name"
            name="name"
            placeholder="Name"
            required
          />

          <label htmlFor="manager-surname">
            <FontAwesomeIcon icon={faUser} /> Surname:
          </label>
          <input
            type="text"
            id="manager-surname"
            name="surname"
            placeholder="Surname"
            required
          />

          <label htmlFor="manager-email">
            <FontAwesomeIcon icon={faEnvelope} /> Email:
          </label>
          <input
            type="email"
            id="manager-email"
            name="email"
            placeholder="Email"
            required
          />

          <label htmlFor="manager-contact">
            <FontAwesomeIcon icon={faPhone} /> Contact:
          </label>
          <input
            type="text"
            id="manager-contact"
            name="contact"
            placeholder="Contact"
            required
          />

          <label htmlFor="manager-deptID">
            <FontAwesomeIcon icon={faBuilding} /> Department ID:
          </label>
          {/* <input type="text" id="manager-deptID" name="deptID" placeholder='Department ID' required /> */}

          <select
            id="departmentSelect"
            className="form-control"
            name="deptID"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            required
          >
            <option value="">Choose...</option>
            {departments.map((department) => (
              <option key={department.deptID} value={department.deptID}>
                {department.dept_name} {/* Display the department name */}
              </option>
            ))}
          </select>

          <label htmlFor="manager-deptID">Role</label>
          <select id="role" name="roleCategory">
            <option value="" disabled selected hidden>
              Select Role
            </option>
            <option value="MANAGER">Manager</option>
            <option value="SUPERVISOR">Supervisor</option>
          </select>

          <label htmlFor="manager-password">
            <FontAwesomeIcon icon={faKey} /> Password:
          </label>
          <input
            type="password"
            id="manager-password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Forms;
