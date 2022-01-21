import React from "react"
import "./homepage.css"
import axios from "axios";
import { useState } from "react";

const Homepage = ({setLoginUser}) => {


    const[name , setname] = useState("");
    const[email , setemail] = useState("");
    const[password , setpassword] = useState("");
   



    const changeOnClick = e =>{
     
        e.preventDefault();

        const user ={
         
            name,
            email,
            password

        };

        setname("");
        setemail("");
        setpassword('');
       

        axios.put(`http://localhost:8000/user/update/${setLoginUser._id}`, user)
        .then (res =>
          alert("User  Updated!")
          (res.data))
        .catch(err =>{
            console.log(err);
        });
     };


    return (
        
        <div className="homepage">
            <h1>Hello {setLoginUser.name} </h1>
            <h2>Your email is : {setLoginUser.email}  </h2>
<br/><br/><br/>
<h3>Edit your Details</h3>
<br/><br/><br/>
   
           <form onSubmit={changeOnClick} >
           <div className="update">
               Name:
               <input type="text"  onChange={e => setname(e.target.value)} placeholder={setLoginUser.name} required/><br/><br/>
               Email:
               <input type="text" onChange={e => setemail(e.target.value)} placeholder={setLoginUser.email} required/><br/><br/>
               Password:
               <input type="text"  onChange={e => setpassword(e.target.value)} placeholder={setLoginUser.password} required/><br/><br/>
               <center> <button type="submit"  className="button">Update user </button></center>
               </div>
           </form>
          
        </div>
    )
}

export default Homepage