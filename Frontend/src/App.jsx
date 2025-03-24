import { useState } from 'react'
import './App.css'
import Login from './Login.jsx'

function App() {

    const [name,setname] = useState("wassim");

    return<>
    <Login />
    </>
}

export default App
