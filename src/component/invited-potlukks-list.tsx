import { Link } from "react-router-dom"
import { Potlukk } from "./hosted-potlukks-list"

type InvitedPotlukksProps = {
    potlukks: Potlukk[]
}

export function InvitedPotlukksList(props: InvitedPotlukksProps) {

    return <div className="homePageList">
    
        <h2>Invited Potlukks</h2>
        <ul>
            {props.potlukks.filter(p => p.invitations.some(i => i.potlukker.userId===Number(localStorage.getItem("userId")))).map(p => <li key={p.potlukkId}><Link to={`/potlukkinfoguest/${p.potlukkId}`}>{p.details.title}</Link> </li>)}
        </ul>
    
    </div>

}