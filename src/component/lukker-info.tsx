import { useEffect, useState } from "react"
import { getLukkers } from "../api/lukker-requests"
import { Lukker } from "../reducers/registration-reducer"


export function LukkerInfo(){

    const [lukkers, setLukkers] = useState<Lukker[]>([])

    useEffect(()=>{

        (async () => {
            const lukkers = await getLukkers();
            setLukkers(lukkers);
        })()

    }, [])

    return <>
    
        <ul>
            {lukkers.map(l => <li key={l.userId}> {l.fname} {l.lname}</li>)}
        </ul>
    
    </>
}