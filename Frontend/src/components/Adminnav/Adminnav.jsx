import React, { useState, useEffect, useRef } from "react";
import "./adminnavbar.css";
import logo from '../../assets/navlogo.png';
import profile from '../../assets/profile.png';

import icon1 from '../../assets/navicons/icon1.svg';
import icon2 from '../../assets/navicons/icon2.svg';

function Adminnav() {
  const [activeLink, setActiveLink] = useState("Dashboard");
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
        setindicatorwidth(rect.width);
      }
    }
  };

  useEffect(() => {
    const initialIndex = ["Dashboard", "User & Admin", "Requests"].indexOf(activeLink);
    updateIndicatorPosition(initialIndex);

    const handleResize = () => {
      const currentIndex = ["Dashboard", "User & Admin", "Requests"].indexOf(activeLink);
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
            {["Dashboard", "User & Admin", "Requests"].map((link, index) => (
              <li
                key={link}
                className={activeLink === link ? "active" : ""}
                onClick={() => handleLinkClick(link, index)}
              >
                <a href={`#${link}`}>{link}</a>
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
        </div>
        <button id="login">Login</button>
      </div>
    </div>
  );
}

export default Adminnav;
