import { registrationReducer, RegistrationState } from "../reducers/registration-reducer"


test("SET_USERNAME", ()=>{

    const registrationState: RegistrationState = {
        username: "",
        password1: "",
        password2:"",
        fname: "",
        lname: "",
        allergies: [],
        isVerified: false,
        passwordStatus: ""
    };

    const nextState = registrationReducer(registrationState, {type:"SET_USERNAME", payload:"JohnDoe24"});
    expect(nextState.username).toBe("JohnDoe24");
})
test("SET_PASSWORD_ONE", ()=>{

    const registrationState: RegistrationState = {
        username: "JohnDoe24",
        password1: "",
        password2:"",
        fname: "",
        lname: "",
        allergies: [],
        isVerified: false,
        passwordStatus: ""
    };

    const nextState = registrationReducer(registrationState, {type:"SET_PASSWORD_ONE", payload:"abcdefghi$"});
    expect(nextState.password1).toBe("abcdefghi$");
})
test("SET_PASSWORD_TWO", ()=>{

    const registrationState: RegistrationState = {
        username: "JohnDoe24",
        password1: "abcdefghi$",
        password2:"",
        fname: "",
        lname: "",
        allergies: [],
        isVerified: false,
        passwordStatus: ""
    };

    const nextState = registrationReducer(registrationState, {type:"SET_PASSWORD_TWO", payload:"abcdefghi$"});
    expect(nextState.password2).toBe("abcdefghi$");
})
test("SET_FIRST_NAME", ()=>{

    const registrationState: RegistrationState = {
        username: "JohnDoe24",
        password1: "abcdefghi$",
        password2: "abcdefghi$",
        fname: "",
        lname: "",
        allergies: [],
        isVerified: false,
        passwordStatus: ""
    };

    const nextState = registrationReducer(registrationState, {type:"SET_FIRST_NAME", payload:"John"});
    expect(nextState.fname).toBe("John");
})
test("SET_LAST_NAME", ()=>{

    const registrationState: RegistrationState = {
        username: "JohnDoe24",
        password1: "abcdefghi$",
        password2: "abcdefghi$",
        fname: "John",
        lname: "",
        allergies: [],
        isVerified: false,
        passwordStatus: ""
    };

    const nextState = registrationReducer(registrationState, {type:"SET_LAST_NAME", payload:"Doe"});
    expect(nextState.lname).toBe("Doe");
})
test("SET_ALLERGY_ADD", ()=>{

    const registrationState: RegistrationState = {
        username: "JohnDoe24",
        password1: "abcdefghi$",
        password2: "abcdefghi$",
        fname: "John",
        lname: "Doe",
        allergies: ["MILK", "SOY"],
        isVerified: false,
        passwordStatus: ""
    };

    const nextState = registrationReducer(registrationState, {type:"SET_ALLERGY", payload:"Egg"});
    console.log(nextState.allergies);
    expect(nextState.allergies.length).toBe(3);
})

test("SET_ALLERGY_REMOVE", ()=>{

    const registrationState: RegistrationState = {
        username: "JohnDoe24",
        password1: "abcdefghi$",
        password2: "abcdefghi$",
        fname: "John",
        lname: "Doe",
        allergies: ["MILK", "SOY"],
        isVerified: false,
        passwordStatus: ""
    };

    const nextState = registrationReducer(registrationState, {type:"SET_ALLERGY", payload:"milk"});
    console.log(nextState.allergies);
    expect(nextState.allergies.length).toBe(1);
})

test("VERIFY_LUKKER_TRUE", ()=>{

    const registrationState: RegistrationState = {
        username: "JohnDoe24",
        password1: "abcdefghi$",
        password2: "abcdefghi$",
        fname: "John",
        lname: "Doe",
        allergies: ["MILK", "SOY"],
        isVerified: false,
        passwordStatus: ""
    };

    const nextState = registrationReducer(registrationState, {type:"SET_ALLERGY", payload:"milk"});
    console.log(nextState.allergies);
    expect(nextState.allergies.length).toBe(1);
})