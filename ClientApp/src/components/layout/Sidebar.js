import React, { useState } from 'react';
import {Link} from "react-router-dom";

// Logo
import logo from '../../assets/watt.svg'

// Fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faCheckSquare, faCalendarAlt, faList, faCog, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';


const Sidebar = (props) => {
    // Collapse
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
            {/* Toggler */}
            <span
                className="toggler"
                onClick={toggle}
            >
                <FontAwesomeIcon icon={faBars} />
            </span>

            {/* Heading */}
            <img src={logo} alt="WATT Logo"/>
            <h1>Web App of the Titans</h1>
            <hr/>

            {/* Nav */}
            <span className="item">
                <Link to="/utilities">
                    <FontAwesomeIcon icon={faWrench} />
                    <span>Utilities</span>
                </Link>
            </span>
            <span className="item">
                <Link to="/grades">
                    <FontAwesomeIcon icon={faCheckSquare} />
                    <span>Grades</span>
                </Link>
            </span>
            <span className="item">
                <Link to="/">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>Schedule</span>
                </Link>
            </span>
            <span className="item">
                <Link to="/lists">
                    <FontAwesomeIcon icon={faList} className="icon"/>
                    <span>Lists</span>
                </Link>
            </span>
            <span className="item">
                <Link to="/options">
                    <FontAwesomeIcon icon={faCog} />
                    <span>Options</span>
                </Link>
            </span>

            {/* Bottom Account Status Button */}
            <span className="bottom">
                <hr/>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Sign Out</span>
            </span>
        </div>
    )
}

export default Sidebar;