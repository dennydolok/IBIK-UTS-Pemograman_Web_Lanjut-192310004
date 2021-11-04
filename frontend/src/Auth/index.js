import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import './index.css';
import sign from "jwt-encode";


export function Signin() {

    const [postData,setPostData] = useState({username:'',password:''});
    const dispatch = useDispatch();

    const [message,setMessage] = useState("");
    const [labelSignIN,setLabelSignIN] = useState("Sign In");
    
    const submitPost = (e) =>{

        e.preventDefault();
        let publicKey = "Bearuang16";
        let encription = sign(postData,publicKey);       

        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
            'token': encription 
        });
        var config = {
            method: 'post',
            url: 'http://localhost/middleware/APIRequest/authentification',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                setLabelSignIN("Loading...");
            //Save to Redux 
                if(response.data.return){ //if value true
                    let publicKey = "Bearuang16";
                    let encription = sign(response.data,publicKey);
                    dispatch({type:"SIGN_IN", param:encription});
                    setMessage(response.data.message);
                    //redirect
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1000);

                }else{
                    setLabelSignIN("Sign In");
                    setMessage(response.data.message);
                }
            //End Save to Redux
                
        })
            .catch(function (error) {
            console.log(error);
        });

    }

    return(
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white styling">
                    <div className="card-body p-5 text-center">
                        <div className="mb-md-5 mt-md-4 pb-5">
                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                        <p className="text-white-50 mb-5">Please enter your username and password!</p>

                        {(message) ? (
                                <div className="alert alert-danger">
                                    <p>{message}</p>
                                </div>
                        ) : ''}
                        
                        <form novalidate="novalidate" id="kt_login_signin_form"  onSubmit={submitPost} autoComplete="off">
                        <div className="form-outline form-white mb-4">
                            <input type="text" id="typeUsernameX" className="form-control form-control-lg"  value={postData.username} onChange={(e)=>setPostData({...postData, username:e.target.value })} placeholder="Username"/>
                            <label className="form-label" for="typeUsernameX">Username</label>
                        </div>
                        <div className="form-outline form-white mb-4">
                            <input type="password" name="Password" id="typePasswordX" className="form-control form-control-lg" placeholder="Password" value={postData.password} onChange={(e)=>setPostData({...postData, password:e.target.value })}/>
                            <label className="form-label" for="typePasswordX">Password</label>
                        </div>
                        <button className="btn btn-outline-light btn-lg px-5" type="submit">{labelSignIN}</button>
                        </form>
                        
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Signin