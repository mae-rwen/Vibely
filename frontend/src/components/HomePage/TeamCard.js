
export default function TeamCard({member}) {
  return (
    <>
    <div className="col-lg-3">
      <img src={member.pic} alt={member.name} style={{width:"140px", borderRadius: "50%"}}/>
        <h5 className="fw-bold">{member.name}</h5>
        <p>{member.desc}</p>    
      </div>
    </>
  )
}
