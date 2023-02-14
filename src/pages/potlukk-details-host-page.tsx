import { NavBar } from "../component/navbar";

export function PotlukkDetailsHostPage() {

    return <>

        <NavBar />

        <input type='datetime-local' />

        <label htmlFor="location">Location</label>
        <input type="text" />

        <label htmlFor="description">Description</label>
        <input type="text" />

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

        <table>
            <tr><thead><th>Attendees</th></thead></tr>
            <tr>

            </tr>
        </table>

        <button>Invite</button>

    </>
}