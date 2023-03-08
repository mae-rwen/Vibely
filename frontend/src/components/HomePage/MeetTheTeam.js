import Agata from "./pics/Agata.png";
import Simran from "./pics/Simran.png";
import Ola from "./pics/Ola.png";
import TeamCard from "./TeamCard";

export default function MeetTheTeam() {
  const agata = {
    pic: Agata,
    name: "Agata",
    desc: "The affirmative one",
    github: "https://github.com/mae-rwen",
    linkedin: "https://www.linkedin.com/in/agata-thrams/",
  };
  const simran = {
    pic: Simran,
    name: "Simran",
    desc: "With the fresh ideas",
    github: "https://github.com/SimranSuky",
    linkedin: "https://www.linkedin.com/in/simran-suky-kaur",
  };
  const ola = {
    pic: Ola,
    name: "Aleksandra",
    desc: "Always smiling",
    github: "https://github.com/marczewska",
    linkedin: "https://www.linkedin.com/in/marczewska-aleksandra",
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
