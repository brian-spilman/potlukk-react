import { Potlukk } from "../component/hosted-potlukks-list";
import { PotlukkCreationInput } from "../pages/host-page";
import { Lukker, PotLukkerRegistrationDetails } from "../reducers/registration-reducer";

export type SignInLukker = {
    username: string,
    password: string
}

export type PotlukkCreationReturn = {
    potlukkId: number,
    details: {
        title: string
    }
}

export type InvitationSendInput = {
    potlukkId: number,
    potlukkerId: number
}

export async function getLukkers(): Promise<Lukker[]>{

    const httpResponse = await fetch("http://127.0.0.1:8000/lukkers")
    const lukkers: Lukker[] = await httpResponse.json();
    return lukkers;
}

export async function createLukker(newLukker: PotLukkerRegistrationDetails): Promise<Lukker> {
    const httpResponse = await fetch("http://127.0.0.1:8000/lukkers", {
        method:"POST",
        body:JSON.stringify(newLukker),
        headers: {
            "Content-Type":"application/json"
        }
    });

    const lukker:Lukker = await httpResponse.json();
    return lukker;
}

export async function signInLukker(lukkerVerify: SignInLukker): Promise<Lukker> {
    const httpResponse = await fetch("http://127.0.0.1:8000/verify", {
        method:"POST",
        body:JSON.stringify(lukkerVerify),
        headers: {
            "Content-Type":"application/json" 
        }
    });

    const lukker:Lukker = await httpResponse.json();
    return lukker;
}

export async function createPotlukk(newPotlukkInput: PotlukkCreationInput):Promise<PotlukkCreationReturn>{
    const query = `mutation createPotlukk($newPotlukk: PotlukkCreationInput!){
        createPotlukk(input:$newPotlukk){
          potlukkId
            details{
            title
          }
        }
    }`;
    
    const variables = {newPotlukk:newPotlukkInput};
    const requestBody: string = JSON.stringify({query, variables});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
    const responseBody = await httpResponse.json();
    const freshPotlukk = responseBody.data.createPotlukk;
    return freshPotlukk;
}

export async function sendInvite(newInvite: InvitationSendInput):Promise<PotlukkCreationReturn>{
    const query = `mutation sendInvite($inviteInput: InvitationSendInput!){
        sendInvite(input: $inviteInput){
          potlukkId
          details{
            title
          }
        }
      }`;
    
    const variables = {inviteInput:newInvite};
    const requestBody: string = JSON.stringify({query, variables});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
    const responseBody = await httpResponse.json();
    const potlukk = responseBody.data;
    return potlukk;
}

export async function getAllPotlukks():Promise<Potlukk[]>{
    const query = `query getPotlukks{
        potlukks{
          potlukkId
          details{
            title
            location
            status
            description
            isPublic
            time
            tags
          }
          host{
            userId
            username
            fname
            lname
            allergies
          }
          invitations{
            status
            potlukker{
              userId
              username
              fname
              lname
              allergies
            }
          }
          dishes{
            name
            description
            broughtBy
            serves
            allergens
          }
        }
      }`;
    
    const requestBody: string = JSON.stringify(query);
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
    const responseBody = await httpResponse.json();
    console.log(responseBody);
    const potlukk = responseBody.data;
    return potlukk;
}