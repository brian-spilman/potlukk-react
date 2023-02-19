import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { getAllPotlukks, PotlukkDetailsSwapInput, updatePotlukk } from "../api/lukker-requests";
import { AttendeesList } from "../component/attendees-list";
import { NavBar } from "../component/navbar";
import { DishModal } from "../component/modals/dish-modal";
import { FormEvent, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DishAction, DishState } from "../reducers/bring-dish-reducer";
import { DishList } from "../component/dish-list";
import { PotlukkCreationState, potlukkHostReducer } from "../reducers/potlukk-host-reducer";

const initialPotlukkState: PotlukkDetailsSwapInput = {
    potlukkId: 0,
    title: "",
    location: "",
    status: "",
    description: "",
    isPublic: false,
    time: 0,
    tags: []
}

export function PotlukkDetailsHostPage() {

    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    let { potlukkID } = useParams();

    const { isLoading, isError, data = [] } = useQuery("potlukks", getAllPotlukks);
    const potlukk = data.filter(p => p.potlukkId === Number(potlukkID));
    const myPotlukk = potlukk[0];

    const [potlukkUpdateState, dispatch] = useReducer(potlukkHostReducer, initialPotlukkState);

    const date = new Date(myPotlukk.details.time * 1000);

    function quitEditing() {
        navigate("/home");
    }

    async function submitData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let potlukk: PotlukkDetailsSwapInput = {
            title: potlukkUpdateState.title,
            location: potlukkUpdateState.location,
            status: "SCHEDULED",
            description: potlukkUpdateState.description,
            isPublic: potlukkUpdateState.isPublic,
            time: potlukkUpdateState.time,
            tags: [],
            potlukkId: Number(potlukkID)
        }
        if (potlukk.title === "") {
            potlukk.title = myPotlukk.details.title;
        }
        if (potlukk.description === "") {
            potlukk.description = myPotlukk.details.description;
        }
        if (potlukk.location === "") {
            potlukk.location = myPotlukk.details.location;
        }
        if (potlukk.time === 0) {
            potlukk.time = myPotlukk.details.time;
        }

        let returnPotlukk = await updatePotlukk(potlukk);
        console.log(returnPotlukk.potlukkId);
        console.log(returnPotlukk.details.title);

        navigate("/home");
    }

    async function cancelPotlukk(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let potlukk: PotlukkDetailsSwapInput = {
            title: potlukkUpdateState.title,
            location: potlukkUpdateState.location,
            status: "CANCELLED",
            description: potlukkUpdateState.description,
            isPublic: potlukkUpdateState.isPublic,
            time: potlukkUpdateState.time,
            tags: [],
            potlukkId: Number(potlukkID)
        }
        if (potlukk.title === "") {
            potlukk.title = myPotlukk.details.title;
        }
        if (potlukk.description === "") {
            potlukk.description = myPotlukk.details.description;
        }
        if (potlukk.location === "") {
            potlukk.location = myPotlukk.details.location;
        }
        if (potlukk.time === 0) {
            potlukk.time = myPotlukk.details.time;
        }

        let returnPotlukk = await updatePotlukk(potlukk);
        console.log(returnPotlukk.potlukkId);
        console.log(returnPotlukk.details.title);

        navigate("/home");
    }

    return <>


        <NavBar />
        <div style={{ width: "1200px", margin: "100px 400px" }}>
            <h1>Edit Potlukk</h1>
            <div className="hostComponent" style={{ width: "220px" }}>
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitData(e)}>
                    <li>
                        <label htmlFor="title">{myPotlukk.details.title}</label>
                    </li>
                    <li>
                        <input id="title" type="text" placeholder="New Title" onChange={e => dispatch({ type: "SET_TITLE", payload: e.target.value })}
                            className="potlukkInput"
                        />
                    </li>
                    <li>
                        <label htmlFor="description">{myPotlukk.details.description}</label>
                    </li>
                    <li>
                        <input type="text" placeholder="New Description" onChange={e => dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })}
                            className="potlukkInput"
                        />
                    </li>
                    <li>
                        <label htmlFor="location">{myPotlukk.details.location}</label>
                    </li>
                    <li>
                        <input type="text" placeholder="New Location" onChange={e => dispatch({ type: "SET_LOCATION", payload: e.target.value })}
                            className="potlukkInput"
                        />
                    </li>
                    <li>
                        <label htmlFor="dateField">{date.toString()}</label>
                    </li>
                    <li>
                        <input id="dateField" type='datetime-local' onChange={e => dispatch({ type: "SET_TIME", payload: ((Date.parse(e.target.value)) / 1000) })}
                            className="potlukkInput"
                        />
                    </li>
                    <li>
                        <label htmlFor="isPublic">Make Public </label>
                        <input id="isPublic" type="checkbox" onChange={e => dispatch({ type: "SET_PUBLIC", payload: e.target.checked })}
                            className="checkbox"
                        />
                    </li>
                    <br />
                    <li>
                        <button type="submit" className="updatePotlukkBtn">Update</button>
                        <button onClick={quitEditing} className="updatePotlukkBtn">Quit Editing</button>
                    </li>
                </form>
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => cancelPotlukk(e)}>
                    <button type="submit" id="cancelPotlukkBtn">Cancel Event</button>
                </form>
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
            <div className="hostComponent">
                <AttendeesList attendees={myPotlukk.invitations} isGuest={false} />
                <button className="updatePotlukkBtn">Invite</button>
            </div>
        </div>
    </>
}