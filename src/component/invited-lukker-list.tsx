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

        <h2>Invited Lukkers: </h2>

        <ul style={{ listStyle: "none" }}>
            {props.invitedLukkers.map(luk =>
                <li key={luk.userId}>{luk.username}: {luk.fname} {luk.lname}
                    <button onClick={() => props.dispatch({ type: "REVOKE_INVITE", payload: luk.userId })}
                        className="removeBtn"
                    >
                        Remove
                    </button>
                </li>)
            }
        </ul>

    </>


}