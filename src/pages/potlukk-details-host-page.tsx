import { NavBar } from "../component/navbar";
import { useState } from "react"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export function PotlukkDetailsHostPage() {


    // const date = () => {
    //     const [startDate, setStartDate] = useState(newDate());
    //     return (
    //         <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    //     );
    // }

    return <>

    <NavBar />

        {/* <DatePicker selected={startdate} onChange={(date) => setStartDate(date)} />

        <DatePicker
            selected={date}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
        /> */}

        <label htmlFor="location">Location</label>
        <input type="text" />

        <label htmlFor="description">Description</label>
        <input type="text" />

        <label htmlFor="isPublic">Make Public</label>
        <input id="isPublic" type="checkbox" />

        <input type="text" placeholder="Search Lukkers" />
        <button>Search</button>

        <table>
            <thead><tr>Lukkers</tr></thead>
            <tbody>
                <tr>

                </tr>
            </tbody>
        </table>

        <table>
            <thead><tr>Invited Lukkers</tr></thead>
            <tbody>
                <tr>
                    
                </tr>
            </tbody>
        </table>

    </>
}