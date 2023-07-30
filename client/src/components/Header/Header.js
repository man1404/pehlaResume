import React from "react";
import Navbarr from "../navbar/Navbar.js";
import resumeSvg from "../../assets/resume.svg";

import  './header.css';
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
     <Navbarr />
    <div className= "container">
     
      <div className = "left" >
        
        <p className="heading" >
          A <span>Resume</span> that stands out
          <br/>
          Make your own resume. <span>It's free</span>
        </p>

       
        <div className="right">
        <img src={resumeSvg} alt="Resume" />
        </div>
      </div>
      <div className="tex">
         <p  >
        <h6>Start your resume now for free!</h6> A Quick and Easy Way to Create Your Professional Resume.  Professional Resume Template   Fast and Easy to Use Our resume builder lets you easily and quickly create a resume using our app. All users can download and share their finished resumes! Access all features without any cost!
        </p>
      </div>
      <div className="btn">
      <Link className="create" to ="/Login"  > Create Resume </Link>
      </div>
      
    </div>
    </>
  );
}

export default Header;