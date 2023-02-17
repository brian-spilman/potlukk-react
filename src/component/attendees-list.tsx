import { Invitation } from "./hosted-potlukks-list"

type AttendeesListProps = {
    attendees: Invitation[],
    isGuest: boolean
}

export function AttendeesList(props: AttendeesListProps) {

    return <>

        <h2>Attendees: </h2>
        <ul>
            {props.attendees.map(a => <li key={a.potlukker.userId}>{a.potlukker.username} {a.potlukker.fname} {a.potlukker.lname} {props.isGuest ? <></> : <b>{a.status}</b>}</li>)}
        </ul>   
    
    </>


}