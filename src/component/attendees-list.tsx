import { Invitation } from "./lists/hosted-potlukks-list"

type AttendeesListProps = {
    attendees: Invitation[],
    isGuest: boolean
}

export function AttendeesList(props: AttendeesListProps) {

    return <>

        <h2>Attendees: </h2>
        <ul>
            {props.attendees.map(a =>
                <li key={a.potlukker.userId}>
                    {a.potlukker.username}: {a.potlukker.fname} {a.potlukker.lname} {props.isGuest ? <></> : 
                    <span style={{ color: "#0085fc", fontWeight: "bold" }}>{a.status}</span>}
                </li>)
            }
        </ul>

    </>


}