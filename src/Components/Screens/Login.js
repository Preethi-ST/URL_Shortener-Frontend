import {useContext} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Custom Imports
import FormControl from '../Formik/FormControl'
import { userContext } from '../Context/AuthProvider'

function Login() {
    const {loggedIn,setLoggedIn,getLoggedInState}=useContext(userContext)
    const history = useHistory();
    const initialValues = {
        email : '',
        password : ''
    }
    const validationSchema = Yup.object({
        email : Yup.string().email('Enter valid email').required('Email is required'),
        password : Yup.string().required('Please Enter your password')       
    })
    const onSubmit = async (values,onSubmitProps) => {
        const {email,password} = values;
        let result,tostify;
        try{
            result = await axios.post(`https://server-shortly.herokuapp.com/api/auth/login`,{email,password})
            localStorage.setItem('authToken',result.data.token)
            setLoggedIn(true)
            tostify = result.data.success ? toast.success : toast.error
            tostify(result.data.message, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            history.push('/dashboard')
        }catch(error){
            console.log(error.response)
            result = error.response
            toast.error(result.data.error, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        onSubmitProps.resetForm();
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
        <div className="container-fluid mt-4">
            <div className="row justify-content-center">
                <div className="col-auto mb-3">
                    <div className="card shadow-lg" style={{backgroundImage:"linear-gradient(to bottom right,  rgb(249, 229, 252) , rgb(169, 169, 247))"}}>
                        <h5 className="card-title  text-center text-info">Login</h5>
                        <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} >
                            {
                                (formik) => (
                                    <Form>
                                        <FormControl control = 'input' type= 'email' label = 'Email' name='email' />
                                        <FormControl control = 'input' type= 'password' label = 'Password' name='password'  additional = 'forgotpassword' />
                                        <button type='submit' className='my-4 btn btn-block btn-success'>Login</button>
                                    </Form>
                                )
                            }
                        </Formik>
                        <span className='small'>
                            New Customer ?      
                            <Link to='/signup' style={{ textDecoration: 'none' }}>    Register</Link> 
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login
