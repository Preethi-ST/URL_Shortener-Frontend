import React,{useContext} from 'react'
import { useHistory } from 'react-router'
import * as Yup from 'yup'
import { Formik,Form } from 'formik'
import FormControl from '../../Formik/FormControl'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from '../../Context/AuthProvider'

function GetYearlyData({Yearly}) {
    const {loggedIn,setLoggedIn,getLoggedInState}=useContext(userContext)
    const history = useHistory();
    const yearoptions = [
        {key: '2021',value : 2021},
        {key: '2020',value : 2020}
    ]
    const initialValues = {
        year : ''
    }
    const validationSchema = Yup.object({
         year : Yup.number().required('choose year to proceed') 
    })
    const  onSubmit = async (values) => {
        let token = localStorage.getItem('authToken')
        if(!token){
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
                history.push('/login')
            },2000)
        }
        const {year} = values
        try{
            const result = await axios.get(`https://server-shortly.herokuapp.com/api/private/dashboard-year/${year}`,
            {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
                }
            }) 
            Yearly(result.data.data,year)

        }catch(error){
            console.log(error)
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
                history.push('/login')
            },2000)
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
            <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit = {onSubmit}>
                {
                    (formik) => (
                        <Form className='form-inline'>
                            <label htmlFor = 'Select Year' className="control-label text-white pr-4 usual">Select Year</label>
                            <FormControl control = 'select' name = 'year' options = {yearoptions} />
                            <button className='btn btn-sm btn-success ml-3' type='submit'>Get</button>
                        </Form>
                    )
                }
                
            </Formik>
        </>
    )
}

export default GetYearlyData
