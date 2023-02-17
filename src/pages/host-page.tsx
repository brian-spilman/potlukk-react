import { FormEvent, useReducer, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { InvitedLukkerList } from "../component/invited-lukker-list";
import { LukkerInfo } from "../component/lukker-info";
import { LukkerSearch } from "../component/lukker-search";
import { NavBar } from "../component/navbar";
import { InvitationState, inviteLukkerReducer } from "../reducers/invited-lukker-reducer";
import { BasicLukker } from "../component/invited-lukker-list";
import { PotlukkCreationState, PotlukkDetails, potlukkHostReducer } from '../reducers/potlukk-host-reducer'
import { useNavigate } from "react-router-dom";
import { createPotlukk, sendInvite } from "../api/lukker-requests";
import { PotlukkConfirmationModal } from "../component/potlukk-confirmation-modal";

export type SearchForm = {
    username: string
}

export type PotlukkCreationInput = {
    details: PotlukkDetailsCreationInput,
    hostId: number
}

export type PotlukkDetailsCreationInput = {
    title: string,
    location: string,
    status: "SCHEDULED" | "CANCELLED" | "",
    description: string,
    isPublic: boolean,
    time: number,
    tags: string[]
}

const initialState: InvitationState = {
    invitedLukkers: []
}

const initialPotlukkState: PotlukkCreationState = {
    title: "",
    location: "",
    status: "",
    description: "",
    isPublic: false,
    time: 0,
    // tags: []
}



export function HostPage() {

    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const [potlukkCreationState, dispatchPotlukk] = useReducer(potlukkHostReducer, initialPotlukkState);

    const [form, setForm] = useState<SearchForm>({ username: "" });
    const [inviteState, dispatch] = useReducer(inviteLukkerReducer, initialState);


    async function submitData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // insert confirmation here
        // useState?
        //modal?????

        // if(!confirmed){
        //     return;
        // }

        let potlukk: PotlukkCreationInput = {
            details: {
                title: potlukkCreationState.title,
                location: potlukkCreationState.location,
                status: "SCHEDULED",
                description: potlukkCreationState.description,
                isPublic: potlukkCreationState.isPublic,
                time: potlukkCreationState.time,
                tags: []
            },
            hostId: Number(localStorage.getItem("userId"))
        }

        let returnPotlukk = await createPotlukk(potlukk);
        console.log(returnPotlukk.potlukkId);
        console.log(returnPotlukk.details.title);

        inviteState.invitedLukkers.map(async (luk) => sendInvite({ potlukkId: returnPotlukk.potlukkId, potlukkerId: luk.userId }));

        navigate("/home");
    }
    return <>

        <NavBar />

        <h1>Host Page</h1>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitData(e)}>

            <label htmlFor="title">Title</label>
            <input id="title" type="text" onChange={e => dispatchPotlukk({ type: "SET_TITLE", payload: e.target.value })} required />

            <input type='datetime-local' onChange={e => dispatchPotlukk({ type: "SET_TIME", payload: ((Date.parse(e.target.value)) / 1000) })} required />

            <label htmlFor="location">Location</label>
            <input type="text" onChange={e => dispatchPotlukk({ type: "SET_LOCATION", payload: e.target.value })} required />

            <label htmlFor="description">Description</label>
            <input type="text" onChange={e => dispatchPotlukk({ type: "SET_DESCRIPTION", payload: e.target.value })} required />

            <label htmlFor="isPublic">Make Public</label>
            <input id="isPublic" type="checkbox" onChange={e => dispatchPotlukk({ type: "SET_PUBLIC", payload: e.target.checked })} />

            <button onClick={ (e) => {e.preventDefault();setOpenModal(true)} }>Create</button>
            {openModal && <PotlukkConfirmationModal setOpenModal={setOpenModal} submitData={submitData} />}

        </form>
        




        <input type="text" placeholder="Search Lukkers" onChange={e => setForm({ ...form, username: e.target.value })} />

        <LukkerSearch usernameToSearch={form.username} dispatch={dispatch} />

        <InvitedLukkerList invitedLukkers={inviteState.invitedLukkers} dispatch={dispatch} />

    </>
}