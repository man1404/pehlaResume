import React,{useState} from 'react'
import Education from './Education';
import Experience from './Experience';
import ExtraCirriculars from './ExtraCirriculars';
import PersonalDetail from './PersonalDetail';
import Project from './Project';
import {saveAs} from 'file-saver';
import axios from 'axios';
import Success from './Success';
import "./for.css";

const Form = () => {
    const[success,setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        skills: "",
    
        exp1_org: "",
        exp1_pos: "",
        exp1_desc: "",
        exp1_dur: "",
        exp2_org: "",
        exp2_pos: "",
        exp2_des: "",
        exp2_dur: "",
    
        proj1_title: "",
        proj1_link: "",
        proj1_desc: "",
        proj2_title: "",
        proj2_link: "",
        proj2_desc: "",
    
        edu1_school: "",
        edu1_year: "",
        edu1_qualification: "",
        edu1_desc: "",
        edu2_school: "",
        edu2_year: "",
        edu2_qualification: "",
        edu2_desc: "",
    
        extra_1: "",
        extra_2: "",
      });

const [page ,setpage] = useState(0);

const formtitle = [
  "PersonalDetails",
  "Education",
  "Project",
  "Experience",
  "ExtraCirriculars",
];

const PageDisplay = () => {
  if (page === 0) {
    return <PersonalDetail formData={formData} setFormData={setFormData} />;
  } else if (page === 1) {
    return <Education formData={formData} setFormData={setFormData} />;
  } else if (page === 2) {
    return <Experience formData={formData} setFormData={setFormData} />;
  } else if (page === 3) {
    return <Project formData={formData} setFormData={setFormData} />;
  } else {
    return <ExtraCirriculars formData={formData} setFormData={setFormData} />;
  }
};

  return (
    <div>
      <div className="form  ">
      <h1 className="head " >Let's generate your Resume!</h1>
      
        <h1 className="start">{formtitle[page]}</h1>
      </div>
      <div className='progressbar'>
      <div
          style={{
            width:
              page === 0
                ? "20%"
                : page === 1
                ? "40%"
                : page === 2
                ? "60%"
                : page === 3
                ? "80%"
                : "100%",
          }}
        ></div>
      </div>
      <div>
        <div>{PageDisplay()}</div>
        <div className="d-flex justify-content-center gap-3 py-5">
        <button className='btnn'
          disabled = {page===0}
          onClick={() => {
          setpage((currPage) => currPage-1);
        }}> Prev </button>
         <button 
         className='btnn'
          onClick={() => {
            if (page === formtitle.length - 1) {
              axios
                .post("http://localhost:4000/create-pdf", formData)
                .then(() =>
                  axios.get("http://localhost:4000/fetch-pdf", {
                    responseType: "blob",
                  })
                )
                .then((res) => {
                  const pdfBlob = new Blob([res.data], {
                    type: "application/pdf",
                  });
                  setSuccess(true && res.status === 200);
                  saveAs(pdfBlob, "Resume.pdf");
                });
            } else {
              setpage((currPage) => currPage + 1);
            }
          }}
        >
          {page === formtitle.length - 1 ? "Download Pdf" : "Next"}
         </button>
        </div>
        {success && <Success />}
      </div>
    </div>
  )
}

export default Form