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

        <h3>Dishes: </h3>
        <button onClick={() => dispatch({ type: "REQUEST_POPULATE_DISHES", payload: props.potlukkId })}>Refresh Dishes</button>

        <button onClick={() => dispatch({ type: "REQUEST_SAVE_DISHES", payload: props.potlukkId })}>Save Dishes</button>

        <ul>
            {dishes.map(d => <li key={d.name}>{d.name}  --- Allergens: {d.allergens.map(a=> <b>{a} </b>)}
                <button onClick={() => {setOpenModal(true)}}>Edit</button>

                {/* if openModal is equal to true then DishModal component will render */}
                {openModal && <DishModal setOpenModal={setOpenModal} />}
                <button onClick={() => dispatch({ type: "DELETE_DISH", payload: d.name })}>x</button></li>)}
        </ul>



    </>

}