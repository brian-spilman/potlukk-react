import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getAllPotlukks } from "../api/lukker-requests";
import { AttendeesList } from "../component/attendees-list";
import { NavBar } from "../component/navbar";


export function PotlukkDetailsGuestPage() {

    let { potlukkID } = useParams();

    const {isLoading, isError, data = []} = useQuery("potlukks", getAllPotlukks);

    const potlukk = data.filter(p => p.potlukkId === Number(potlukkID));
    const myPotlukk = potlukk[0];

    return <>

        <NavBar/>
    
        <h1>Potlukk Details Guest</h1>

        <AttendeesList attendees={myPotlukk.invitations} isGuest={true} />

        <button>Invite</button>
    
    </>
}