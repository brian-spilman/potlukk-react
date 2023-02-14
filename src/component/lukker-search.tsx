import { useQuery } from "react-query";
import { getLukkers } from "../api/lukker-requests";
import { SearchForm } from "../pages/host-page";


type LukkerSearchProps ={
    usernameToSearch: string
}

export function LukkerSearch(props: LukkerSearchProps){

    const {isLoading, isError, data = []} = useQuery("lukkers", getLukkers);

    if(isLoading){
        return <p>LOADING</p>
    }
    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

   

    return <>
    
        <h1>Lukkers: </h1>
        <ul>
            {data.filter(lukker => lukker.username.includes(props.usernameToSearch)).map(p => <li key={p.userId}>{p.username} {p.fname} {p.lname} <button>Invite</button></li>)}
        </ul>
    
    </>

}