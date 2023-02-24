import Button from "react-bootstrap/Button";

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
      <div className="d-grid gap-2 mt-4 d-sm-flex justify-content-sm-center">
        <Button variant="secondary" href="/categories">
          Browse the events
        </Button>
        <Button variant="outline-secondary" href="/login">
          Login
        </Button>
      </div>
    </>
  );
}
