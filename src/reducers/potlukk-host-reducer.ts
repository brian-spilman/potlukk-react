import { createPotlukk } from "../api/lukker-requests";

export type PotLukk = {
    time: string,
    location: string,
    description: string,
    isPublic: boolean
}

export type PotlukkDetails = {
    title: string,
    location: string,
    status: PotlukkStatus,
    description: string,
    isPublic: boolean,
    time: number,
    tags: string[]
}

export type PotlukkStatus = {
    scheduled: "SCHEDULED",
    cancelled: "CANCELLED"
}

export type PotlukkCreationState = {
    title: string,
    location: string,
    status: "SCHEDULED" | "CANCELLED" | "",
    description: string,
    isPublic: boolean,
    time: number,
    tags: string[]
}


export type SetPotLukkTimeAction = { type: "SET_TIME", payload: number };
export type SetPotLukkLocationAction = { type: "SET_LOCATION", payload: string };
export type SetPotLukkDescriptionAction = { type: "SET_DESCRIPTION", payload: string };
export type SetPotLukkPublic = { type: "SET_PUBLIC", payload: boolean };
export type AddPotLukk = { type: "ADD_POTLUKK" };

export type PotlukkCreationAction = SetPotLukkTimeAction | SetPotLukkLocationAction |
    SetPotLukkDescriptionAction | SetPotLukkPublic | AddPotLukk

const initialState: PotlukkCreationState = {
    title: "",
    location: "",
    status: "",
    description: "",
    isPublic: false,
    time: 0,
    tags: []
}

export function potlukkHostReducer(state: PotlukkCreationState = initialState, action: PotlukkCreationAction) {

    const nextState: PotlukkCreationState = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case "SET_TIME": {
            nextState.time = action.payload;
            return nextState;
        }
        case "SET_LOCATION": {
            nextState.location = action.payload;
            return nextState;
        }
        case "SET_DESCRIPTION": {
            nextState.description = action.payload;
            return nextState;
        }
        case "SET_PUBLIC": {
            nextState.isPublic = action.payload;
            return nextState;
        }
        case "ADD_POTLUKK": {
            return nextState;
        }

    }

}