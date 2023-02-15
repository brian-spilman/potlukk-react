import { InviteAction } from "../reducers/invited-lukker-reducer"

export type BasicLukker = {
    userId: number,
    fname: string,
    lname: string,
    username: string
}

type InvitedLukkerProps = {
    invitedLukkers: BasicLukker[],
    dispatch: React.Dispatch<InviteAction>
}

export function InvitedLukkerList(props: InvitedLukkerProps) {

    return <>

        <h1>Invited Lukkers: </h1>
    
        <ul>
            {props.invitedLukkers.map(luk => <li key={luk.userId}>{luk.username} {luk.fname} {luk.lname} 
            <button onClick={() => props.dispatch({type: "REVOKE_INVITE", payload: luk.userId})}>Remove</button></li>)}
        </ul>
    
    </>


}