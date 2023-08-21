import React ,{ useEffect } from "react";
import { url } from '../App';
import {  toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from "react-router-dom";





function Activation() {
  let navigate=useNavigate()
  const tokenParam = new URLSearchParams(window.location.search);
  const decodedToken = tokenParam.get('token');
  console.log("Testing :"+decodedToken);
  const activationStatus = tokenParam.get('active'); 
  console.log("Activation Status: " + activationStatus);

    useEffect(()=>{
        const activateAccount=async()=>{
          try {
            const res = await axios.post(`${url}/users/active`, {
            token : decodedToken
          });
            toast.success(res.data.message)
            navigate('/')
         } catch (error) {
          console.log(error.response.data.message)
          }
        }
        activateAccount();
    },[navigate,decodedToken])
   
    return (
     
   
     <div> Signup successfull !!
      </div>
       
    );
  }
  
  export default Activation;




