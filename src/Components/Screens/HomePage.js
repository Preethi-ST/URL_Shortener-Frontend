import React from 'react'
import { useHistory } from 'react-router'
import urlImage from '../../Images/url-shortener.jpg'
function HomePage() {
    let history = useHistory();
    return (
        <div className = 'container center-content'>
            <div className="card text-dark mx-auto shadow-lg" style={{ width:"80%",marginTop:"130px"}}>
        <div className="row">
            <div className="col-md-5">
            <img src={urlImage} className="card-img text-center " alt="..."  /> 
            </div>
            <div className="col-md-7 my-auto">
                <h1 className= "display-4">Short links, big results</h1>
                <p className="display-6">A URL shortener built with powerful tools to help you grow and protect your brand.</p>
                <button className="btn btn-primary mb-1 mx-3" onClick={()=> history.push('/signup')}>Get Started for Free</button>
            </div>
        </div>
    </div>

        </div>
    )
}

export default HomePage
