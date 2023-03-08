import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});

  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);

  const [eventCat, setEventCat] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [joined, setJoined] = useState([]);
  const [created, setCreated] = useState([]);

  useEffect(() => {
    axios
      .get("/users/profile")
      .then((response) => {
        setUser(response.data);
        axios.get(`/booking?user=${response.data._id}`).then((response) => {
          setJoined(response.data);
        });
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        setEventCat(response.data);
      })
      .catch((err) => {
        console.log(err);
        setEventCat(null);
      });
  }, []);

  useEffect((name, _id, email) => {
    axios
      .get("/users", {
        name,
        _id,
        email,
      })
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
        setAllUsers(null);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/booking")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((err) => {
        console.log(err);
        setBookings(null);
      });
  }, []);

  const login = (email, name, password) => {
    axios
      .post("/auth/login", {
        email,
        name,
        password,
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
      });
  };

  const logout = () => {
    axios.post("/auth/logout").then((response) => {
      setUser(null);
      setAuth(null);
      navigate("/loggedOut");
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        user,
        setUser,

        logout,
        allUsers,
        eventCat,
        bookings,
        joined,
        created,
        setCreated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
