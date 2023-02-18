import { Link, useNavigate } from "react-router-dom";
import { HomePage } from "../pages/home-page";
import logout from "../style/images/logout.png"
import user from "../style/images/user.png"


export function NavBar() {

    const navigate = useNavigate();

    function logoutFunc() {
        localStorage.clear();
        navigate("/");
    }


    return <div style={{ backgroundColor: "#0085fc", color: "white", height: "50px", padding: "5px" }}>
        <ul style={{ listStyle: "none" }}>
            <li id="username">{localStorage.getItem("username")}</li>
            <span style={{paddingLeft: "100px"}}>
                <li className="navBarItem"><Link to="/home">Home</Link></li>
                <li className="navBarItem"><Link to="/host">Host</Link></li>
                <li className="navBarItem"><a href="">Invitations</a></li>
            </span>
            <a id="logoutBtn" href="" onClick={logoutFunc}>
                Logout <img src={logout} style={{ height: "15px" }} />
            </a>
        </ul>
    </div>
}