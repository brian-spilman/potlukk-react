import { stringify } from "querystring";
import { Dispatch, FormEvent, SetStateAction, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bringDishReducer, DishAction, DishState } from "../../reducers/bring-dish-reducer";

export type DishForm = {
    name: string,
    description: string,
    broughtBy: number,
    serves: number,
    allergens: string[]
}

const initialState: DishState = {
    editMode: false,
    nameForEdit: "",
    dishes: [],
    dish: {
        name: "",
        description: "",
        broughtBy: 0,
        serves: 0,
        allergens: []
    }
}

export function DishModal({setOpenModal}: {setOpenModal: any}) {


    const [dishState, dispatch] = useReducer(bringDishReducer, initialState);
    //const [form, setForm] = useState<DishForm>(initialState)
    const dispatch2 = useDispatch()<DishAction>;

    // event: FormEvent<HTMLFormElement>
    //(e: FormEvent<HTMLFormElement>) => submitData(e)

    async function submitData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        //console.log(dishState.dish);
        
        console.log("In dish submit function");
        dispatch2({type:"CREATE_DISH_FROM_FORM", payload: dishState.dish});

        // alert(`${dishState.dish.name} successfully added to potlukk!`)
        setOpenModal(false);
    }
    
    return <div>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitData(e)}>

            <h2>Bring/Edit Dish</h2>

            <label htmlFor="name">Name</label>
            <input id="name" type="text" required onChange={e => dispatch({type:"SET_NAME", payload:e.target.value})} />

            <label htmlFor="description">Description</label>
            <input id="description" type="text" required onChange={e => dispatch({type:"SET_DESCRIPTION", payload:e.target.value})} />

            <label htmlFor="servings">Serves</label>
            <input id="servings" type="number" required onChange={e => dispatch({type:"SET_SERVINGS", payload:Number(e.target.value)})} />

            <h4>Allergens:</h4>
            <label htmlFor="milkBox">Milk</label>
            <input id="milkBox" type="checkbox" value="milk" onChange={e => dispatch({ type: "SET_ALLERGEN", payload: "MILK" })} />
            <label htmlFor="eggBox">Egg</label>
            <input id="eggBox" type="checkbox" value="egg" onChange={e => dispatch({ type: "SET_ALLERGEN", payload: "EGG" })} />
            <label htmlFor="soyBox">Soy</label>
            <input id="soyBox" type="checkbox" value="soy" onChange={e => dispatch({ type: "SET_ALLERGEN", payload: "SOY" })} />
            <label htmlFor="nutBox">Tree Nuts</label>
            <input id="nutBox" type="checkbox" value="treeNuts" onChange={e => dispatch({ type: "SET_ALLERGEN", payload: "TREENUT" })} />

            <button type="submit">Complete</button>
            
        </form>

    </div>

}