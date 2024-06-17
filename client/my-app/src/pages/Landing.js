import React, { useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const Landing = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/hello");
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return <div>Landing Page</div>;
};

export default Landing;
