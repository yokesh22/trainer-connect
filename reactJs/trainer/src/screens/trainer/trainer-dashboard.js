import React from "react";
import { Container, Button, Link } from "react-floating-action-button";
import { useRef, useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { FaBeer } from "react-icons/fa";
import DateTimePicker from "react-datetime-picker";
import { collection, addDoc, query, onSnapshot,doc,updateDoc,deleteDoc, } from "firebase/firestore";
import { db } from "C:/Users/yokes/Downloads/reactJs/reactJs/trainer/src/services/firebase";
import Card from './../../components/card';
import Appbar from './../../components/appbar';

const TrainerDashboard = () => {
  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);
  const session = useSession();
  const supabase = useSupabaseClient();

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [className, setClassName] = useState("");
  const [cost, setCost] = useState("");
  const [items, setItems] = useState([]);

  useEffect( () => {
    const q = query(collection(db, "items"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({...doc.data(), id: doc.id});
      });
      setItems(itemsArray);
    })
    return () => unsub();
  },[]);

  // useEffect( () => {
  //   const getDataFromFirestore = [];
  //   const sub = db.collection("items")
  //   .onSnapshot((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       getDataFromFirestore.push({
  //         ...doc.data(),
  //         key: doc.id,
  //       });
  //     });
  //     setItems(getDataFromFirestore);
  //   });
  //   return () => sub();
  // },[]);
  //db
  //   const handleLogout = () => {
  //     localStorage.clear();
  //     window.location.reload();
  //   };

  //   async function googleSignIn(){
  //     const {error} = await supabase.auth.signInWithOAuth({
  //         provider: 'google',
  //         options: {
  //             scopes: 'https://www.googleapis.com/auth/calendar'
  //         }
  //     });
  //     if(error) {
  //         alert("Error logging in");
  //         console.log(error);
  //     }
  //   }

  async function signOut() {
    localStorage.clear();
    await supabase.auth.signOut();
  }

  async function createClass() {
    console.log("createClass");
    const event = {
      summary: className,
      description: cost,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token,
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then(async(data) => {
        console.log(data);
        if(className !== ""){
          await addDoc(collection(db, "items"), {
            className,
            cost,
            start,
          });
        }
      });

      
  }

  

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  console.log(session);
  console.log(items);
  //   console.log(start);
  return (
    <div style={{ height: windowHeight.current, backgroundColor: "grey" }}>
      <Appbar name = "Trainer"/>
      <div style={styles.body}>
        <div style={styles.getinput}>
          <p style = {{fontWeight:'bold'}}>Select Start Date</p>
          <div style = {{backgroundColor:'white'}}>
          <DateTimePicker onChange={setStart} value={start} />
          </div>
          <p style = {{fontWeight:'bold'}}>End date</p>
          <div style = {{backgroundColor:'white'}}>
          <DateTimePicker  onChange={setEnd} value={end} />
          </div>
          <p style = {{fontWeight:'bold'}}>ClassName</p>
          <input style = {{padding:'10px',fontSize:'18px'}} type="text" onChange={(e) => setClassName(e.target.value)} />
          <p style = {{fontWeight:'bold'}}>Cost</p>
          <input style = {{padding:'10px',fontSize:'18px'}} type="text" onChange={(e) => setCost(e.target.value)} />
          <br />
          <button style = {{width:'100px',fontSize:'15px',color:'white',backgroundColor:'black',borderRadius:'5px',paddingTop:'5px',paddingBottom:'5px'}} onClick={() => createClass()}>Create Class</button>
        </div>
        <div style={styles.displayClasses}>
          <h1>Scheduled Classes</h1>
          {
            items.length>0? (items.map((ele) => (
              <React.Fragment key = {ele.id}>
              <Card name = {ele.className} time = {ele.time} cost = {ele.cost}/>
              </React.Fragment>
            ))) 
            : (<p>nothing to display.........</p>)
          }
        </div>
      </div>
      {/* {
            session?
            <>
                <h2>hey there {session.user.email}</h2>
                <button onClick = {()=> signOut()}>signout</button>
            </>
            :
            <>
                <h2>Signin please </h2>
            </>
        } */}

      {/* <Container>
        <Button
          tooltip="Add a class"
          icon="fa FaBeer"
          rotate={true}
        //   onClick={}
          styles={{
            backgroundColor: "black",
            color: "white",
            width: "70px",
            height: "70px",
          }}
        />
      </Container> */}
    </div>
  );
};

export default TrainerDashboard;

const styles = {
  // maincontainer:{
  //     display:'flex',
  //     flexDirection:'column'
  // },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
    paddingLeft: "30px",
    paddingTop: "10px",
  },

  //   logout: {
  //     height: "20px",
  //     backgroundColor: "red",
  //     display: "flex",
  //     margin: "6px",
  //     fontSize: "12px",
  //   },

  calenderButton: {
    padding: "8px",
    fontWeight: "bold",
    backgroundColor: "white",
    borderRadius: "3px",
    margin: "10px",
    border: "0.5px solid black",
  },

  body: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  getinput: {
    flex: 1,
    display: "flex",
    // backgroundColor:'red',
    flexDirection: "column",
    paddingTop: "50px",
    paddingLeft: "50px",
    paddingRight: "50px",
    // justifyContent:'center',
    // textAlign:'center',
    // position:'absolute'
  },

  displayClasses: {
    flex: 1,
    display: "flex",
    // backgroundColor: "green",
    flexDirection: "column",
    alignItems:'center',
  },
};
