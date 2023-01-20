import React from 'react';
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";


function Appbar(props) {

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
  return (
    <div
        style={{
          display: "flex",
          flexDirection: "row",
          //   width: windowWidth.current,
          //   height: windowHeight.current * 0.09,
          flex: 5,
          backgroundColor: "black",
        }}
      >
        <div style={{ flex: 0.9, flexDirection: "row", display: "flex" }}>
          <p style={styles.title}>{props.name}</p>
        </div>
        <div style={{ flex: 0.13, flexDirection: "row", display: "flex" }}>
          <button
            style={styles.calenderButton}
            role="link"
            onClick={() =>
              openInNewTab("https://calendar.google.com/calendar/u/0/r/week")
            }
          >
            Calender
          </button>
          <button style={styles.calenderButton} onClick={() => signOut()}>
            Logout
          </button>
        </div>
      </div>
  )
}

export default Appbar

const styles = {
    title: {
      fontSize: "30px",
      fontWeight: "bold",
      color: "white",
      textTransform: "uppercase",
      paddingLeft: "30px",
      paddingTop: "10px",
    },
  
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
  