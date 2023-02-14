import { useReducer, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { InvitedLukkerList } from "../component/invited-lukker-list";
import { LukkerInfo } from "../component/lukker-info";
import { LukkerSearch } from "../component/lukker-search";
import { NavBar } from "../component/navbar";
import { InvitationState, inviteLukkerReducer } from "../reducers/invited-lukker-reducer";
import { BasicLukker } from "../component/invited-lukker-list";

export type SearchForm = {
    username: string
}

const initialState: InvitationState = {
    invitedLukkers: []
}

export function HostPage() {

    const [form, setForm] = useState<SearchForm>({username:""});

    const [inviteState, dispatch] = useReducer(inviteLukkerReducer, initialState);


    return <>

            <NavBar/>
        
            <h1>Host Page</h1>

            <input type="text" placeholder="Search Lukkers" onChange={e => setForm({...form, username:e.target.value})}/>

            <LukkerSearch usernameToSearch={form.username} dispatch={dispatch}/>

            <InvitedLukkerList invitedLukkers={inviteState.invitedLukkers} dispatch={dispatch} />
    
    </>
}