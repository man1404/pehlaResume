import React, { useState } from 'react'
import './login.css'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
    const history=useNavigate();

    const[name,setName] = useState(null);
    const[email,setEmail] = useState(null);
    const[password,setPassword] = useState(null);
   
    
        async function submit(e){
            e.preventDefault();
    
            try{
        await axios.post("http://localhost:4000/signup",{
            name,email,password
        })
        .then(res=>{
            if(res.data==="exist"){
                alert("User already exists")
            }
            else if(res.data==="notexist"){
                history("/Form",{state:{id:email}})
            }
        })
        .catch(e=>{
            alert("wrong details")
            console.log(e);
        })
    }
    catch(e){
        console.log(e);
    }
}

    return (
         <div className= "signup-container">
           <form class="form">
    <p class="title">Register </p>
    <p class="message">Signup now and get full access to our app. </p>
        
        <label>
            <input required="" placeholder="" type="text" class="input" id="name" onChange={(e) => { setName(e.target.value) }}/>
            <span>Name</span>
        </label>
    
        
    <label>
        <input required="" placeholder="" type="email" class="input" id="email"  onChange={(e) => { setEmail(e.target.value) }}/>
        <span>Email</span>
    </label> 
    
    <label>
        <input required="" placeholder="" type="password" class="input" id="Password"  onChange={(e) => { setPassword(e.target.value) }}/>
        <span>Password</span>
    </label>
   
    <Link to ="/Form" onClick={submit} type="submit" class="submit">Submit</Link>
    <Link  to='/Login'  className='submitt'> Login </Link>
</form>
        </div>
       
    )       

}

export default Signup