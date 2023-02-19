import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPotlukks, updateInvite } from "../api/lukker-requests";
import { AttendeesList } from "../component/attendees-list";
import { NavBar } from "../component/navbar";


export function PotlukkDetailsGuestPage() {
    const navigate = useNavigate();

    let { potlukkID } = useParams();

    const { isLoading, isError, data = [] } = useQuery("potlukks", getAllPotlukks);

    const potlukk = data.filter(p => p.potlukkId === Number(potlukkID));
    const myPotlukk = potlukk[0];

    const date = new Date(myPotlukk.details.time * 1000);

    async function acceptInvite() {
        const lukk = updateInvite(Number(potlukkID), Number(localStorage.getItem("userId")), "ACCEPTED");
        alert("Invite accepted");
        navigate("/home");
    }
    async function declineInvite() {
        const lukk = updateInvite(Number(potlukkID), Number(localStorage.getItem("userId")), "DECLINED");
        alert("Invite declined");
        navigate("/home");
    }
    async function maybeInvite() {
        const lukk = updateInvite(Number(potlukkID), Number(localStorage.getItem("userId")), "MAYBE");
        alert("Invite status set to maybe");
        navigate("/home");
    }

    return <>

        <NavBar />
        <div className="pageContainer" style={{ margin: "100px 500px" }}>
            <div className="hostComponent" style={{ width: "600px" }}>
                <h1>You have been invited to:</h1>
                <h2>{myPotlukk.details.title}</h2>
                <br />
                <h2>Description: </h2>
                <p>{myPotlukk.details.description}</p>
                <h2>When: </h2>
                <p>{date.toString()}</p>
                <h2>Where: </h2>
                <p>{myPotlukk.details.location}</p>
                <br />
            </div>
            <div className="hostComponent">
                <AttendeesList attendees={myPotlukk.invitations} isGuest={true} />
            </div>
        </div>
        <div style={{ textAlign: "center" }}>
            <button className="updatePotlukkBtn" onClick={acceptInvite}>Accept</button> <button id="declineInviteBtn" onClick={declineInvite}>Decline</button> <button className="updatePotlukkBtn" onClick={maybeInvite}>Maybe</button>
        </div>
    </>
}