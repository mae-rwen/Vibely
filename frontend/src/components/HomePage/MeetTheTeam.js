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
    desc: "The one that does Boostrap",
  };
  const alex = {
    pic: Alex,
    name: "Alex",
    desc: "The one with clouds",
  };
  const simran = {
    pic: Simran,
    name: "Simran",
    desc: "The one that knows things",
  };
  const ola = {
    pic: Ola,
    name: "Ola",
    desc: "The one that likes Boostrap",
  };
  return (
    <>      
        <div className="col-lg-10 mx-auto hpSection">
          <h5 className="fw-bold">Meet the Vibely team</h5>
          <div className="row p-4 mt-4 text-center justify-content-center">
            <TeamCard member={agata} />
            <TeamCard member={simran} />
            <TeamCard member={ola} />
            <TeamCard member={alex} />
          </div>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button variant="outline-secondary" href="/aboutus">
              Vibe with us!
            </Button>
          </div>
        </div>   
    </>
  );
}
