import React,{useContext} from 'react'
import './Navbar.css';
import logo from './logo.png'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router';
//Custom Imports
import { userContext } from '../Context/AuthProvider'

function Navbar() {
    const {loggedIn,setLoggedIn} = useContext(userContext)
    const history = useHistory()
    const Logout = () => {
        localStorage.removeItem('authToken');
        setLoggedIn(false)
        history.push('/homepage')
    }
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-light">
           <img className="brand-img" src={logo} alt = "logo" />
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav" style={{fontWeight:"bolder",color:"hotpink"}}>
                <ul className="navbar-nav ml-auto" >
                    {
                        loggedIn === false 
                        &&
                        <>
                        <li className="nav-item pr-3 active">
                            <Link className="nav-link  text-info  text-center" to="/signup">
                                <i className="fas fa-user"></i>
                                <span className="pl-2">SignUp</span>
                            </Link>
                        </li>
                        <li className="nav-item pr-3">
                            <Link className="nav-link text-info text-center" to="/login">
                                <i className="fad fa-sign-in-alt"></i>
                                <span className="pl-2">Sign In</span>
                            </Link>
                        </li>
                        </>
                    }
                    {
                        loggedIn === true &&
                        <>
                        <li className="nav-item pr-3 active">
                            <Link className="nav-link  text-info  text-center" to="/dashboard">
                                <i className="fad fa-chart-bar"></i>
                                <span className="pl-2">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item pr-3">
                            <Link className="nav-link text-info text-center" to="/shortner">
                                <i className="fad fa-sort-size-down"></i>
                                <span className="pl-2">Shortner</span>
                            </Link>
                        </li>
                        <li className="nav-item pr-3">
                            <Link className="nav-link text-info  text-center" to="/views">
                            <i className="fad fa-eye"></i>
                            <span className="pl-2">Views</span></Link>
                        </li>
                        <li className="nav-item pr-3">
                            <button className = "btn btn-danger btn-sm" onClick = {Logout}>Logout</button>
                        </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
