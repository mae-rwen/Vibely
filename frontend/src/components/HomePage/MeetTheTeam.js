import Agata from "./pics/Agata.png";
import Simran from "./pics/Simran.png";
import Ola from "./pics/Ola.png";
import TeamCard from "./TeamCard";

export default function MeetTheTeam() {
  const agata = {
    pic: Agata,
    name: "Agata",
    desc: "The affirmative one",
    github: "http://github.com",
    linkedin: "http://linkedin.com",
  };
  const simran = {
    pic: Simran,
    name: "Simran",
    desc: "With the fresh ideas",
    github: "http://github.com",
    linkedin: "http://linkedin.com",
  };
  const ola = {
    pic: Ola,
    name: "Aleksandra",
    desc: "Always smiling",
    github: "http://github.com",
    linkedin: "http://linkedin.com",
  };
  return (
    <>      
        <div className="hpSection">
          <h5 className="fw-bold">Meet the Vibely team</h5>
          <div className="row p-4 mt-4 text-center justify-content-center teamIntro">
            <TeamCard member={agata} />
            <TeamCard member={simran} />
            <TeamCard member={ola} />
          </div>
        </div>   
    </>
  );
}
