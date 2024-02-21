import { UserContext } from "../context/userContext";
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  setCurrentUser(null);
  navigate('/login')

  return <></>;
}

export default Logout;
