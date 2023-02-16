import { useDispatch, useSelector } from "react-redux";
import { DishAction, DishState } from "../reducers/bring-dish-reducer";

export type DishListProps = {
    potlukkId: number
}

export function DishList(props: DishListProps){

    const dishes = useSelector((state: DishState) => state.dishes);
    const dispatch = useDispatch()<DishAction>

    console.log("Inside DishList: " );
    console.log(dishes);

    return <>
    
        <h3>Dishes: </h3>
        <button onClick={()=>dispatch({type:"REQUEST_POPULATE_DISHES", payload: props.potlukkId})}>Refresh Dishes</button>

        <ul>
            {dishes.map(d => <li key={d.name}>{d.name} <button>Edit</button> </li>)}
        </ul>

        <button onClick={() => dispatch({type:"REQUEST_SAVE_DISHES", payload: props.potlukkId})}>Save Dishes</button>
    
    </>

}