import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Login/Login.jsx'

function App() {
    const [user, setUser] = useState(null);

    const handleUserAdded = (userData) => {
        setUser(userData);
    };

    return (
        <Routes>
            <Route path="/" element={<Login onUserAdded={handleUserAdded} />} />
            <Route path="/users" element={<div>Users Page - Welcome {user?.Fullname}</div>} />
        </Routes>
    )
}

export default App
