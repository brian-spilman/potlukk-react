
export type Lukker = {
    userId: number,
    username: string,
    fname: string,
    lname: string
}

export async function getLukkers(): Promise<Lukker[]>{

    const httpResponse = await fetch("http://127.0.0.1:8000/lukkers")
    const lukkers: Lukker[] = await httpResponse.json();
    return lukkers;
}