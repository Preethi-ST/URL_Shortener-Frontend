import axios from 'axios'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormControl from '../Formik/FormControl'
function Register() {
    const initialValues = {
        username : '',
        email : '',
        password : '',
        confirmpassword : ''
    }
    const validationSchema = Yup.object({
        username : Yup.string().required('Name is mandatory').min(5, 'Name must atleast contain 5 characters'),
        email : Yup.string().email('Enter valid email').required('Email is required'),
        password : Yup.string()
            .required('Please Enter your password')
            .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
        confirmpassword : Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })
    const onSubmit = async (values,onSubmitProps) => {
        const {username,email,password} = values;
        let tostify,result;
        try{
            result = await axios.post(`https://server-shortly.herokuapp.com/api/auth/register/`,{
                username,email,password
            })
            tostify = result.data.success ? toast.success : toast.error
            result = result.data.message
            onSubmitProps.resetForm();
        }catch(error){
            console.log(error.response);
            result = error.response.data.error;
            tostify = toast.error
        }
        tostify(result, {
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
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-auto mb-3">
                        <div className="card shadow-lg" style={{backgroundImage:"linear-gradient(to bottom right,  rgb(249, 229, 252) , rgb(169, 169, 247))"}}>
                            <h5 className="card-title  text-center text-info">Register</h5>
                            <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} >
                                {
                                    (formik) => (
                                        <Form>
                                            <FormControl control = 'input' type= 'text' label = 'UserName' name='username' />
                                            <FormControl control = 'input' type= 'email' label = 'Email' name='email' />
                                            <FormControl control = 'input' type= 'password' label = 'Password' name='password' />
                                            <FormControl control = 'input' type= 'password' label = 'Confirm Password' name='confirmpassword' />
                                            <button type='submit' className='my-4 btn btn-block btn-success'>Register</button>
                                        </Form>
                                    )
                                }
                            </Formik>
                            <span className='small'>
                                Already have an account?    
                                <Link to='/login' style={{ textDecoration: 'none' }}>    Login</Link> 
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register