import './Login.css'
import React from 'react'
import logo from './assets/Group 1.png'
import topright from './assets/topright.png';
import bottomleft from './assets/bottomleft.png';
import bottomright from './assets/bottomright.png';
import google from './assets/google.png';
//import bottomright2 from './assets/Vector 2.png';

function Login(){


    return <>
    <div className="container">
      <div id="left">
        <div>
            <img id="logo" src={logo} alt="Logo" />
        </div>
        
            <img id="topright" src={topright} alt="" />
            <img id="bottomleft" src={bottomleft} alt="" />
            <img id="bottomright" src={bottomright} alt="" />
      </div>
      <div id="right">
        <h1>Welcome to Scope</h1>
        <p id='discription'>SCOPE allows professors to securely swap class slots with mutual approval, ensuring transparency, minimizing conflicts, and providing real-time updates.</p>
        
        <button type="submit" id='google'>
          <img src={google} alt="google logo" />
          <span>Continue with google</span>
        </button>

        <hr />

        <input type="text" placeholder="Enter Email..." />
        <div id='password'>   
        <input type="text" placeholder="Enter Password..." />
        <p>
          <a href="#" className="textbut">Forgot Password?</a>
        </p>
        </div>
        
        <button type="submit" id='submit'>Login</button>
        <p >
        Can't sign in? Try <a href="#" className="textbut">resetting your password</a> or <a href="#" className="textbut">contact us</a> for assistance.
        </p>
      </div>
    </div>
    </>
}

export default Login