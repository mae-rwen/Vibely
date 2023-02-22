import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";

const Layout = () => {
    return (
        <Container className="mainContainer">
            <Outlet />
        </Container>
    )
}

export default Layout