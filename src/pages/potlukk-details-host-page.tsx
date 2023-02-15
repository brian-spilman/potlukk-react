import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getAllPotlukks } from "../api/lukker-requests";
import { AttendeesList } from "../component/attendees-list";
import { NavBar } from "../component/navbar";

export function PotlukkDetailsHostPage() {

    let {potlukkID} = useParams(); 

    const {isLoading, isError, data = []} = useQuery("potlukks", getAllPotlukks);

    const potlukk = data.filter(p => p.potlukkId === Number(potlukkID));
    const myPotlukk = potlukk[0];

    const date = new Date(myPotlukk.details.time * 1000);

    return <>
    

        <NavBar />

        <h2>Title: {myPotlukk.details.title}</h2>

        <label htmlFor="dateField">Date: {date.toString()}</label>
        <hr />
        <input id="dateField" type='datetime-local' />
        <hr />

        <label htmlFor="location">Location: {myPotlukk.details.location}</label>
        <hr />
        <input type="text" placeholder="New Location"/>
        <hr />
        <label htmlFor="description">Description: {myPotlukk.details.description}</label>
        <hr />
        <input type="text" placeholder="New Description"/>
        <hr />

        <label htmlFor="isPublic">Make Public</label>
        <input id="isPublic" type="checkbox" />

        <button>Update</button>
        <button>Edit</button>
        <button>Cancel</button>

        <table>
            <tr><thead><th>Dishes</th></thead></tr>
            <tr>

                <td><button>Edit</button></td>
            </tr>
        </table>

        <button>Bring Dish</button>
        <button>Request Dish</button>

        <AttendeesList attendees={myPotlukk.invitations} isGuest={false} />

        <button>Invite</button>

    </>
}