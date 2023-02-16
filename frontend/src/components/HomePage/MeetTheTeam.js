import Alex from "./homePageImages/Alex.gif"
import Agata from "./homePageImages/Agata.gif"
import Simran from "./homePageImages/Simran.gif"
import Ola from "./homePageImages/Ola.gif"
import TeamCard from "./homePageImages/TeamCard";

export default function MeetTheTeam() {
    const agata = {
        pic: Agata,
        name: "Agata",
        desc: "The one that does Boostrap"
        };
    const alex = {
        pic: Alex,
        name: "Alex",
        desc: "The one with clouds"
        };
    const simran = {
        pic: Simran,
        name: "Simran",
        desc: "The one that knows things"
        };
    const ola = {
        pic: Ola,
        name: "Ola",
        desc: "The one that likes Boostrap"
        };
  return (
    <>    
        <div class="p-4 my-3 text-start">
            <div class="col-lg-10 mx-auto">
            <h5 class=" fw-bold">Meet the Vibely team</h5>
        <div class="row p-4 mt-4 text-center justify-content-center">
            <TeamCard member={agata} />
            <TeamCard member={ola} />
            <TeamCard member={simran} />
            <TeamCard member={alex} />
        </div>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-end">
            <button type="button" class="btn btn-outline-secondary btn-md px-4">Get to know more</button>
        </div>
        </div>
        </div>
    </>
  )
}
