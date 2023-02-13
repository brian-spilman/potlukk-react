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
    allergies: string[]
};

export type AddLukkerUsernameAction = {type:"ADD_USERNAME", payload: string};
export type AddLukkerPasswordOneAction = {type:"ADD_PASSWORD_ONE", payload: string};
export type AddLukkerPasswordTwoAction = {type:"ADD_PASSWORD_TWO", payload: string};
export type AddLukkerFnameAction = {type:"ADD_FIRST_NAME", payload: string};
export type AddLukkerLnameAction = {type:"ADD_LAST_NAME", payload: string};
export type AddAllergyAction = {type:"ADD_ALLERGY", payload:string};
export type AddLukkerAction = {type:"ADD_LUKKER"};

export type RegistrationAction = AddLukkerUsernameAction | AddLukkerPasswordOneAction | AddLukkerPasswordTwoAction | AddAllergyAction | AddLukkerFnameAction | AddLukkerLnameAction | RegisterLukkerAction;

const initialState: RegistrationState = {
    username: "",
    password1: "",
    password2:"",
    fname: "",
    lname: "",
    allergies: []
}

export function registrationReducer(state: RegistrationState = initialState, action: RegistrationAction): RegistrationState{

    const nextState: RegistrationState = JSON.parse(JSON.stringify(state));

    const navigate = useNavigate();

    switch(action.type) {

        case "ADD_USERNAME": {
            nextState.username = action.payload;
            return nextState;
        }
        case "ADD_PASSWORD_ONE": {
            nextState.password1 = action.payload;
            return nextState;
        }
        case "ADD_PASSWORD_TWO": {
            nextState.password2 = action.payload;
            return nextState;
        }
        case "ADD_PASSWORD_ONE": {
            nextState.password1 = action.payload;
            return nextState;
        }
        case "ADD_FIRST_NAME": {
            nextState.fname = action.payload;
            return nextState;
        }
        case "ADD_LAST_NAME": {
            nextState.lname = action.payload;
            return nextState;
        }
        case "ADD_ALLERGY": {
            const item = action.payload.toUpperCase();
            if(nextState.allergies.includes(item)){
                const index = nextState.allergies.indexOf(item);
                nextState.allergies.splice(index, 1);
            }
            nextState.allergies.push(item)
            return nextState;
        }
        case "REGISTER_LUKKER": {
            // if(nextState.password1.length < 10){
            //     alert("Password must be at least 10 characters.")
            // }
            const passwordValidation = "?=.*[*.!@$%^&?~\]{9,}"
            if(nextState.password1.match(passwordValidation)){
                alert("Password must be at least 10 characters.");
                return nextState;
            }
            if(nextState.password1 !== nextState.password2){
                alert("Passwords don't match! Fix and try again.");
                return nextState;
            }

            let lukker: PotLukkerRegistrationDetails = {username: "", password: "", fname: "", lname: "", allergies: []};
            lukker.username = nextState.username;
            lukker.password = nextState.password1;
            lukker.fname = nextState.fname;
            lukker.lname = nextState.lname;
            lukker.allergies = nextState.allergies;

            const returnLukker = createLukker(lukker);

            // figure out how to change from registration page to 
            navigate("/home");

        }
    }
}