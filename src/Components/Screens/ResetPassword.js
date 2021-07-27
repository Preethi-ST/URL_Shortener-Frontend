import { useHistory,useParams } from 'react-router'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'

import Mail from '../../Images/Secure.png'
import FormControl from '../Formik/FormControl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ResetPassword() {
    const style = {
        display: "block",
        margin: "0 auto",
        width:"100px",
        height: "100px"
}
    const history = useHistory();
    const URLToken = useParams();
    const initialValues = {
        password : '',
        confirmpassword : ''
    }
    const validationSchema = Yup.object({
        password : Yup.string()
            .required('Enter your password')
            .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
        confirmpassword : Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })
    const onSubmit = async (values,onSubmitProps) => {
        const {password} = values
        console.log(URLToken)
        let result,tostify;
        try{
            result = await axios.put(`https://server-shortly.herokuapp.com/api/auth/reset-password/${URLToken.token}`,{password})
            console.log(result)
            result = result.data;
        }catch(error){
            console.log(error.response)
            result = error.response.data
        }
        tostify = result.success ? toast.success : toast.error
        let message = result.success ? result.message : result.error;
        console.log(message);
        console.log(tostify)
        tostify(message, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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
        <div className = "container-fluid">
            <div className="card mx-auto shadow-lg"  style={{backgroundImage:"linear-gradient(to bottom right,  rgb(249, 229, 252) , rgb(169, 169, 247))"}}>
            <div className="card-body">
                <h5 className="card-title  text-center font-heading">Reset Password</h5>
                <img src={Mail} style={style}></img>
                <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} >
                    {
                        (formik) => (
                            <Form>
                                <FormControl control = 'input' type= 'password' label = 'Password' name='password' />
                                <FormControl control = 'input' type= 'password' label = 'Confirm Password' name='confirmpassword' />
                                <button type='submit' className='my-4 btn btn-block btn-success'>Reset</button>
                            </Form>
                        )
                    }
                </Formik>
                <span className='small'>
                    Remember Password?    
                    
                    <Link to='/login' style={{ textDecoration: 'none' }}>    Login</Link> 
                </span>
            </div>
            </div>
        </div>
        </>
    )
}

export default ResetPassword
