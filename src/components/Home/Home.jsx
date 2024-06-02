import React, { useEffect } from 'react';
import './Home.css';
import EmailForm from '../EmailForm/EmailForm';


const Home = () => {
  useEffect(() =>{
    fetch("/api")
    .then((res) => res.json())
    .then((data) => {console.log(data);})
  }, [])

  return (
    <div className="container">
      <div className="left-column">
        <div className="content">
          <img src="../../../img.png" alt="your-image-description-here" />
        </div>
      </div>
      <div className="right-column">
        <EmailForm />
      </div>
    </div>
  );
};

export default Home;
