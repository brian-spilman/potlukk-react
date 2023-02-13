import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createLukker } from "../api/lukker-requests";

export type Lukker = {
    userId: number,
    username: string,
    fname: string,
    lname: string,
    allergies: string[]
}
export type PotLukkerRegistrationDetails = {
    username: string,
    password: string,
    fname: string,
    lname: string,
    allergies: string[]
}

export type RegistrationState = {
    username: string,
    password1: string,
    password2: string,
    fname: string,
    lname: string,
    allergies: string[],
    isVerified: boolean
};

export type SetLukkerUsernameAction = {type:"SET_USERNAME", payload: string};
export type SetLukkerPasswordOneAction = {type:"SET_PASSWORD_ONE", payload: string};
export type SetLukkerPasswordTwoAction = {type:"SET_PASSWORD_TWO", payload: string};
export type SetLukkerFnameAction = {type:"SET_FIRST_NAME", payload: string};
export type SetLukkerLnameAction = {type:"SET_LAST_NAME", payload: string};
export type SetAllergyAction = {type:"SET_ALLERGY", payload:string};
export type VerifyLukkerAction = {type:"VERIFY_LUKKER"};

export type RegistrationAction = SetLukkerUsernameAction | SetLukkerPasswordOneAction | SetLukkerPasswordTwoAction | SetAllergyAction | SetLukkerFnameAction | SetLukkerLnameAction | VerifyLukkerAction;

const initialState: RegistrationState = {
    username: "",
    password1: "",
    password2:"",
    fname: "",
    lname: "",
    allergies: [],
    isVerified: false
}

export function registrationReducer(state: RegistrationState = initialState, action: RegistrationAction): RegistrationState{

    const nextState: RegistrationState = JSON.parse(JSON.stringify(state));

    
    switch(action.type) {

        case "SET_USERNAME": {
            nextState.username = action.payload;
            return nextState;
        }
        case "SET_PASSWORD_ONE": {
            nextState.password1 = action.payload;
            return nextState;
        }
        case "SET_PASSWORD_TWO": {
            nextState.password2 = action.payload;
            return nextState;
        }
        case "SET_FIRST_NAME": {
            nextState.fname = action.payload;
            return nextState;
        }
        case "SET_LAST_NAME": {
            nextState.lname = action.payload;
            return nextState;
        }
        case "SET_ALLERGY": {
            console.log("Allergy Action");
            const item = action.payload.toUpperCase();
            if(nextState.allergies.includes(item)){
                const index = nextState.allergies.indexOf(item);
                nextState.allergies.splice(index, 1);
            }
            nextState.allergies.push(item)
            return nextState;
        }
        case "VERIFY_LUKKER": {
            // if(nextState.password1.length < 10){
            //     alert("Password must be at least 10 characters.")
            // }

            console.log("Right here");

            // const passwordValidation = "?=.*[*.!@$%^&?~\]{9,}"
            // if(!(nextState.password1.match(passwordValidation))){
            //     alert("Password doesn't include symbols and/or correct length of at least 10")
            //     return nextState;
            // }

            if(nextState.password1 !== nextState.password2){
                //alert("Passwords don't match! Fix and try again.");
                nextState.isVerified = false;
                return nextState;
            }

            nextState.isVerified = true;

            return nextState;

            // figure out how to change from registration page to 
            // navigate("/home");

        }
    }
}