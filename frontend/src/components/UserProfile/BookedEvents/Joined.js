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

    // const booked = bookings.filter((book) => book.user._id === 23)
//    useEffect(() => {
//     axios
//       .get(`/users/profile/`)
//       .then((response) => {
//         console.log(response)
//         setUser(response.data);
//       })
//       .catch((err) => {
//         console.log(err)
//         setUser(null);
//       });
//   }, []);

  console.log(user._id)



  return (
    <div>
        <ListGroup className="eventsList" as="ul">
          {bookings.map(() => {


            const userFromBooking = bookings.find()

          })
            
          }
          
          
        </ListGroup>
       
    </div>
  )
}

export default Joined
