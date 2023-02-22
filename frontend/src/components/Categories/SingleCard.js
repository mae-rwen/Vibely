import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function SingleCard() {
  return (
    <div className="categoriesCards">

    <Card className="card text-center">
      <Card.Img variant="top" src="https://cdn.discordapp.com/attachments/1050050668917948426/1077232176598364210/autumn-cannot-stop-us-from-cycling-royalty-free-image-1612364934.jpeg" />
      <Card.Body>
        <Card.Title className="fw-bold">Skill sharing</Card.Title>
        <Card.Text className='text-end'>
        <a href="#top">XX events in your location*</a>
        </Card.Text>
        <Button className="catBtn" variant="outline-secondary" href="/allevents">Explore the activities</Button>
      </Card.Body>
    </Card>

    <Card  className="card text-center">
      <Card.Img variant="top" src="https://cdn.discordapp.com/attachments/1050050668917948426/1077233672052297829/boardgames-2048px-2233.jpg" />
      <Card.Body>
        <Card.Title className="fw-bold">Board Games</Card.Title>
        <Card.Text className='text-end'>
        <a href="#top">XX events in your location*</a>
        </Card.Text>
        <Button className="catBtn" variant="outline-secondary" href="/allevents">Explore the activities</Button>
      </Card.Body>
    </Card>

    <Card  className="card text-center">
      <Card.Img variant="top" src="https://cdn.discordapp.com/attachments/1050050668917948426/1077232447080644699/getty_914989896_411298.jpg" />
      <Card.Body>
        <Card.Title className="fw-bold">Connect & Socialize</Card.Title>
        <Card.Text className='text-end'>
        <a href="#top">XX events in your location*</a>
        </Card.Text>
        <Button className="catBtn" variant="outline-secondary" href="/allevents">Explore the activities</Button>
      </Card.Body>
    </Card>

    <Card  className="card text-center">
      <Card.Img variant="top" src="https://cdn.discordapp.com/attachments/1050050668917948426/1077231128756355093/Outdoor-Activities-Group-of-Friends-Enjoy-Outdoors-Together.jpg.webp" />
      <Card.Body>
        <Card.Title className="fw-bold">Fresh air activities</Card.Title>
        <Card.Text className='text-end'>
        <a href="#top">XX events in your location*</a>
        </Card.Text>
        <Button className="catBtn" variant="outline-secondary" href="/allevents">Explore the activities</Button>
      </Card.Body>
    </Card>

    </div>
  )
}
