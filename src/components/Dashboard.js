 // Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';
import Table from './Table';  // Import the Table component

const Dashboard = () => {
    const [applications, setApplications] = useState([]);
    const [users, setUsers] = useState([]);
    const [hrs, setHrs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [internships, setInternships] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTable, setActiveTable] = useState('');  // Track active table

    const fetchData = async () => {
        try {
            const response = await axios.get('https://a-a6rx.onrender.com/dashboard');
            setApplications(response.data.applications);
            setUsers(response.data.users);
            setHrs(response.data.hrs);
            setJobs(response.data.jobs);
            setInternships(response.data.internships);
        } catch (err) {
            toast.error('Error fetching data');
        }
    };

    const handleDelete = async (type, id) => {
        try {
            await axios.delete(`https://a-a6rx.onrender.com/dashboard/${type}/${id}`);
            toast.success(`${type} deleted successfully`);
            fetchData(); // Refresh data after deletion
        } catch (err) {
            toast.error('Error deleting record');
        }
    };

    const filterData = (data) => {
        return data.filter((item) =>
            Object.values(item).some((value) =>
                value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <ToastContainer />
            <h1>Dashboard</h1>

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Buttons to toggle tables */}
            <div className="button-container">
                <button onClick={() => setActiveTable('applications')}>Applications</button>
                <button onClick={() => setActiveTable('users')}>Users</button>
                <button onClick={() => setActiveTable('hrs')}>HRs</button>
                <button onClick={() => setActiveTable('jobs')}>Jobs</button>
                <button onClick={() => setActiveTable('internships')}>Internships</button>
            </div>

            {/* Conditionally render the tables based on activeTable */}
            {activeTable === 'applications' && (
                <section>
                    <h2>Applications</h2>
                    {applications.length > 0 ? (
                        <Table data={filterData(applications)} type="application" onDelete={handleDelete} />
                    ) : (
                        <p>No applications found</p>
                    )}
                </section>
            )}

            {activeTable === 'users' && (
                <section>
                    <h2>Users</h2>
                    {users.length > 0 ? (
                        <Table data={filterData(users)} type="user" onDelete={handleDelete} />
                    ) : (
                        <p>No users found</p>
                    )}
                </section>
            )}

            {activeTable === 'hrs' && (
                <section>
                    <h2>HRs</h2>
                    {hrs.length > 0 ? (
                        <Table data={filterData(hrs)} type="hr" onDelete={handleDelete} />
                    ) : (
                        <p>No HRs found</p>
                    )}
                </section>
            )}

            {activeTable === 'jobs' && (
                <section>
                    <h2>Jobs</h2>
                    {jobs.length > 0 ? (
                        <Table data={filterData(jobs)} type="jobs" onDelete={handleDelete} />
                    ) : (
                        <p>No jobs found</p>
                    )}
                </section>
            )}

            {activeTable === 'internships' && (
                <section>
                    <h2>Internships</h2>
                    {internships.length > 0 ? (
                        <Table data={filterData(internships)} type="internships" onDelete={handleDelete} />
                    ) : (
                        <p>No internships found</p>
                    )}
                </section>
            )}
        </div>
    );
};

export default Dashboard;
