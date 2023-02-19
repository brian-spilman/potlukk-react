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

export function DishModal({ setOpenModal }: { setOpenModal: any }) {


    const [dishState, dispatch] = useReducer(bringDishReducer, initialState);
    //const [form, setForm] = useState<DishForm>(initialState)
    const dispatch2 = useDispatch()<DishAction>;

    // event: FormEvent<HTMLFormElement>
    //(e: FormEvent<HTMLFormElement>) => submitData(e)

    async function submitData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        //console.log(dishState.dish);

        console.log("In dish submit function");
        dispatch2({ type: "CREATE_DISH_FROM_FORM", payload: dishState.dish });

        // alert(`${dishState.dish.name} successfully added to potlukk!`)
        setOpenModal(false);
    }

    return <>
        <div id="dishModalStyles">
        <button onClick={() => { setOpenModal(false) }} id="exitBtn">x</button>
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitData(e)}>
                <div style={{ display: "inline-block", verticalAlign: "middle" }}>

                    <h2>Bring/Edit Dish</h2>
                    <li>
                        <label htmlFor="name">Name</label>
                    </li>
                    <li>
                        <input id="name" type="text" required onChange={e => dispatch({ type: "SET_NAME", payload: e.target.value })} className="potlukkInput" />
                    </li>
                    <li>
                        <label htmlFor="description">Description</label>
                    </li>
                    <li>
                        <input id="description" type="text" required onChange={e => dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })} className="potlukkInput" />
                    </li>
                    <li>
                        <label htmlFor="servings">Serves</label>
                    </li>
                    <li>
                        <input id="servings" type="number" required onChange={e => dispatch({ type: "SET_SERVINGS", payload: Number(e.target.value) })} className="potlukkInput" />
                    </li>
                </div>
                <div style={{ display: "inline-block", verticalAlign: "middle", margin: "auto", padding: "34px" }}>
                    <h4>Allergens:</h4>
                    <div style={{ border: "1px solid #A9A9A9" }}>
                        <ul style={{ width: "140px", height: "130px" }}>
                            <li>
                                <label htmlFor="milkBox">Milk </label>
                                <input id="milkBox" type="checkbox" value="milk" onChange={e => dispatch({ type: "SET_ALLERGEN", payload: "MILK" })} />
                            </li>
                            <li>
                                <label htmlFor="eggBox">Egg </label>
                                <input id="eggBox" type="checkbox" value="egg" onChange={e => dispatch({ type: "SET_ALLERGEN", payload: "EGG" })} />
                            </li>
                            <li>
                                <label htmlFor="soyBox">Soy </label>
                                <input id="soyBox" type="checkbox" value="soy" onChange={e => dispatch({ type: "SET_ALLERGEN", payload: "SOY" })} />
                            </li>
                            <li>
                                <label htmlFor="nutBox">Tree Nuts </label>
                                <input id="nutBox" type="checkbox" value="treeNuts" onChange={e => dispatch({ type: "SET_ALLERGEN", payload: "TREENUT" })} />
                            </li>
                        </ul>
                        <br />
                    </div>
                </div>
                <button type="submit" className="bigBtn" style={{display: "block", margin: "auto" }}>Complete</button>
            </form>
        </div>

    </>

}