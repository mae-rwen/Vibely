import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState({});

  const [eventCat, setEventCat] = useState([]);
  const [allUsers, setAllUsers] = useState({});
  const [allEvents, setAllEvents] = useState({});


  useEffect(() => {
    axios
      .get("/users/profile")
      .then((response) => {
        setUser(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
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
        console.log(err)
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
        console.log(err)
        setAllUsers(null);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/events")
      .then((response) => {
        setAllEvents(response.data);
      })
      .catch((err) => {
        console.log(err)
        setAllEvents(null);
      });
  }, []);


  useEffect(() => {
    axios
      .get("/booking")

      .then((response) => {
        setBookings(response.data);
      })
      .catch((err) => {
        console.log(err)
        setBookings(null);
      });
  }, []);

  const login = (email, name, password) => {
    axios
      .post("/auth/login", {
        email,
        name,
        password
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err)
        setUser(null);
      });
  };

  const logout = () => {
    axios.get("/auth/logout").then((response) => {
      setUser(null);
    });
  };

  return (

    <AuthContext.Provider value={{ auth, setAuth, user, allEvents, logout, allUsers, eventCat, bookings}}>

      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
