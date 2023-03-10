import { Dish, Potlukk } from "../component/lists/hosted-potlukks-list";
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

export type PotlukkDetailsSwapInput = {
  potlukkId: number,
  title: string,
  location: string,
  status: "SCHEDULED" | "CANCELLED" | "",
  description: string,
  isPublic: boolean,
  time: number,
  tags: string[]
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
    
    const requestBody: string = JSON.stringify({query});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
    const responseBody = await httpResponse.json();
    console.log(responseBody);
    const potlukk = responseBody.data.potlukks;
    return potlukk;
}

export async function saveDishes(dishes: Dish[], potlukkId: number): Promise<Potlukk> {
  const query = `mutation addDishes($dishesInput: DishesSwapInput!){
    swapPotlukkDishes(input: $dishesInput){
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
  }`

  const variables = {dishesInput:{dishes:dishes, potlukkId: potlukkId }};

  console.log(potlukkId);
  console.log(dishes);

  const requestBody = JSON.stringify({query,variables});
  const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{"Content-Type":"application/json"}});
  const responseBody = await httpResponse.json();
  //console.log(responseBody);
  const potlukk: Potlukk = responseBody.data.swapPotlukkDishes;
  //console.log(potlukk.dishes);
  return potlukk;
}

export async function updateInvite(potlukkId: number, potlukkerId: number, status: string): Promise<Potlukk> {
  const query = `mutation updateInvite($inviteInput: InvitationUpdateInput!){
    updateInvite(input: $inviteInput){
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
  }`

  const variables = {inviteInput:{potlukkerId:potlukkerId, potlukkId: potlukkId, status: status}};

  const requestBody = JSON.stringify({query,variables});
  const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{"Content-Type":"application/json"}});
  const responseBody = await httpResponse.json();
  //console.log(responseBody);
  const potlukk: Potlukk = responseBody.data.updateInvite;
  //console.log(potlukk.dishes);
  return potlukk;
}

export async function updatePotlukk(updateInfo: PotlukkDetailsSwapInput): Promise<Potlukk> {
  const query = `mutation updatePotlukk($updateInput: PotlukkDetailsSwapInput!){
    swapPotlukkDetails(input:$updateInput){
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
  }`

  const variables = {updateInput:updateInfo};

  const requestBody = JSON.stringify({query,variables});
  const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{"Content-Type":"application/json"}});
  const responseBody = await httpResponse.json();
  //console.log(responseBody);
  const potlukk: Potlukk = responseBody.data.swapPotlukkDetails;
  //console.log(potlukk.dishes);
  return potlukk;
}