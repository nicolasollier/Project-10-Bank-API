import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData } from '../reducers/profileReducer';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profileData = useSelector(state => state.profile.profileData);
  const accounts = useSelector(state => state.profile.accounts);

  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (profileData) {
      setFirstName(profileData.firstName);
      setLastName(profileData.lastName);
    }
  }, [profileData]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please login.');
          return;
        }
        const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setProfileData(response.data.body));
      } catch (error) {
        setError('Failed to load profile data. Please try again.');
      }
    };

    fetchProfileData();
  }, [dispatch]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:3001/api/v1/user/profile', { firstName, lastName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setProfileData(response.data.body));
      setEditMode(false);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        {editMode ? (
          <form onSubmit={handleEditSubmit}>
            <h1>Edit your firstname and lastname:</h1>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <button type="submit">Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        ) : (
          <>
            <h1>Welcome back<br />{profileData.firstName} {profileData.lastName}!</h1>
            <button className="edit-button" onClick={() => setEditMode(true)}>Edit Name</button>
          </>
        )}
      </div>

      {accounts.map((account) => (
        <section className="account" key={account.id}>
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank {account.type} ({account.id})</h3>
            <p className="account-amount">${account.balance.toFixed(2)}</p>
            <p className="account-amount-description">
              {account.type === "Credit Card" ? "Current Balance" : "Available Balance"}
            </p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
};

export default ProfilePage;

