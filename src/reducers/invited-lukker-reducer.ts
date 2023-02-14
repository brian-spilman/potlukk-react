import { BasicLukker } from "../component/invited-lukker-list";

export type InvitationState = {
    invitedLukkers: BasicLukker[]
}

export type InviteLukkerAction = {type: "INVITE_LUKKER", payload: BasicLukker};
export type RevokeInviteAction = {type: "REVOKE_INVITE", payload: number};

export type InviteAction = InviteLukkerAction | RevokeInviteAction;

export function inviteLukkerReducer(state: InvitationState = {invitedLukkers:[]}, action: InviteAction): InvitationState {

    const nextState: InvitationState = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case "INVITE_LUKKER": {
            nextState.invitedLukkers.push(action.payload);
            return nextState;
        }
        case "REVOKE_INVITE": {
            nextState.invitedLukkers = nextState.invitedLukkers.filter(l => action.payload !== l.userId)
            return nextState;
        }
    }
}