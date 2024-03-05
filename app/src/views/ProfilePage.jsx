import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData } from '../reducers/profileReducer';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profileData = useSelector(state => state.profile.profileData);
  const accounts = useSelector(state => state.profile.accounts);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please login.');
          return;
        }
        const response = await axios.post('/api/v1/user/profile', {}, {
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{profileData.firstName} {profileData.lastName}!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
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
