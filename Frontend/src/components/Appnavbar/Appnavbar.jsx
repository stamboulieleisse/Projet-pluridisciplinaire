import React, { useState, useEffect, useRef } from "react";
import "./appnavbar.css";
import logo from '../../assets/navlogo.png';
import profile from '../../assets/profile.png';

import icon1 from '../../assets/navicons/icon1.svg';
import icon2 from '../../assets/navicons/icon2.svg';
import icon3 from '../../assets/navicons/icon3.svg';
import icon4 from '../../assets/navicons/icon4.svg';



function Appnavbar(){
    const [activeLink, setActiveLink] = useState("home");
            const [indicatorPosition, setIndicatorPosition] = useState(0);
            const [indicatorwidth, setindicatorwidth] = useState(50);
            const navRef = useRef(null);
          
            const handleLinkClick = (link, index) => {
              setActiveLink(link);
              updateIndicatorPosition(index);
            };
          
            const updateIndicatorPosition = (index) => {
              if (navRef.current) {
                const navItems = navRef.current.querySelectorAll("li");
                if (navItems[index]) {
                  const item = navItems[index];
                  const rect = item.getBoundingClientRect();
                  setIndicatorPosition(rect.left);
                  setindicatorwidth(rect.width ); 
                }
              }
            };
          
            useEffect(() => {
              const initialIndex = ["home", "Pending Requests", "Incoming Requests", "Time Swap"].indexOf(activeLink);
              updateIndicatorPosition(initialIndex);
          
              const handleResize = () => {
                const currentIndex = ["home", "Pending Requests", "Incoming Requests", "Time Swap"].indexOf(activeLink);
                updateIndicatorPosition(currentIndex);
              };
          
              window.addEventListener('resize', handleResize);
              return () => {
                window.removeEventListener('resize', handleResize);
              };
            }, [activeLink]);
          
            return (
              <div className="navbar">
                <div className="container">
                    <button className="website">
                        <img src={logo} alt="scope logo" className="logo" />
                    </button>
                
          
                <div className="nav" ref={navRef}>
                  <ul>
                    {["home", "Pending Requests", "Incoming Requests", "Time Swap"].map((link, index) => (
                      <li
                        key={link}
                        className={activeLink === link ? "active" : ""}
                        onClick={() => handleLinkClick(link, index)}
                      >
                        <a href={`#${link}`}>{link.charAt(0).toUpperCase() + link.slice(1)}</a>
                      </li>
                    ))}
                  </ul>
                  <div
                    className="indicator"
                    style={{ left: `${indicatorPosition}px`, width: `${indicatorwidth}px` }}
                  ></div>
                </div>
                    
                    <div className="iconed">
                        <button>
                          <img src={icon1} alt="profile inside div1" />
                        </button>
                        <button>
                          <img src={icon2} alt="profile inside div2" />
                        </button>
                        <button>
                          <img src={icon3} alt="profile inside div3" />
                        </button>
                        <button>
                          <img src={icon4} alt="profile inside div4" />
                        </button>
                    </div>
                <button id="login">Login</button>
              </div>
              </div>
            );
            }


export default Appnavbar;