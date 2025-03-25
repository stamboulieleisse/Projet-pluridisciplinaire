import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home'

function App() {
    const [user, setUser] = useState(null);

    const handleUserAdded = (userData) => {
        setUser(userData);
    };

    return (
        <Routes>
            <Route path="/login" element={<Login onUserAdded={handleUserAdded} />} />
            <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
    )
}

export default App
