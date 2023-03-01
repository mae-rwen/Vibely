import React, { useContext, useEffect } from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import AuthContext from '../../../context/AuthProvider';
import axios from '../../../api/axios';

function Joined() {

    const { bookings, auth, allUsers, user, setUser } = useContext(AuthContext);
    console.log(bookings)
    console.log(allUsers)
    console.log(auth)
    console.log(user)


  console.log(user._id)



  return (
    <div>
        <ListGroup className="eventsList" as="ul">
   
        Joined Events
          
        </ListGroup>
       
    </div>
  )
}

export default Joined
