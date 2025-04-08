import './reset.css'
import logo from '../../assets/Group 1.png'
function Reset() {

    return<>
        <div className="container">
              <div id="left">
                <img src={logo} alt="" id='logo' />
                <button id='home'>Home</button>
                <img src="" alt="" id='topleft' />
              </div>
            

            <div id='right'>
                <h1>Reset Password</h1>
                <p>Enter your email to receive a password reset link.</p>
                <input type="text" placeholder='University or personal email' id='email'/>
                <button id='send'>Send Reset link</button>
                <p id='contactus'>Having a problem? <a href="" id='contact'>contact Support</a> for assistance.</p>
            </div>

        </div>
    </>
}
export default Reset;