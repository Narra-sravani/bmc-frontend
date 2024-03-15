import React, { useState } from 'react';
import bmclogo from "../assets/bmclogo.png";

const Homepage = () => {
  const [message, setMessage] = useState('');
  const [postData, setPostData] = useState('');
  const [postResponse, setPostResponse] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('https://servicesbmc-47ed805c0931.herokuapp.com/data');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const postDataToServer = async () => {
    try {
      const response = await fetch('https://servicesbmc-47ed805c0931.herokuapp.com/post-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: postData }),
      });
      const data = await response.json();
      setPostResponse(data.message);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleInputChange = (event) => {
    setPostData(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <img src={bmclogo} alt="bmc logo" style={{ height: "200px", width: "200px", marginBottom: '20px' }} />
        <div>
          <button onClick={fetchData}>Fetch Data</button>
          {message && <p>{message}</p>}
          <input type="text" value={postData} onChange={handleInputChange} /><br/>
          <button onClick={postDataToServer}>Post Data</button>
          {postResponse && <p>{postResponse}</p>} 
        </div>
      </div>
      <div style={{ flex: 1 }}></div>
    </div>
  );
};

export default Homepage;
