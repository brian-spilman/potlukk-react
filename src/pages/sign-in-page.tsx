import { sign } from "crypto";
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { signInLukker } from "../api/lukker-requests";

type SignInForm = {
    username: string,
    password: string
}

export function SignInPage() {

    const navigate = useNavigate();
    const [form, setForm] = useState<SignInForm>({username:"", password:""});

    async function signIn(event:FormEvent<HTMLFormElement>){

        event.preventDefault();

        const lukker = await signInLukker({username:form.username, password:form.password});
        //if(lukker.msg) if fail then alert and stay on sign in
        // else go to home
        if(lukker.username === form.username){ // FIX!! Redirects back to sign in even if info correct

            localStorage.setItem("username", lukker.username);

            navigate("/home");
            
        }else{
            alert("Incorrect login information");
        }
    }

    function registrationGoTo(){
        navigate("/registration");
    }

    return <>
        <form onSubmit={(e:FormEvent<HTMLFormElement>) => signIn(e)}>
            <h1>Sign Page</h1>

            <label htmlFor="username">User Name</label>
            <input id="username" type="text" placeholder="johndoe24" onChange={e => setForm({...form, username:e.target.value})} />

            <label htmlFor="password">Password</label>
            <input id="password" type="text" placeholder="******" onChange={e => setForm({...form, password:e.target.value})} />

            <button type="submit">Sign In</button>
            <hr />
            <h2>New User</h2>
            <button onClick={registrationGoTo}>Sign Up</button>
        </form>

    </>
}