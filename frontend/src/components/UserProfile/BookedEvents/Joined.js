import React, { useContext } from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import AuthContext from '../../../context/AuthProvider';

function Joined() {

    const { bookings, auth, allUsers } = useContext(AuthContext);
    console.log(bookings)
    console.log(allUsers)
    console.log(auth)

    // function JoinedEvents(props) {

    // }
 
  return (
    <div>
        <ListGroup className="eventsList" as="ul">
          
          
        </ListGroup>
       
    </div>
  )
}

export default Joined
