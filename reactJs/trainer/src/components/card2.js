import React from 'react'

function Card2(props) {
  return (
    <div style = {styles.card}>
        <p style = {{fontWeight:'bold',fontSize:'20px'}}>Class: {props.name}</p>
        <p>{props.time}</p>
        <p>Cost: {props.cost}</p>
        <p>Booked: ?</p>
        <div style = {styles.bottom}>
        <p style = {{fontSize:'11px'}}>click calendar to see time</p>
        <button style = {styles.bookbutton}>BOOK</button>
        </div>
    </div>
  )
}

export default Card2

const styles = {
    card: {
        width: '300px',
    height:'110px',
    backgroundColor:'white',
    marginTop:'20px',
    marginBottom:'20px',
    marginLeft:'10px',
    borderRadius:'10px',
    paddingLeft:'10px' ,
    paddingTop:'8px'
    },

    bottom: {
        display:'flex',
        justifyContent: 'space-between',
        paddingRight:'10px' ,
        paddingTop:'5px'
    },

    bookbutton: {
        backgroundColor: 'black',
        color:'white',
        border: '1px solid black',
        padding:'3px',
        borderRadius: '3px',
    }
}