
export default function TeamCard({member}) {
  return (
    <>
    <div class="col-lg-3">
      <img src={member.pic} alt={member.name} style={{width:"140px", borderRadius: "50%"}}/>
        <h3 class="fw-normal">{member.name}</h3>
        <p>{member.desc}</p>    
      </div>
    </>
  )
}
