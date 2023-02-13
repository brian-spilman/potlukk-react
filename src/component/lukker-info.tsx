import { useEffect, useState } from "react"
import { getLukkers, Lukker } from "../api/lukker-requests"


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