import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LukkerInfo } from "../component/lukker-info";
import { LukkerSearch } from "../component/lukker-search";
import { NavBar } from "../component/navbar";

export type SearchForm = {
    username: string
}

export function HostPage() {

    const [form, setForm] = useState<SearchForm>({username:""});


    return <>

            <NavBar/>
        
            <h1>Host Page</h1>

            <input type="text" placeholder="Search Lukkers" onChange={e => setForm({...form, username:e.target.value})}/>

            <LukkerSearch usernameToSearch={form.username}/>
    
    </>
}