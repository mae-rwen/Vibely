
export default function TeamCard({member}) {
  return (
    <>
    <div class="col-lg-3">
      <img src={member} alt={member} style={{width:"140px", borderRadius: "50%"}}/>
        <h3 class="fw-normal">{member}</h3>
        <p>{member}</p>    
      </div>
    </>
  )
}
