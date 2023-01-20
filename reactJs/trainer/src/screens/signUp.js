import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

import TrainerDashboard from "./trainer/trainer-dashboard";
import CustomerDashboard from "./customer/customer-dashboard";

// function handleTrainer(){
//     console.log("Trainer here!!!!!!!")
// }

// function handleCustomer(){
//     console.log("customer here!!!!!!!")
// }

function SignUp() {
  const [value, setValue] = useState("");
  const [picker, setpicker] = useState("");
  const { isLoading } = useSessionContext();
  const session = useSession();
  const supabase = useSupabaseClient();

  async function signOut() {
    await supabase.auth.signOut();
  }
  async function googleSignInCustomer() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      alert("Error logging in");
      console.log(error);
    }
    setpicker("customer");
  }

  async function googleSignInTrainer() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      alert("Error logging in");
      console.log(error);
    }
    setpicker("trainer");
    localStorage.setItem("picker","trainer")
  }

  // const handleTrainer = () => {
  //     console.log("I'm trainer.......")
  //     signInWithPopup(auth,provider).then((data) => {
  //         setValue(data.user.email)
  //         localStorage.setItem("email", data.user.email)
  //     })
  //     setpicker('trainer');
  // }

  // const handleCustomer = () => {
  //     console.log("I'm customerr.......")
  //     signInWithPopup(auth,provider).then((data) => {
  //         setValue(data.user.email)
  //         localStorage.setItem("email", data.user.email)
  //     })
  //     setpicker('customer');
  // }

  // useEffect(() => {
  //     setValue(localStorage.getItem('email'));
  // },[]);
  
  useEffect(() => {
        setpicker(localStorage.getItem('picker'))
  }, [])

  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);
  // console.log(session);

  if (isLoading) {
    return <></>;
  }
  console.log("picker ()------------>", picker);
  return (
    <div>
      {session? <CustomerDashboard/>: (
        <div style={styles.container}>
          <div
            style={{
              width: windowWidth.current / 1.5,
              height: windowHeight.current / 2 + 200,
              alignItems: "center",
              background: "rgba(255,255,255,0.3)",
              borderRadius: "10px",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              boxShadow: "10px 10px 10px rgba(30,30,30,0.5)",
            }}
          >
            <button
              style={styles.trainer}
              onClick={() => googleSignInTrainer()}
            >
              Trainer
            </button>
            <button
              style={styles.customer}
              onClick={() => googleSignInCustomer()}
            >
              Customer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;

const styles = {
  // main: {
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     display: 'flex',
  //     flexDirection: 'column',
  //     height: '100vh'
  // },
  container: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundImage:
      'url("https://i.pinimg.com/originals/b0/29/10/b02910cd818217300dc292bd6bb51041.jpg")',
  },
  trainer: {
    width: "250px",
    height: "70px",
    backgroundColor: "black",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    margin: "20px",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "20px",
    boxShadow: "10px 10px 10px rgba(30,30,30,0.5)",
  },

  customer: {
    width: "250px",
    height: "70px",
    backgroundColor: "black",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    margin: "20px",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "20px",
    boxShadow: "10px 10px 10px rgba(30,30,30,0.5)",
  },
};

// return (
//     <div style={styles.main}>
//         {
//             {/* (condition1 ? yes : condition2 ? yes : no ) */}
//         // (()=>{
//         //     if(value && picker === 'trainer'){
//         //         return(
//         //             <TrainerDashboard/>
//         //         )
//         //     }else if(value && picker === 'customer'){
//         //         return(
//         //             <CustomerDashboard/>
//         //         )
//         //     }else{
//         //         return(
//         //             <div style={{
//         //                 width: windowWidth.current / 1.5, height: windowHeight.current / 2 + 200, alignItems: 'center',
//         //                 justifyContent: 'center', backgroundColor: 'grey', display: 'flex', flexDirection: 'column'
//         //             }}>
//         //                 <button style={styles.trainer} onClick = {handleTrainer}>
//         //                     Trainer
//         //                 </button>
//         //                 <button style={styles.customer} onClick = {handleCustomer}>Customer</button>
//         //             </div>
//         //         )
//         //     }
//         // })
//         value && picker === 'trainer'?<TrainerDashboard/>:
//        <div style = {styles.container}>
//          <div style={{
//             width: windowWidth.current / 1.5, height: windowHeight.current / 2 + 200, alignItems: 'center',
//             justifyContent: 'center', backgroundColor: 'grey', display: 'flex', flexDirection: 'column'
//         }}>
//             <button style={styles.trainer} onClick = {handleTrainer}>
//                 Trainer
//             </button>
//             <button style={styles.customer} onClick = {handleCustomer}>Customer</button>
//         </div>
//        </div>

//         }
//     </div>
// )

{
  /* <button onClick = {()=> googleSignInTrainer()}>sigin here</button> */
}
