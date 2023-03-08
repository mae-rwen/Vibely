import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function Instructions() {
  return (
    <>
     
      <div className="subpageHeader">
        <h2 className="fw-bold col-lg-8 mx-auto text-start">
          How to use Vibely
        </h2>
        <div className="col-lg-8">
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Button variant="secondary" href="/categories">
              Browse the events
            </Button>
            <Button variant="outline-secondary" href="/register">
              Create your profile
            </Button>
          </div>
        </div>
      </div>
    
      <div>
        <p>
          Welcome to our social networking website! Here's a step-by-step guide
          on how to use our platform to connect with like-minded people, explore
          events, and create your own activities.
        </p>
        <ol>
          <li>
            <b>1. Creating a user profile</b>
          </li>
          <p>
            The first step to using our website is to create your own user
            profile. To do this, click on the "Register" button on the homepage
            and provide your name, email address, and password. Once you've
            completed the sign-up process, you'll be able to customize your
            profile by adding a profile picture and providing some basic
            information about yourself. This will help others get to know you
            better and find common interests.
          </p>
          <li>
            <b>2. Browsing through categories and events</b>
          </li>
          <p>
            After you've created your profile, you'll be able to browse through
            categories and events that are of interest to you. You can do this
            by clicking on the "Categories" tab on the homepage, where you'll
            see a list of different categories such as "Skill sharing", "Board
            Games", "Connect & Socialize", and more. Click on a category to view
            the events that are available.
          </p>
          <li>
            <b>3. Finding an event of interest</b>
          </li>
          <p>
            Once you've found a category that interests you, you can click on
            the event that catches your eye to view more information about it.
            Here, you'll be able to see the date, time, location, and a brief
            description of the event. You'll also be able to see who else has
            RSVP'd to the event, which will give you an idea of who you might
            meet and what to expect.
          </p>
          <li>
            <b>4. Contacting the event's organizer and joining the event</b>
          </li>
          <p>
            If you're interested in attending the event, you can click on the
            "Join" button to RSVP. This will let the event's organizer know that
            you're planning to attend. You'll also be able to send a message to
            the organizer to ask any questions you might have or to introduce
            yourself. This is a great way to connect with others before the
            event and make new friends.
          </p>
          <li>
            <b>Creating your own events</b>
          </li>
          <p>
            If you don't see an event that interests you, you can also create
            your own activity by clicking on the "Create new Event" button.
            Here, you'll be able to provide details about the activity you'd
            like to share with others, such as the date, time, location, and a
            brief description. Once you've created your event, others will be
            able to see it and RSVP if they're interested.
          </p>
        </ol>
        <p>
          We hope this guide has been helpful in getting started on our social
          networking website. Remember, this is a great way to meet new people,
          explore new interests, and share your passions with others. Happy
          vibing!
        </p>
      </div>
      <div className="d-grid gap-2 d-sm-flex mt-4 justify-content-sm-center">
        <Button variant="secondary" href="/categories">
          Browse the events
        </Button>
        <Button variant="outline-secondary" href="/register">
          Create your profile
        </Button>
      </div>
    
    </>
  );
}
