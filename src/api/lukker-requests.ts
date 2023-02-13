import { Lukker, PotLukkerRegistrationDetails } from "../reducers/registration-reducer";

export type SignInLukker = {
    username: string,
    password: string
}

export async function getLukkers(): Promise<Lukker[]>{

    const httpResponse = await fetch("http://127.0.0.1:8000/lukkers")
    const lukkers: Lukker[] = await httpResponse.json();
    return lukkers;
}

export async function createLukker(newLukker: PotLukkerRegistrationDetails): Promise<Lukker> {
    const httpResponse = await fetch("http://127.0.0.1:8000/lukkers", {
        method:"POST",
        body:JSON.stringify(newLukker),
        headers: {
            "Content-Type":"application/json"
        }
    });

    const lukker:Lukker = await httpResponse.json();
    return lukker;
}

export async function signInLukker(lukkerVerify: SignInLukker): Promise<Lukker> {
    const httpResponse = await fetch("http://127.0.0.1:8000/verify", {
        method:"POST",
        body:JSON.stringify(lukkerVerify),
        headers: {
            "Content-Type":"application/json" 
        }
    });

    const lukker:Lukker = await httpResponse.json();
    return lukker;
}