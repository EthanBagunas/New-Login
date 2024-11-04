import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './design/Profile.css';
import defpic from './design/Default.jpg';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth'; 
import Navbar from '../Navbar';

const Profile = () => {
  const { auth } = useAuth();
  const id = auth?.id;
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  
  // State for change password modal
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('position', position);
    formData.append('description', description);
    formData.append('id', id); // Add username to FormData

    // Check if a profile picture is selected
    if (profilePic) {
      formData.append('profilePic', profilePic); // Append the file
    } else {
      console.warn('No profile picture selected.'); // Log a warning if no file is chosen
    }

    // Log the data being sent
    console.log('Form Data:', {
      firstName,
      lastName,
      position,
      description,
      profilePic: profilePic ? profilePic.name : null, // Only log name for clarity
      id: id,
    });

    try {
      const response = await axios.post('/api/updateProf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${auth?.accessToken}`, // Pass the access token for authorization
        }
      });

      // Log the response
      console.log('Response:', response);

      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert(response.data.message || 'Error updating profile');
      }
    } catch (error) {
      console.error('Error:', error); // Log the error
      alert('An error occurred while updating the profile');
    }
  };

  const handleCancel = () => {
    alert('Changes canceled');
  };

  const handleChangePassword = async () => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('currentPassword', currentPassword);
    formData.append('newPassword', newPassword);
    formData.append('confirmPassword', confirmPassword);
  
    // Log the values to check
    console.log('id:', id);
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
  
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }
  
    try {
      const response = await axios.post('/passChange', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.accessToken}`,
        },
      });
  
      console.log('Response:', response);
      if (response.status === 200) {
        alert('Password changed successfully!');
        setIsChangePasswordOpen(false); // Close modal after successful change
      } else {
        alert(response.data.message || 'Error changing password');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while changing the password';
      alert(errorMessage);
    }
  };
  

  return (
    <div>
      <Navbar/> 

      <div className="account-preferences-page">
        <div className="settings-sidebar">
          <ul>
            <li className="active">Account preferences</li>
            <li>Sign in & security</li>
            <li onClick={() => setIsChangePasswordOpen(true)} style={{ cursor: 'pointer' }}>Change Password</li>
            <li>Data privacy</li>
            <li>Advertising data</li>
            <li>Notifications</li>
            <li onClick={() => navigate('/*')} style={{ cursor: 'pointer' }}>General Settings</li>
          </ul>
        </div>

        <div className="account-preferences-container">
          <div className="profile-picture">
            {profilePic ? (
              <img src={URL.createObjectURL(profilePic)} alt="Profile" />
            ) : (
              <img src={defpic} alt="Profile" />
            )}
            <div className="picture-buttons">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="profilePicInput"
                style={{ display: 'none' }}
              />
              <button className="btn-change" onClick={() => document.getElementById('profilePicInput').click()}>
                Change
              </button>
              <button className="btn-remove" onClick={() => setProfilePic(null)}>
                Remove
              </button>
            </div>
          </div>

          <div className="form-container">
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Current position</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="form-buttons">
              <button className="btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn-update" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Change Password Modal */}
        {isChangePasswordOpen && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <h2>Change Password</h2>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="modal-buttons">
                <button className="btn-cancel" onClick={() => setIsChangePasswordOpen(false)}>
                  Cancel
                </button>
                <button className="btn-update" onClick={handleChangePassword}>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
