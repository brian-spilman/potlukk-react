import { Link } from "react-router-dom"

export type Potlukk = {
    potlukkId: number,
    details: {
        title: string,
        location: string,
        status: string,
        description: string,
        isPublic: boolean,
        time: number,
        tags: string[]
    },
    host: {
        userId: number,
        username: string,
        fname: string,
        lname: string,
        allergies: string[]
    },
    invitations: Invitation[],
    dishes: Dish[]
}

export type Invitation = {
    status: string,
    potlukker: {
        userId: number,
        username: string,
        fname: string,
        lname: string,
        allergies: string[]
    }
}

export type Dish = {
    name: string,
    description: string,
    broughtBy: number,
    serves: number,
    allergens: string[]
}

type HostedPotlukksProps = {
    potlukks: Potlukk[],
    hostId: number
}

export function HostedPotlukksList(props: HostedPotlukksProps) {

    return <div id="hostedPotlukkStyles">

        <h2>Hosted Potlukks</h2>
        <ul>
            {props.potlukks.filter(p => p.host.userId === props.hostId).map(p => <li key={p.potlukkId}><Link to={`/potlukkinfohost/${p.potlukkId}`}
                style={{ color: "black", fontSize: "20px" }}>{p.details.title}</Link>
                
                {p.details.status === "CANCELLED" ? <>
                    <span style={{ color: "red" }}><b> - {p.details.status}</b></span>
                </> : null}</li>)}
        </ul>

    </div>

}