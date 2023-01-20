import React from 'react';
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRef, useEffect, useState } from "react";
import Appbar from './../../components/appbar';
import { collection, addDoc, query, onSnapshot,doc,updateDoc,deleteDoc, } from "firebase/firestore";
import { db } from "C:/Users/yokes/Downloads/reactJs/reactJs/trainer/src/services/firebase";
import Card from './../../components/card';
import Card2 from './../../components/card2';


function CustomerDashboard() {

  const [items, setItems] = useState([]);
  const supabase = useSupabaseClient();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

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

  return (
    <div style = {styles.container}>
      <div style = {styles.appbar}>
        <Appbar name = "Customer"/>
      </div>
      <div style = {styles.body}>
      <div style={styles.displayClasses}>
          <h1>Scheduled Classes</h1>
          {
            items.length>0? (items.map((ele) => (
              <React.Fragment key = {ele.id}>
              <Card2 name = {ele.className} time = {ele.time} cost = {ele.cost}/>
              </React.Fragment>
            ))) 
            : (<p>nothing to display.........</p>)
          }
        </div>
      </div>
      
    </div>
  )
}

export default CustomerDashboard

const styles = {
  body:{
    display:'flex',
    backgroundColor:'#bbbcbd',
  },

  displayClasses: {
    flex: 1,
    display: "flex",
    // backgroundColor: "green",
    flexDirection: "column",
    alignItems:'center',
    textTransform: "uppercase",
  },
}