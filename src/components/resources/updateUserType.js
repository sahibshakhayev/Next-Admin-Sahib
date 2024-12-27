// src/UpdateUserType.js
import React, { useState } from 'react';
import { useNotify, useRefresh } from 'react-admin';

const UpdateUserType = () => {
    const [userId, setUserId] = useState('');
    const [userType, setUserType] = useState('');
    const notify = useNotify();
    const refresh = useRefresh();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('access_token');
        const url = `https://your-backend-url.com/api/admin/users/${userId}/update-type`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ user_type: userType })
        });

        if (response.ok) {
            notify('User type updated successfully', { type: 'success' });
            refresh();
        } else {
            notify('Failed to update user type', { type: 'error' });
        }
    };

    return (
        <div style={{ padding: '1em' }}>
            <h2>Update User Type</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID: </label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>New User Type: </label>
                    <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        required
                    >
                        <option value="">Select a user type</option>
                        <option value="0">Admin</option>
                        <option value="1">Seller</option>
                        <option value="2">Customer</option>
                    </select>
                </div>
                <button type="submit">Update User Type</button>
            </form>
        </div>
    );
};

export default UpdateUserType;
