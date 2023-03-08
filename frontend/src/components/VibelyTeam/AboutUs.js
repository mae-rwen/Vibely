import Button from "react-bootstrap/Button";
import MeetTheTeam from "./../HomePage/MeetTheTeam"

export default function AboutUs() {
  return (
    <>
      <div className="subpageHeader">
        <h2 className="fw-bold col-lg-8 mx-auto text-start">About Vibely</h2>
      </div>
      <div>
        <p>
          Vibely was created with the mission to help people connect with
          like-minded individuals and foster new friendships.
        </p>{" "}
        <p>
          {" "}
          We believe that socializing and spending time with others is essential
          for personal growth and happiness. Vibely is designed for individuals
          who are seeking to expand their social circle, share skills, and
          connect with others in their local community.
        </p>
        <p>
          Whether you're new to an area or simply looking to meet new people,
          our platform provides a safe and welcoming space for you to do so.
          Here, you can create a user profile and browse through categories and
          events that align with your interests. You can connect with other
          users and even plan your own events to share your passions with
          others.
        </p>
        <p>
          Vibely allows you to find and join events that are happening in your
          area, or even create your own events to invite others to join. We are
          committed to providing a positive and inclusive space for all of our
          users. We believe that connecting with others and fostering new
          friendships is an essential part of a happy and fulfilling life.
        </p>{" "}
        <p>
          We hope that our website will be a helpful tool for you to make new
          connections, share experiences, and create lasting friendships.
        </p>
      </div>
      <MeetTheTeam />      
      <div className="hpSection">
        <h5 className=" fw-bold">Stack used</h5>
        <div className="row p-4 mt-4 text-center justify-content-center teamIntro">
        <div className="col-lg-3 teamCard">
        <img
          src="https://www.bairesdev.com/wp-content/uploads/2021/07/Expressjs.svg"
          alt="node.js"
          style={{ height: "100px"}}
        />
        <h5 className="fw-bold mt-2">Node.js Express</h5>       
       </div>
      <div className="col-lg-3 teamCard">
        <img
          src="https://res.cloudinary.com/practicaldev/image/fetch/s--Gv65Fxow--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/t0p5suxwzq90eb2nr2rv.png"
          alt="Mongoose"
          style={{ height: "100px"}}
        />
        <h5 className="fw-bold mt-2">Mongoose & MongoDB</h5>       
        </div>
      <div className="col-lg-3 teamCard">
        <img
          src="https://s3.amazonaws.com/awsmp-logos/cloudinary.png"
          alt="Cloudinary"
          style={{ height: "100px"}}
        />
        <h5 className="fw-bold mt-2">Cloudinary</h5>      
       </div>
       <div className="col-lg-3 teamCard">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/1200px-Bootstrap_logo.svg.png"
          alt="Bootstrap"
          style={{ height: "100px"}}
        />
        <h5 className="fw-bold mt-2">Bootstrap</h5>      
       </div>
       <div className="col-lg-3 teamCard">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc2Y2gmQB5zuaBd1AfN_AyEgoTgxPF65i7GwlvrbnnP_RUlubieG19WFnonCtS4ZfAox4&usqp=CAU"
          alt="React.js"
          style={{ height: "100px"}}
        />
        <h5 className="fw-bold mt-2">React.js</h5>      
       </div>
          </div>
      </div>
      <div className="d-grid gap-2 mt-4 d-sm-flex justify-content-sm-center">
        <Button variant="secondary" href="/categoriesfe">
          Browse the events
        </Button>
        <Button variant="outline-secondary" href="/login">
          Login
        </Button>
      </div>
    </>
  );
}
