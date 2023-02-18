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
}



export function HostPage() {

    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const [potlukkCreationState, dispatchPotlukk] = useReducer(potlukkHostReducer, initialPotlukkState);

    const [form, setForm] = useState<SearchForm>({ username: "" });
    const [inviteState, dispatch] = useReducer(inviteLukkerReducer, initialState);


    async function submitData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

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

        <div style={{ width: "1200px", margin: "auto 500px" }}>
            <h1>Host a Potlukk</h1>
            <div className="hostComponent">
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitData(e)}>
                    <ul style={{ listStyle: "none" }}>
                        <li>
                            <label htmlFor="title">Title </label>
                        </li>
                        <li>
                            <input id="title" type="text" onChange={e => dispatchPotlukk({ type: "SET_TITLE", payload: e.target.value })}
                                style={{ height: "20px", width: "200px" }}
                                required
                            />
                        </li>
                        <br />
                        <li>
                            <label htmlFor="time">Time </label>
                        </li>
                        <li>
                            <input id="time" type='datetime-local' onChange={e => dispatchPotlukk({ type: "SET_TIME", payload: ((Date.parse(e.target.value)) / 1000) })}
                                style={{ height: "20px", width: "200px" }}
                                required
                            />
                        </li>
                        <br />
                        <li>
                            <label htmlFor="location">Location </label>
                        </li>
                        <input type="text" onChange={e => dispatchPotlukk({ type: "SET_LOCATION", payload: e.target.value })}
                            style={{ height: "20px", width: "200px" }}
                            required
                        />
                        <br /><br />
                        <li>
                            <label htmlFor="description">Description </label>
                        </li>
                        <li>
                            <input type="text" onChange={e => dispatchPotlukk({ type: "SET_DESCRIPTION", payload: e.target.value })}
                                style={{ height: "20px", width: "200px" }}
                                required
                            />
                        </li>
                        <br />
                        <li>
                            <label htmlFor="isPublic">Make Public </label>
                            <input id="isPublic" type="checkbox" onChange={e => dispatchPotlukk({ type: "SET_PUBLIC", payload: e.target.checked })}
                                className="checkbox"
                            />
                        </li>
                        <br />
                        <button className="bigBtn" onClick={(e) => { e.preventDefault(); setOpenModal(true) }}>
                            Create
                        </button>
                        {openModal && <PotlukkConfirmationModal setOpenModal={setOpenModal} submitData={submitData} />}
                    </ul>
                </form>
            </div>
            <div className="hostComponent">
                <input type="text" placeholder="Search Lukkers" onChange={e => setForm({ ...form, username: e.target.value })}
                    style={{ height: "20px", width: "200px" }}
                />

                <LukkerSearch usernameToSearch={form.username} dispatch={dispatch} />

                <InvitedLukkerList invitedLukkers={inviteState.invitedLukkers} dispatch={dispatch} />
            </div>
        </div>


    </>
}