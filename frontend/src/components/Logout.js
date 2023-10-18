import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { useAuth } from "../service/AuthContextProvider";


const Logout = () => {
  const {logout } = useAuth();
    const navigate = useNavigate(); 

    function handleLogout() {
      logout();
      navigate("/")
    }

  return (
    <Container fluid className="d-flex justify-content-end logout">
      <Button className="btn btn-danger mx-2" onClick={() => handleLogout()}>
        <div className="logout-icon">Logout</div>
      </Button>
    </Container>
  );
};
export default Logout;
