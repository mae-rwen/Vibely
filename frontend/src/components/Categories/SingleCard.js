import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function SingleCard({ categories, categoriesIDs}) { 
  // const [eventsCount, setEventsCount] = useState([]);

  // useEffect(() => {

  //   axios
  //     .get(`/events/countByCategory?category=${category._id}`)
  //     .then((response) => {        
  //       setEventsCount(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div className="categoriesCards">
       {categories.map((category) => { 

        
            // axios
            //   .get(`/events/countByCategory?category=${category._id}`)
            //   .then((response) => {  
            //     console.log(response.data)      
            //     // setEventsCount(response.data);
            //   })
            //   .catch((error) => {
            //     console.log(error);
            //   });
        
            
        return (
          <Card key={category._id} className="card text-center">
            <Card.Img variant="top" src={category.picture} />
            <Card.Body>
              <Card.Title className="fw-bold">{category.name}</Card.Title>
              <Card.Text className="text-end">
                <a href="#top">XX events in this category</a>
              </Card.Text>
              <Button
                className="catBtn"
                variant="outline-secondary"
                href={`/allevents/${category._id}`}
              >
                Explore the activities
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
