import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth'; 
import defpic from './design/Default.jpg';
import './design/ProfilePage.css';

import Navbar from '../Navbar';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({});
  const axiosPrivate = useAxiosPrivate(); // Use the authenticated axios instance
  const { auth } = useAuth(); // Access the auth context to get the user id

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth?.id) { // Ensure the id exists in the auth context
        try {
          const response = await axiosPrivate.get(`/ProfilePage/${auth.id}`); // Use the id from the token
          setProfileData(response.data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchProfile();
  }, [auth?.id, axiosPrivate]);

  return (
    <div>
      <Navbar/> 
   
    <div className="profile-page">
      <main className="profile-main-content">
        <div className="profile-container">
          {/* Profile Picture */}
          <div className="profile-picture">
            <img
              src={profileData.profilePic ? profileData.profilePic : defpic} // Use defpic as default image
              alt="Profile"
              onError={(e) => { e.target.src = defpic; }}
            />
          </div>

          {/* Profile Information */}
          <div className="profile-info">
            <h2>{profileData.firstName} {profileData.lastName}</h2>
            <h3>{profileData.position}</h3>
            <p>{profileData.description}</p>
          </div>
        </div>
      </main>

      <footer className="profile-footer">
        <p>&copy; 2024 My Profile Page. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
};

export default ProfilePage;
