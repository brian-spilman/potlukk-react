import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getAllPotlukks, updateInvite } from "../api/lukker-requests";
import { AttendeesList } from "../component/attendees-list";
import { NavBar } from "../component/navbar";


export function PotlukkDetailsGuestPage() {

    let { potlukkID } = useParams();

    const {isLoading, isError, data = []} = useQuery("potlukks", getAllPotlukks);

    const potlukk = data.filter(p => p.potlukkId === Number(potlukkID));
    const myPotlukk = potlukk[0];

    const date = new Date(myPotlukk.details.time * 1000);

    async function acceptInvite(){
        const lukk = updateInvite(Number(potlukkID), Number(localStorage.getItem("userId")), "ACCEPTED");
    }
    async function declineInvite(){
        const lukk = updateInvite(Number(potlukkID), Number(localStorage.getItem("userId")), "DECLINED");
    }
    async function maybeInvite(){
        const lukk = updateInvite(Number(potlukkID), Number(localStorage.getItem("userId")), "MAYBE");
    }

    return <>

        <NavBar/>
    
        <h1>Potlukk Details Guest</h1>
        <h2><b>{myPotlukk.details.title}</b></h2>
        <h3>{myPotlukk.details.description}</h3>
        <h2>Location: </h2>
        <h3>{myPotlukk.details.location}</h3>
        <h2>Time: </h2>
        <h3>{date.toString()}</h3>

        <button onClick={acceptInvite}>Accept</button>
        <button onClick={declineInvite}>Decline</button>
        <button onClick={maybeInvite}>Maybe</button>

        <AttendeesList attendees={myPotlukk.invitations} isGuest={true} />

    </>
}