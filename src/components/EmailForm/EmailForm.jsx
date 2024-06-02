import React, { useState } from 'react'
import './EmailForm.css'

const EmailForm = () => {
    const formInitialDetails = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    };
    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState("Send");
    const [status, setStatus] = useState({});
  
    const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value,
      });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText("Sending...");
        let response = await fetch("/api/contact", {
            method: "POST",
            headers : {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(formDetails)
        });

        let result = await response.json();
        setButtonText("Send");
        setFormDetails(formInitialDetails)

        if(result.code == 200){
            setStatus({success: true, message: "Message sent successfully"})
        } else{
            setStatus({success: false, message: "Something went wrong. Please try again later"})
        }
    }
    return (
        <div className="form-container">
        <h1>Contact Us</h1>
        <p>We're here to help if you have any questions</p>
        <form className="form-inner" onSubmit={ handleSubmit }>
          <div className="row">
            <input
              type="text"
              value={formDetails.firstName}
              placeholder="First Name"
              onChange={(e) => onFormUpdate("firstName", e.target.value)}
            />
            <input
              type="text"
              value={formDetails.lastName}
              placeholder="Last Name"
              onChange={(e) => onFormUpdate("lastName", e.target.value)}
            />
          </div>
          <div className="row">
            <input
              type="email"
              value={formDetails.email}
              placeholder="Email Address"
              onChange={(e) => onFormUpdate("email", e.target.value)}
            />
            <input
              type="tel"
              value={formDetails.phone}
              placeholder="Phone No."
              onChange={(e) => onFormUpdate("phone", e.target.value)}
            />
          </div>
          <div className="row">
            <textarea
              rows="6"
              value={formDetails.message}
              placeholder="Message"
              onChange={(e) => onFormUpdate("message", e.target.value)}
            ></textarea>
          </div>
          <button type="submit">{buttonText}</button>
          {status.message && (
            <div className="row">
              <p className={status.success === false ? "danger" : "success"}>
                {status.message}
              </p>
            </div>
          )}
        </form>
      </div>
    );
  };
  
  export default EmailForm;