import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { getAllPotlukks, PotlukkDetailsSwapInput, updatePotlukk } from "../api/lukker-requests";
import { AttendeesList } from "../component/attendees-list";
import { NavBar } from "../component/navbar";
import { DishModal } from "../component/dish-modal";
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
    let {potlukkID} = useParams(); 

    const {isLoading, isError, data = []} = useQuery("potlukks", getAllPotlukks);
    const potlukk = data.filter(p => p.potlukkId === Number(potlukkID));
    const myPotlukk = potlukk[0];

    const [potlukkUpdateState, dispatch] = useReducer(potlukkHostReducer, initialPotlukkState);

    const date = new Date(myPotlukk.details.time * 1000);

    function quitEditing(){
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
        if(potlukk.title===""){
            potlukk.title = myPotlukk.details.title;
        }
        if(potlukk.description===""){
            potlukk.description = myPotlukk.details.description;
        }
        if(potlukk.location===""){
            potlukk.location = myPotlukk.details.location;
        }
        if(potlukk.time===0){
            potlukk.time = myPotlukk.details.time;
        }

        let returnPotlukk = await updatePotlukk(potlukk);
        console.log(returnPotlukk.potlukkId);
        console.log(returnPotlukk.details.title);

        navigate("/home");
    }

    return <>
    

        <NavBar />
        <form onSubmit={(e:FormEvent<HTMLFormElement>) => submitData(e)}>
            <h2>Title: {myPotlukk.details.title}</h2>
            <input type="text" placeholder="New Title" onChange={e => dispatch({ type: "SET_TITLE", payload: e.target.value })}/>
            <hr/>
            <label htmlFor="description">Description: {myPotlukk.details.description}</label>
            <hr />
            <input type="text" placeholder="New Description" onChange={e => dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })}/>
            <hr />
            <label htmlFor="location">Location: {myPotlukk.details.location}</label>
            <hr />
            <input type="text" placeholder="New Location" onChange={e => dispatch({ type: "SET_LOCATION", payload: e.target.value })}/>
            <hr />
            <label htmlFor="dateField">Date: {date.toString()}</label>
            <hr />
            <input id="dateField" type='datetime-local' onChange={e => dispatch({ type: "SET_TIME", payload: ((Date.parse(e.target.value))/1000) })}/>
            <hr />
            <label htmlFor="isPublic">Make Public</label>
            <input id="isPublic" type="checkbox" onChange={e => dispatch({ type: "SET_PUBLIC", payload: e.target.checked })}/>
            <hr />
            <button type="submit">Update</button>

        </form>

        
        <button onClick={quitEditing}>Quit Editing</button>


        <DishList potlukkId={Number(potlukkID)}/>

        <button onClick={() => {setOpenModal(true)}}>Bring Dish</button>
        {/* if openModal is equal to true then DishModal component will render */}
        {openModal && <DishModal setOpenModal={setOpenModal}/>}

        <button>Request Dish</button>

        <AttendeesList attendees={myPotlukk.invitations} isGuest={false} />

        <button>Invite</button>

    </>
}