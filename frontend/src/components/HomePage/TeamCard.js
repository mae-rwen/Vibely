export default function TeamCard({ member }) {
  return (
    <>
      <div className="col-lg-3 teamCard">
        <img
          src={member.pic}
          alt={member.name}
          style={{ width: "140px", borderRadius: "50%" }}
        />
        <h5 className="fw-bold">{member.name}</h5>
        <p>{member.desc}</p>

        <a href={member.github}>Github</a>

        <a href={member.linkedin}>Linkedin</a>
      </div>
    </>
  );
}
