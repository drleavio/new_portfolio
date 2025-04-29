"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Link from 'next/link';
interface datatype{
    name:string;
    email:string;
    subject?:string;
    message:string;
    createdAt:string;
}
const Dashboard = () => {
    const [data,setData]=useState<[datatype]>();
    // const [password,setPassword]=useState<string>("")
    // const [auth, setAuth] = useState<boolean>(() => {
    //     const verified = localStorage.getItem("auth");
    //     return verified === "true"; // or whatever truthy string you stored
    //   });
    //   useEffect(() => {
    //     localStorage.setItem("auth", auth.toString());
    //   }, [auth]);
    // const handlePassword = async () => {
    //     try {
    //       const response = await axios.post("/api/auth", { password });
    //       console.log(response.data.message);
    //       if (response.data.message === true) {
    //         setAuth(true); // ✅ Update state, effect will update localStorage
    //       } else {
    //         alert("Authentication failed");
    //       }
    //     } catch (error) {
    //       console.error("Error in authentication:", error);
    //     }
    //   };
    // if(!auth) return <div>
    //     <div>not authenticated</div>
    //     <input type="text" onChange={(e)=>setPassword(e.target.value)} />
    //     <button onClick={handlePassword}>submit</button>
    //     <Link href="/">go to</Link>
    // </div>
    const fetchData=async()=>{
        const response=await axios.get("/api/dashboard");
        console.log(response.data.response);
        setData(response.data.response)
    }
    useEffect(() => {
        
          fetchData();
       
      }, []);
  return (

    <div>
        <h1>dashboard</h1>
        {
            data?.map((obj,ind)=>{
                return <div style={{border:"1px solid white",gap:"10px"}} key={ind}>
                    <div>{obj.name}</div>
                    <div>{obj.email}</div>
                    <div>{obj.subject || ""}</div>
                    <div>{obj.message}</div>
                </div>
            })
        }
    </div>
  )
}

export default Dashboard