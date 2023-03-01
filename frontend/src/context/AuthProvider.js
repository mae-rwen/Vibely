import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState();
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
        setAllEvents(null);
      });
  }, []);

  //   do I need it if I have it in login form?
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
        setUser(null);
      });
  };

  const logout = () => {
    axios.get("/auth/logout").then((response) => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        user,
        allEvents,
        logout,
        login,
        allUsers,
        eventCat,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
