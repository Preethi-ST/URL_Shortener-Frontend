import React,{useContext} from 'react'
import {BrowserRouter,Switch,Route, Redirect} from 'react-router-dom'
import { useHistory } from 'react-router'

//custom imports
import Navbar from '../Layouts/Navbar'
import Footer from '../Layouts/Footer'

import HomePage from '../Screens/HomePage'
import Login from '../Screens/Login'
import Register from '../Screens/Register'
import ForgotPassword from '../Screens/ForgotPassword'
import ResetPassword from '../Screens/ResetPassword'
import ActivateAccount from '../Screens/ActivateAccount'
import Dashboard from '../Screens/PrivatePages/Dashboard'
import Shortner from '../Screens/PrivatePages/Shortner';
import URLViews from '../Screens/PrivatePages/URLViews';

import { userContext } from '../Context/AuthProvider';

function Router() {
    const {loggedIn,setLoggedIn} = useContext(userContext)
    const history = useHistory()
    return (
        <>
        <BrowserRouter basename='/Shortly'>
            <Navbar />
            
            <div className="section">
                <Switch>
                    <Route path = '/homepage' component = {HomePage} />
                    <Route exact path = '/login' component = {Login} />
                    <Route exact path = '/activateaccount/:token' component = {ActivateAccount} />
                    <Route exact path = '/signup' component = {Register} />
                    <Route exact path = '/forgotpassword' component = {ForgotPassword} />
                    <Route exact path = '/resetpassword/:token' component = {ResetPassword} />
                    
                    {
                        loggedIn === true 
                        ?
                            <Switch> 
                                <Route exact path = '/dashboard' component = {Dashboard} />
                                <Route exact path = '/shortner' component = {Shortner} />
                                <Route exact path = '/views' component = {URLViews} />
                            </Switch>
                        : 
                        ""
                   
                    } 
                    
                    <Route path = '/'>
                        <Redirect to = '/homepage' />
                    </Route>
                           
                </Switch>
                
            </div>
            <Footer /> 
        </BrowserRouter>
        
        </>
    )
}

export default Router
