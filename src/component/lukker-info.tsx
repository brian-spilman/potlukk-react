import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import { getLukkers } from "../api/lukker-requests"
import { Lukker } from "../reducers/registration-reducer"


export function LukkerInfo(){

    //const [lukkers, setLukkers] = useState<Lukker[]>([])

    // useEffect(()=>{

    //     (async () => {
    //         const lukkers = await getLukkers();
    //         setLukkers(lukkers);
    //     })()

    // }, [])

    const {isLoading, isError, data = []} = useQuery("lukkers", getLukkers);

    if(isLoading){
        return <p>LOADING</p>
    }
    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

    return <>

        <h2>Lukkers: </h2>
        <ul>
            {data.map(l => <li key={l.userId}> {l.username} {l.fname} {l.lname} <button>Invite</button></li>)}
        </ul>
    </>
}