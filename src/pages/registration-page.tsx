import { FormEvent, FormEventHandler, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLukker } from "../api/lukker-requests";
import { PotLukkerRegistrationDetails, registrationReducer, RegistrationState } from "../reducers/registration-reducer";

const initialState: RegistrationState = {
    username: "",
    password1: "",
    password2: "",
    fname: "",
    lname: "",
    allergies: [],
    isVerified: false,
    passwordStatus: "",
}

export function RegistrationPage() {

    const navigate = useNavigate();

    const [registrationState, dispatch] = useReducer(registrationReducer, initialState);

    async function submitData(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        if (registrationState.isVerified === true) {

            let lukker: PotLukkerRegistrationDetails = { username: "", password: "", fname: "", lname: "", allergies: [] };
            lukker.username = registrationState.username;
            lukker.password = registrationState.password1;
            lukker.fname = registrationState.fname;
            lukker.lname = registrationState.lname;
            lukker.allergies = registrationState.allergies;

            const returnLukker = createLukker(lukker);

            localStorage.setItem("username", lukker.username);
            localStorage.setItem("userId", (await returnLukker).userId.toString());

            alert(registrationState.passwordStatus);
            navigate("/home");
        } else {
            alert(registrationState.passwordStatus)
        }

    }

    return <>
        <div style={{ width: "570px", margin: "auto", padding: "55px", marginTop: "60px" }}>
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitData(e)}>

                <div style={{ display: "inline-block", verticalAlign: "middle" }}>
                    <ul>
                        <li>
                            <label htmlFor="firstName">First Name</label>
                        </li>
                        <li>
                            <input id="firstName" type="text" placeholder="John" onChange={e => dispatch({ type: "SET_FIRST_NAME", payload: e.target.value })}
                                style={{ width: "250px", height: "20px" }}
                            />
                        </li>
                        <li>
                            <label htmlFor="firstName">Last Name</label>
                        </li>
                        <li>
                            <input id="lastName" type="text" placeholder="Doe" onChange={e => dispatch({ type: "SET_LAST_NAME", payload: e.target.value })} required
                                style={{ width: "250px", height: "20px" }}
                            />
                        </li>
                        <li>
                            <label htmlFor="username">Username</label>
                        </li>
                        <li>
                            <input id="username" type="text" placeholder="JohnDoe123" onChange={e => dispatch({ type: "SET_USERNAME", payload: e.target.value })} required
                                style={{ width: "250px", height: "20px" }}
                            />
                        </li>
                        <li>
                            <label htmlFor="firstPassword">Password <span style={{ color: "red" }}>*</span></label>
                        </li>
                        <li>
                            <input id="firstPassword" type="text" placeholder="*****" onChange={e => { dispatch({ type: "SET_PASSWORD_ONE", payload: e.target.value }); dispatch({ type: "VERIFY_LUKKER" }); }} required style={{ width: "250px", height: "20px" }} />
                        </li>

                        <li>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                        </li>
                        <li>
                            <input type="text" id="confirmPassword" placeholder="*****" onChange={e => { dispatch({ type: "SET_PASSWORD_TWO", payload: e.target.value }); dispatch({ type: "VERIFY_LUKKER" }); }} required style={{ width: "250px", height: "20px" }} />
                        </li>
                    </ul>
                </div>

                <div style={{ display: "inline-block", verticalAlign: "middle", margin: "auto", padding: "40px" }}>
                    <h3>Allergens</h3>
                    <div style={{ border: "1px solid #A9A9A9" }}>
                        <ul style={{ width: "140px", height: "130px" }}>
                            <li>
                                <input id="milkBox" type="checkbox" value="milk" className="checkbox" onChange={e => dispatch({ type: "SET_ALLERGY", payload: "MILK" })}></input>
                                <label htmlFor="milkBox">Milk</label>
                            </li>
                            <li>
                                <input id="eggBox" type="checkbox" value="egg" className="checkbox" onChange={e => dispatch({ type: "SET_ALLERGY", payload: "EGG" })}></input>
                                <label htmlFor="eggBox">Egg</label>
                            </li>
                            <li>
                                <input id="soyBox" type="checkbox" value="soy" className="checkbox" onChange={e => dispatch({ type: "SET_ALLERGY", payload: "SOY" })}></input>
                                <label htmlFor="soyBox">Soy</label>
                            </li>
                            <li>
                                <input id="nutBox" type="checkbox" value="treeNuts" className="checkbox" onChange={e => dispatch({ type: "SET_ALLERGY", payload: "TREE_NUT" })}></input>
                                <label htmlFor="nutBox">Tree Nuts</label>
                            </li>
                        </ul>
                    </div>

                    <br />

                    <button type='submit' className="bigBtn">Register</button>
                </div>
            </form>
        </div>
    </>
}