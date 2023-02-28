// import Alex from "./pics/Alex.gif";
// import Agata from "./pics/Agata.gif";
// import Simran from "./pics/Simran.gif";
// import Ola from "./pics/Ola.gif";
import Alex from "./pics/Alex.png";
import Agata from "./pics/Agata.png";
import Simran from "./pics/Simran.png";
import Ola from "./pics/Ola.png";
import TeamCard from "./TeamCard";
import Button from 'react-bootstrap/Button';


export default function MeetTheTeam() {
  const agata = {
    pic: Agata,
    name: "Agata",
    desc: "The affirmative one",
  };
  const alex = {
    pic: Alex,
    name: "Alex",
    desc: "With his head in the clouds",
  };
  const simran = {
    pic: Simran,
    name: "Simran",
    desc: "With the fresh ideas",
  };
  const ola = {
    pic: Ola,
    name: "Aleksandra",
    desc: "Always smiling",
  };
  return (
    <>      
        <div className="hpSection">
          <h5 className="fw-bold">Meet the Vibely team</h5>
          <div className="row p-4 mt-4 text-center justify-content-center teamIntro">
            <TeamCard member={agata} />
            <TeamCard member={simran} />
            <TeamCard member={ola} />
            <TeamCard member={alex} />
          </div>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button variant="outline-secondary" href="/categories">
              Vibe with us!
            </Button>
          </div>
        </div>   
    </>
  );
}
