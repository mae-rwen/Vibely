import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <div className="d-flex flex-column bg-light">
      <div className=" p-2 d-flex gap-3 justify-content-center ">
        <NavLink to="/" className="text-decoration-none text-dark">
          About us
        </NavLink>
        <NavLink to="/" className="text-decoration-none text-dark">
          About us
        </NavLink>
        <NavLink to="/" className="text-decoration-none text-dark">
          About us
        </NavLink>
        <NavLink to="/" className="text-decoration-none text-dark">
          About us
        </NavLink>
      </div>
      <div className="text-center">&copy; 2023 Vibely</div>
    </div>
  );
}
