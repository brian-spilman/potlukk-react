import { Link } from "react-router-dom"
import { Potlukk } from "./hosted-potlukks-list"

type InvitedPotlukksProps = {
    potlukks: Potlukk[]
}

export function InvitedPotlukksList(props: InvitedPotlukksProps) {

    return <div id="invitedPotlukkStyles">

        <h2>Invited Potlukks</h2>
        <ul>
            {props.potlukks.filter(p => p.invitations.some(i => i.potlukker.userId === Number(localStorage.getItem("userId")))).map(p => <li key={p.potlukkId}><Link to={`/potlukkinfoguest/${p.potlukkId}`} style={{ color: "black", fontSize: "20px" }} className="invitedPotlukkStyles">{p.details.title}</Link>
                {p.details.status === "CANCELLED" ? <>
                    <span style={{ color: "red" }}><b> - {p.details.status}</b></span>
                </> : null}
            </li>)}
        </ul>

    </div>

}