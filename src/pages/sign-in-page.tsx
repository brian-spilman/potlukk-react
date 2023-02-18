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
    const [form, setForm] = useState<SignInForm>({ username: "", password: "" });

    async function signIn(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        const lukker = await signInLukker({ username: form.username, password: form.password });

        if (lukker.username === form.username) {

            localStorage.setItem("username", lukker.username);
            localStorage.setItem("userId", lukker.userId.toString());

            navigate("/home");

        } else {
            alert("Incorrect login information");
        }
    }

    function registrationGoTo() {
        navigate("/registration");
    }

    return <>
        <div style={{ border: "1px solid #A9A9A9", width: "200px", margin: "auto", paddingRight: "55px", marginTop: "60px" }}>
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => signIn(e)}>
                <ul style={{ listStyle: "none" }}>
                    <li>
                        <h3>Sign In</h3>
                        <hr style={{ border: "1px solid #c2e3ff", width: "180px" }} />
                    </li>

                    <li>
                        <label htmlFor="username">User Name:</label>
                    </li>
                    <li>
                        <input id="username" type="text" placeholder="johndoe24" onChange={e => setForm({ ...form, username: e.target.value })}
                            style={{ height: "20px" }}
                        />
                    </li>
                    < br />


                    <li>
                        <label htmlFor="password">Password:</label>
                    </li>
                    <li>
                        <input id="password" type="text" placeholder="******" onChange={e => setForm({ ...form, password: e.target.value })}
                            style={{ height: "20px" }}
                        />
                    </li>
                    <br />

                    <li>
                        <button type="submit" className="signInBtn">SIGN IN</button>
                    </li>

                    <br />
                    <hr style={{ border: "1px solid #c2e3ff", width: "180px" }} />
                    <h3>New User</h3>

                    <button className="signInBtn" onClick={registrationGoTo}>SIGN UP</button>

                </ul>
            </form>
        </div>

    </>
}