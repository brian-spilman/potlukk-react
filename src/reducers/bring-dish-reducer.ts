export type DishState = {
    name: string,
    description: string,
    servings: number,
    allergens: string[]
}

export type setDishNameAction = { type: "SET_NAME", payload: string };
export type setDishDescription = { type: "SET_DESCRIPTION", payload: string };
export type setDishServings = { type: "SET_SERVINGS", payload: number };
export type setDishAllergens = { type: "SET_ALLERGEN", payload: string };
export type DishAction = setDishNameAction | setDishDescription | setDishServings | setDishAllergens

const initialState: DishState = {
    name: "",
    description: "",
    servings: 0,
    allergens: []
}


export function bringDishReducer(state: DishState = initialState, action: DishAction): DishState {

    const nextState: DishState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case "SET_NAME": {
            nextState.name = action.payload;
            return nextState;
        }
        case "SET_DESCRIPTION": {
            nextState.description = action.payload;
            return nextState;
        }
        case "SET_SERVINGS": {
            nextState.servings = action.payload;
            return nextState;
        }
        case "SET_ALLERGEN": {
            const item = action.payload.toUpperCase();
            if (nextState.allergens.includes(item)) {
                const index = nextState.allergens.indexOf(item);
                nextState.allergens.splice(index, 1);
                return nextState;
            }
            nextState.allergens.push(item)
            return nextState;
        }
    }
}