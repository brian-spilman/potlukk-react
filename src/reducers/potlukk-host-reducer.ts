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

export type SetPotlukkTitleAction = { type: "SET_TITLE", payload: string};
export type SetPotlukkTimeAction = { type: "SET_TIME", payload: number };
export type SetPotlukkLocationAction = { type: "SET_LOCATION", payload: string };
export type SetPotlukkDescriptionAction = { type: "SET_DESCRIPTION", payload: string };
export type SetPotlukkPublic = { type: "SET_PUBLIC", payload: boolean };
// export type SetPotlukkTag = { type: "SET_TAG", payload: string[]};
export type AddPotlukk = { type: "ADD_POTLUKK" };

export type PotlukkCreationAction = SetPotlukkTitleAction | SetPotlukkTimeAction | SetPotlukkLocationAction |
    SetPotlukkDescriptionAction | SetPotlukkPublic | AddPotlukk
   // SetPotlukkTag 

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

        case "SET_TITLE": {
            nextState.title = action.payload;
            return nextState;
        }
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
        // case "SET_TAG": {
        //     nextState.tags.push()
        //     return nextState;
        // }
        case "ADD_POTLUKK": {
            alert("Potlukk successfully created!");
            return nextState;
        }

    }

}