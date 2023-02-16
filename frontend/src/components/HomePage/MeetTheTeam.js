import Alex from "./homePageImages/Alex.gif"
import Agata from "./homePageImages/Agata.gif"
import Simran from "./homePageImages/Simran.gif"
import Ola from "./homePageImages/Ola.gif"
import TeamCard from "./homePageImages/TeamCard";

export default function MeetTheTeam() {
    const agata = Agata;
    const alex = Alex;
    const simran = Simran;
    const ola = Ola;
  return (
    <>    
        <div class="p-4 my-3 text-start">
            <div class="col-lg-10 mx-auto">
            <h5 class=" fw-bold">Meet the Vibely team</h5>
        <div class="row p-4 mt-4 text-center justify-content-center">
        {/* <TeamCard member={agata} /> */}
        <div class="col-lg-3">
        <img src={Agata} alt="Agata" style={{width:"140px", borderRadius: "50%"}}/>
            <h3 class="fw-normal">Agata</h3>
            <p>The one that does Boostrap</p>        
        </div>
        <div class="col-lg-3">
        <img src={Ola} alt="Ola" style={{width:"140px", borderRadius: "50%"}}/>
            <h3 class="fw-normal">Aleksandra</h3>
            <p>The one that likes Boostrap</p>        
        </div>
        <div class="col-lg-3">
        <img src={Simran} alt="Simran" style={{width:"140px", borderRadius: "50%"}}/>
            <h3 class="fw-normal">Simran</h3>
            <p>The one that knows things</p>        
        </div>
        <div class="col-lg-3">
            <img src={Alex} alt="Alex" style={{width:"140px", borderRadius: "50%"}}/>
            <h3 class="fw-normal">Alex</h3>
            <p>The one with clouds</p>        
        </div>      
        </div>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-end">
            <button type="button" class="btn btn-outline-secondary btn-md px-4">Get to know more</button>
        </div>
        </div>
        </div>
    </>
  )
}
