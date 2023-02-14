import { NavBar } from "../component/navbar";
import { useState } from "react"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PotlukkCreationAction } from "../reducers/potlukk-host-reducer";
import { useDispatch } from "react-redux";



export function PotlukkDetailsHostPage() {


    // const dispatch = useDispatch()<PotlukkCreationAction>;

    // const [date, setDate] = useState(null);

    return <>

    <NavBar />

        {/* <DatePicker
            selected={selectedDate}
            onChange={(e) => dispatch({type:"SET_TIME", payload: e.target.value})}
            dateFormat=
        /> */}

        {/* <DatePicker selected={date} onChange={e => dispatch({type: "SET_TIME", payload: e.target.value})} /> */}



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