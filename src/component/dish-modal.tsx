import { stringify } from "querystring";
import { FormEvent, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bringDishReducer, DishState } from "../reducers/bring-dish-reducer";

const initialState: DishState = {
    name: "",
    description: "",
    servings: 0,
    allergens: []
}

export function DishModal() {

    const navigate = useNavigate();

    const [dishState, dispatch] = useReducer(bringDishReducer, initialState);

    async function submitData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        alert(`${dishState.name} successfully added`)
        navigate("/potlukkinfoguest/potlukkID")
    }
    
    return <div>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitData(e)}>

            <h2>Bring/Edit Dish</h2>

            <label htmlFor="name">Name</label>
            <input id="name" type="text" required onChange={e => dispatch({ type: "SET_NAME", payload: e.target.value })} />

            <label htmlFor="description">Description</label>
            <input id="description" type="text" required onChange={e => dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })} />

            <label htmlFor="servings">Serves</label>
            <input id="servings" type="number" required onChange={e => dispatch({ type: "SET_SERVINGS", payload: Number(e.target.value) })} />

            <h4>Allergens:</h4>
            <label htmlFor="milkBox">Milk</label>
            <input id="milkBox" type="checkbox" value="milk" onChange={e => dispatch({ type: "SET_ALLERGEN", payload: "MILK" })} />
            <label htmlFor="eggBox">Egg</label>
            <input id="eggBox" type="checkbox" value="egg" onChange={e => dispatch({ type: "SET_ALLERGEN", payload: "EGG" })} />
            <label htmlFor="soyBox">Soy</label>
            <input id="soyBox" type="checkbox" value="soy" onChange={e => dispatch({ type: "SET_ALLERGEN", payload: "SOY" })} />
            <label htmlFor="nutBox">Tree Nuts</label>
            <input id="nutBox" type="checkbox" value="treeNuts" onChange={e => dispatch({ type: "SET_ALLERGEN", payload: "TREE NUTS" })} />

            <button type="submit">Complete</button>
        </form>

    </div>

}