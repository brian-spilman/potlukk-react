import {takeEvery, put, all, select} from "@redux-saga/core/effects"
import { getAllPotlukks, saveDishes } from "../api/lukker-requests";
import { Dish, Potlukk } from "../component/hosted-potlukks-list";
import { CreateDishFromFormAction, RequestPopulateDishesAction, RequestSaveDishesAction } from "../reducers/bring-dish-reducer";

export function* createDishFromFormData(action:CreateDishFromFormAction){
    console.log("CREATE DISH FORM");
    const dish: Dish = {
        name: action.payload.name,
        description: action.payload.description,
        broughtBy: 0,
        serves: action.payload.serves,
        allergens: action.payload.allergens
    }

    console.log(dish);

    yield put({type:"ADD_DISH", payload: dish});
}

export function* populateDishes(action: RequestPopulateDishesAction){
    console.log("In populate saga function");
    const potlukksArr : Potlukk[] = yield getAllPotlukks();
    const potlukk = potlukksArr.filter(p => p.potlukkId === action.payload);
    const myPotlukk = potlukk[0];

    const dishes: Dish[] = myPotlukk.dishes;
    yield put({type:"SET_DISHES", payload:dishes});
}

export function* updateDishes(action: RequestSaveDishesAction){
    const dishes: Dish[] = yield select(store => store.dishes);
    //console.log(dishes);
    const potlukk: Potlukk = yield saveDishes(dishes, action.payload);
    console.log("IN UPDATE DISHES");
    console.log(potlukk.dishes);
    yield put({type:"SET_DISHES", payload:potlukk.dishes});
}

export function* watchCreateFromFormData(){
    //console.log("In watcher create dish form");
    yield takeEvery("CREATE_DISH_FROM_FORM", createDishFromFormData);
}

export function* watchPopulateDishes(){
    yield takeEvery("REQUEST_POPULATE_DISHES", populateDishes);
}

export function* watchSavedTodos(){
    yield takeEvery("REQUEST_SAVE_DISHES", updateDishes);
}

export function* rootSaga(){
    yield all([watchCreateFromFormData(), watchPopulateDishes(), watchSavedTodos()]);
}