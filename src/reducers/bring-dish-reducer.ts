import { DishForm } from "../component/modals/dish-modal";

export type DishState = {
    dishes: Dish[],
    dish: DishForm,
    editMode: boolean,
    nameForEdit: string
}

export type Dish = {
    name: string,
    description: string,
    broughtBy: number,
    serves: number,
    allergens: string[]
}

export type SetDishNameAction = { type: "SET_NAME", payload: string };
export type SetDishDescription = { type: "SET_DESCRIPTION", payload: string };
export type SetDishServings = { type: "SET_SERVINGS", payload: number };
export type SetDishAllergens = { type: "SET_ALLERGEN", payload: string };
export type AddDishAction = {type:"ADD_DISH", payload: Dish}
export type DeleteDishAction = {type: "DELETE_DISH", payload: string}
export type SetDishesAction = {type:"SET_DISHES", payload: Dish[]};

export type CreateDishFromFormAction = {type:"CREATE_DISH_FROM_FORM", payload: DishForm};
export type RequestPopulateDishesAction = {type:"REQUEST_POPULATE_DISHES", payload: number};
export type RequestSaveDishesAction = {type:"REQUEST_SAVE_DISHES", payload: number};

export type DishAction = SetDishNameAction | SetDishDescription | SetDishServings | AddDishAction | DeleteDishAction | SetDishAllergens | SetDishesAction | CreateDishFromFormAction | RequestPopulateDishesAction | RequestSaveDishesAction;

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


export function bringDishReducer(state: DishState = initialState, action: DishAction): DishState {

    const nextState: DishState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case "SET_NAME": {
            nextState.dish.name = action.payload;
            return nextState;
        }
        case "SET_DESCRIPTION": {
            nextState.dish.description = action.payload;
            return nextState;
        }
        case "SET_SERVINGS": {
            nextState.dish.serves = action.payload;
            return nextState;
        }
        case "SET_ALLERGEN": {
            const item = action.payload.toUpperCase();
            if (nextState.dish.allergens.includes(item)) {
                const index = nextState.dish.allergens.indexOf(item);
                nextState.dish.allergens.splice(index, 1);
                return nextState;
            }
            nextState.dish.allergens.push(item)
            return nextState;
        }
        case "ADD_DISH":{
            console.log("Add Dish in Reducer");
            nextState.dishes.push(action.payload);
            return nextState;
        }
        case "DELETE_DISH": {
            nextState.dishes = nextState.dishes.filter(dish => dish.name !== action.payload);
            return nextState;
        }
        case "SET_DISHES": {
            console.log(action.payload);
            nextState.dishes = action.payload;
            return nextState;
        }
        default:
            return nextState;
    }
}