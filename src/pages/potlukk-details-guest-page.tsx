import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPotlukks, updateInvite } from "../api/lukker-requests";
import { AttendeesList } from "../component/attendees-list";
import { DishList } from "../component/dish-list";
import { DishModal } from "../component/modals/dish-modal";
import { NavBar } from "../component/navbar";


export function PotlukkDetailsGuestPage() {

    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);

    let { potlukkID } = useParams();

    const { isLoading, isError, data = [] } = useQuery("potlukks", getAllPotlukks);

    const potlukk = data.filter(p => p.potlukkId === Number(potlukkID));
    const myPotlukk = potlukk[0];

    const date = new Date(myPotlukk.details.time * 1000);

    async function acceptInvite() {
        const lukk = updateInvite(Number(potlukkID), Number(localStorage.getItem("userId")), "ACCEPTED");
        alert("Invite accepted");
    }
    async function declineInvite() {
        const lukk = updateInvite(Number(potlukkID), Number(localStorage.getItem("userId")), "DECLINED");
        alert("Invite declined");
        navigate("/home");
    }
    async function maybeInvite() {
        const lukk = updateInvite(Number(potlukkID), Number(localStorage.getItem("userId")), "MAYBE");
        alert("Invite status set to maybe");
    }

    return <>

        <NavBar />
        <div style={{ width: "1400px", margin: "100px 300px" }}>
            <h1 style={{ marginLeft: "30px" }}>{myPotlukk.details.title}</h1>
            <div className="hostComponent" style={{ width: "447px" }}>
                <br />
                <h2>Description: </h2>
                <p>{myPotlukk.details.description}</p>
                <h2>When: </h2>
                <p>{date.toString()}</p>
                <h2>Where: </h2>
                <p>{myPotlukk.details.location}</p>
                <br />
                <button className="updatePotlukkBtn" onClick={acceptInvite}>Accept</button> <button id="declineInviteBtn" onClick={declineInvite}>Decline</button> <button className="updatePotlukkBtn" onClick={maybeInvite}>Maybe</button>
            </div>
            <div className="hostComponent">
                <h2>Dishes</h2>
                <button onClick={() => { setOpenModal(true) }}
                    className="updatePotlukkBtn">Bring Dish
                </button>

                <DishList potlukkId={Number(potlukkID)} />

                {/* if openModal is equal to true then DishModal component will render */}
                {openModal && <DishModal setOpenModal={setOpenModal} />}
            </div>
            <div className="hostComponent" style={{ width: "300px" }}>
                <AttendeesList attendees={myPotlukk.invitations} isGuest={true} />
            </div>
        </div>
    </>
}