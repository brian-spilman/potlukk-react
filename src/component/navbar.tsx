import { Link } from "react-router-dom";
import { HomePage } from "../pages/home-page";


export function NavBar(){


    return <>
    
        <ul>
            <li><Link to="/home">Home</Link></li>
        </ul>
    
    </>
}