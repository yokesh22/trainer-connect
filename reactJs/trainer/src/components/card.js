import React from 'react'

function Card(props) {
  return (
    <div style = {styles.card}>
        <p style = {{fontWeight:'bold',fontSize:'20px'}}>Class: {props.name}</p>
        <p>{props.time}</p>
        <p>Cost: {props.cost}</p>
        <p>Booked: </p>
    </div>
  )
}

export default Card

const styles = {
    card: {
        width: '300px',
    height:'100px',
    backgroundColor:'white',
    marginTop:'20px',
    marginBottom:'20px',
    marginLeft:'10px',
    borderRadius:'10px',
    paddingLeft:'10px' ,
    paddingTop:'8px'
    }
}