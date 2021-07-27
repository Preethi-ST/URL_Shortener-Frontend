import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ActivateAccount() {
    const history = useHistory()
    const token = useParams();
    const [activate,setActivate] = useState(false)
    const Activate = async () => {
        try{
            const result = await axios.get(`https://server-shortly.herokuapp.com/api/auth/activate-account/${token.token}`)
            const tostify = result.data.success ? toast.success : toast.error
            result.data.success ? setActivate(true) : console.log(result.data.success)
            tostify(result.data.message, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }catch(error){
            console.log(error);
            toast.error('Link might be expired or Invalid link', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
            <div className='container-fluid center-content mt-3'>
                <h4 style={{color:'rgb(86, 3, 88)',marginBottom : "20px"}}>Thanks for your time and interest in registering to our application!</h4>
                {
                    !activate && token
                    ?
                    <>
                    <p> Click on Activate to activate your account</p>
                    <button className="btn btn-primary" onClick={Activate}>Activate</button>
                    </>
                    :
                    <>
                        <h2 style={{color : 'whitesmoke'}}>Your account has been Activated!</h2>
                        <button className="btn btn-success" onClick={()=>history.push('/login')}>Login to continue</button>
                    </>
                }
                
            </div>
        </>
    )
}

export default ActivateAccount
