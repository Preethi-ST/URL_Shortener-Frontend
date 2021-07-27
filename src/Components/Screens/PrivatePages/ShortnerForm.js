import React,{useState,useContext} from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from '../../Context/AuthProvider';

function ShortnerForm() {
    const {loggedIn,setLoggedIn,getLoggedInState} = useContext(userContext)
    const [url,seturl] = useState(undefined)
    const initialValues = {
        longurl : ''
    }
    const validationSchema =Yup.object().shape({
        longurl: Yup
          .string()
          .url('Enter valid URL')
          .required('Enter URL!')
    })
    const onSubmit = async (values) => {
        let token = localStorage.getItem('authToken')

        const {longurl} = values
        try{
            if(token){
                const result = await axios.post(`https://server-shortly.herokuapp.com/api/private/shorten`,{longURL : longurl},
                {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                    }
                }) 
                seturl(result.data.url)
            }else{
                toast.error("Something wen't wrong", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setTimeout(()=>{
                    localStorage.removeItem('authToken')
                    setLoggedIn(false);
                },2000)
            }
        }catch(error){
            console.log(error.response)
            if(error.response.data.message){
                toast.error("Invalid URL", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }else{
                toast.error("Something wen't wrong", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setTimeout(()=>{
                    localStorage.removeItem('authToken')
                    setLoggedIn(false);
                },2000)
            }
            
        }
        
    }
    const clickHandler = async (shortUrl) => {
        const token = localStorage.getItem('authToken')
            try{
                const result = await axios.get(`${shortUrl}`,
                {
                    headers: {
                    Authorization: `Bearer ${token}`
                    }
                }) 
            }catch(error){
                console.log(error)
            
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
            <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit = {onSubmit} >
                {
                    (formik) => (
                        <Form>
                            <div className="form-row align-items-center">
                                <div className="col-sm-12 col-md-10 my-1">
                                    <Field type="text" className="form-control" name = 'longurl' id='longurl' placeholder="longURL" />
                                    <ErrorMessage name = 'longurl' className = 'text-danger' />
                                </div>
                                <div className="col-auto my-1">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </Form>
                    )
                }
            </Formik>
            <>
            {
                url 
                ?
                <div className = 'container bg-white mt-5 p-3'>
                    <a href={url.shortUrl} target='_blank'>{url.shortUrl}</a>
                </div>
                :
                ''
            }
            </>
        </>
    )
}

export default ShortnerForm
