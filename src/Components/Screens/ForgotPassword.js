import { useHistory } from 'react-router'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'
import Mail from '../../Images/Secure.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControl from '../Formik/FormControl'

function ForgotPassword() {
    const style = {
            display: "block",
            margin: "0 auto",
            width:"100px",
            height: "100px"
    }
    const history = useHistory();
    const initialValues = {
        email : ''
    }
    const validationSchema = Yup.object({
        email : Yup.string().email('Enter valid email').required('Email is required')
    })
    const onSubmit = async (values,onSubmitProps) => {
        const {email} = values
        let result,tostify;
        try{
            result = await axios.post(`https://server-shortly.herokuapp.com/api/auth/forgot-password`,{email})
            result = result.data;
        }catch(error){
            console.log(error.response)
            result = error.response.data
        }
        tostify = result.success ? toast.success : toast.error
        let message = result.success ? result.message : result.error;
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
        <div className="container-fluid">
            <div className="card mx-auto shadow-lg" style={{backgroundImage:"linear-gradient(to bottom right,  rgb(249, 229, 252) , rgb(169, 169, 247))"}}>
            <div className="card-body">
                <h5 className="card-title  text-center">Forgot Password</h5>
                <img src={Mail} style={style}></img>
                {/* <p className={`${error? 'text-success':'text-danger'} small text-center`}>{message}</p> */}
                <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} >
                    {
                        (formik) => (
                            <Form>
                                <FormControl control = 'input' type= 'email' label = 'Email' name='email' />
                                <button type='submit' className='my-4 btn btn-block btn-success'>Send Mail</button>
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

export default ForgotPassword
