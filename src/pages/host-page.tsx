import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LukkerInfo } from "../component/lukker-info";
import { NavBar } from "../component/navbar";

const queryClient = new QueryClient();

export type SearchForm = {
    username: string
}

export function HostPage() {

    const [form, setForm] = useState<SearchForm>({username:""});


    return <>

        <QueryClientProvider client={queryClient}>
            <NavBar/>
        
            <h1>Host Page</h1>

            <input type="text" placeholder="Search Lukkers" onChange={e => setForm({...form, username:e.target.value})}/>
            <button>Search</button>

            <LukkerInfo/>
        </QueryClientProvider>
    
    </>
}