import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PotLukkerRegistrationDetails, registrationReducer, RegistrationState } from "../reducers/registration-reducer";

const initialState: RegistrationState = {
    username: "",
    password1: "",
    password2:"",
    fname: "",
    lname: "",
    allergies: []
}

export function RegistrationPage() {
    
    const navigate = useNavigate();

    const [registrationState, dispatch] = useReducer(registrationReducer, initialState);

    // function pwValidator(password: string): boolean {

    //     const passwordValidation = "?=.*[*.!@$%^&?~\]{9,}"
    //     if(password.match(passwordValidation) ){
    //         //alert("Password must be at least 10 characters.");
    //         return false;
    //     }
    //     return true;
    // }

    function submitData(){
        // if(pwValidator(form.password1))
        // if(form.password1 !== form.password2){
        //     alert("Passwords do not match!");
        // }

        dispatch({type:"ADD_LUKKER"});

        navigate("/home");
        
    }

    return <>

        <h1>Hello welcome to registration</h1>

        <form onSubmit={submitData}>

            <label htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" placeholder="John" onChange={e => dispatch({type:"SET_FIRST_NAME", payload:e.target.value})}/>

            <label htmlFor="firstName">Last Name</label>
            <input id="lastName" type="text" placeholder="Doe" onChange={e => dispatch({type:"SET_LAST_NAME", payload:e.target.value})} required/>

            <hr />
        
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="JohnDoe123" onChange={e => dispatch({type:"SET_USERNAME", payload:e.target.value})} required/>

            <hr />

            <label htmlFor="firstPassword">Password *</label>
            <input id="firstPassword" type="password" placeholder="*****" onChange={e => dispatch({type:"SET_PASSWORD_ONE", payload:e.target.value})} required/>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" placeholder="*****" onChange={e => dispatch({type:"SET_PASSWORD_TWO", payload:e.target.value})} required/>

            <hr />

            <h4>Allergens:</h4>
            <label htmlFor="milkBox">Milk</label>
            <input id="milkBox" type="checkbox" value="milk" onChange={e => dispatch({type:"SET_ALLERGY", payload:"MILK"})}></input>
            <label htmlFor="eggBox">Egg</label>
            <input id="eggBox" type="checkbox" value="egg" onChange={e => dispatch({type:"SET_ALLERGY", payload:"EGG"})}></input>
            <label htmlFor="soyBox">Soy</label>
            <input id="soyBox" type="checkbox" value="soy" onChange={e => dispatch({type:"SET_ALLERGY", payload:"SOY"})}></input>
            <label htmlFor="nutBox">Tree Nuts</label>
            <input id="nutBox" type="checkbox" value="treeNuts" onChange={e => dispatch({type:"SET_ALLERGY", payload:"TREE NUTS"})}></input>

            <hr />

            <button type='submit'>Register</button>

        </form>

    </>
}