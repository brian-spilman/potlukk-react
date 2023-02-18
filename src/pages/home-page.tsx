import { useQuery } from "react-query";
import { getAllPotlukks } from "../api/lukker-requests";
import { HostedPotlukksList } from "../component/lists/hosted-potlukks-list";
import { InvitedPotlukksList } from "../component/lists/invited-potlukks-list";
import { LukkerInfo } from "../component/lukker-info";
import { NavBar } from "../component/navbar";



export function HomePage() {

    const { isLoading, isError, data = [] } = useQuery("potlukks", getAllPotlukks);

    if (isLoading) {
        return <p>LOADING</p>
    }
    if (isError) {
        return <p>OH NO THERE WAS A PROBLEM</p>
    }


    return <>

        <NavBar />
        <div id="homepageDiv">
            <InvitedPotlukksList potlukks={data} />
            <HostedPotlukksList hostId={Number(localStorage.getItem("userId"))} potlukks={data} />
            <div id="notificationStyles">
                <h2>Notifications</h2>
            </div>
        </div>

    </>
}