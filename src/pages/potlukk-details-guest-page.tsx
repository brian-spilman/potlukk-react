import { useParams } from "react-router-dom";
import { NavBar } from "../component/navbar";


export function PotlukkDetailsGuestPage() {

    let { userId } = useParams();

    return <>

        <NavBar/>
    
        <h1>Potlukk Details Guest</h1>
    
    </>
}