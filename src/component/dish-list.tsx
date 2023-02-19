import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DishAction, DishState, Dish } from "../reducers/bring-dish-reducer";
import { DishModal } from "./modals/dish-modal";

export type DishListProps = {
    potlukkId: number
}

export function DishList(props: DishListProps) {


    const dishes = useSelector((state: DishState) => state.dishes);
    const dispatch = useDispatch()<DishAction>

    const [openModal, setOpenModal] = useState(false);

    console.log("Inside DishList: ");
    console.log(typeof dishes);
    console.log(dishes);

    return <>
        <div id="dishListDivStyles">
            <ul>
                {dishes.map(d => <li key={d.name}>
                    <span style={{ fontWeight: "bold", fontSize: "19px" }}>{d.name}: </span>
                    <button onClick={() => { setOpenModal(true) }} className="inviteBtn">Edit</button>
                    {/* if openModal is equal to true then DishModal component will render */}
                    {openModal && <DishModal setOpenModal={setOpenModal} />} <button
                        onClick={() => dispatch({ type: "DELETE_DISH", payload: d.name })}
                        className="removeBtn"
                    >Remove</button>
                    <br />
                    allergens:
                    {d.allergens.map(a =>
                        <span style={{ fontWeight: "bold", color: "red" }}> {a} </span>)}
                </li>)}
            </ul>
        </div>
        <button onClick={() => dispatch({ type: "REQUEST_SAVE_DISHES", payload: props.potlukkId })}
            className="updatePotlukkBtn"
        >Save</button>

        <button onClick={() => dispatch({ type: "REQUEST_POPULATE_DISHES", payload: props.potlukkId })}
            id="refreshBtn"
        >↺</button>
    </>

}