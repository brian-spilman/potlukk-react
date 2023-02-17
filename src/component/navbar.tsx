import { Link, useNavigate } from "react-router-dom";
import { HomePage } from "../pages/home-page";


export function NavBar(){

    const navigate = useNavigate();

    function logoutFunc(){
        localStorage.clear();
        navigate("/");
    }


    return <>

        <h2>Welcome {localStorage.getItem("username")}</h2>
    
        <h3>Navigation:</h3>
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/host">Host</Link></li>
            <button onClick={logoutFunc}>Logout</button>
        </ul>
    
    </>
}