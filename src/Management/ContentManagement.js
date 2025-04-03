import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from "../Components/Context/UserContext";
import "../Management/ContentManagement.css";

export function ContentManagement() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to toggle the logout dropdown
    const toggleLogout = () => setShowLogout(!showLogout);

    // Function to handle logout
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        setShowLogout(false);
    };

    // Function to navigate to change password page
    const handleChangePassword = (e) => {
        e.preventDefault();
        setShowLogout(false);
        navigate("/reset-password");
    };

    useEffect(() => {
        const fetchCompanyProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    navigate('/login');
                    return;
                }
                
                const response = await axios.get(process.env.REACT_APP_API_URL +'/company/get-company-profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                setCompanyProfile(response.data);
            } catch (error) {
                console.error("Error fetching company profile:", error);
                
                // If profile not found, redirect to create profile
                if (error.response && error.response.status === 404) {
                    navigate('/new-company-profile');
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchCompanyProfile();
    }, [navigate]);

    // If still loading, show a loading message
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="content-management-page">
         
            
            <div className="management-content">
                <h1>Content Management</h1>
                {companyProfile && (
                    <div className="company-details">
                        <h2>Your Company Details</h2>
                        <p><strong>Industry:</strong> {companyProfile.industry}</p>
                        <p><strong>Email:</strong> {companyProfile.email}</p>
                        <p><strong>Phone:</strong> {companyProfile.phone}</p>
                        {companyProfile.website && (
                            <p><strong>Website:</strong> {companyProfile.website}</p>
                        )}
                        {companyProfile.address && (
                            <p><strong>Address:</strong> {companyProfile.address}, {companyProfile.city}, {companyProfile.state}, {companyProfile.zip}, {companyProfile.country}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}