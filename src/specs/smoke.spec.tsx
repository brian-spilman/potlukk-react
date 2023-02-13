import { render, screen } from "@testing-library/react";
//import * as api from "../api/lukker-requests";
import App from "../App";
//import { LukkerInfo } from "../component/lukker-info";

// smoke test
test("Github action works correctly", async () => {
    render(<App/>);
    const heading = await screen.findByText(/Potlukk/); // Just check that the element is there
});

// how to individually mock a method
// test("Get Lukkers", async () => {
//     // jest.spyOn(api, "getLukkers").mockReturnValue(new Promise((resolve, reject)=>{
//     //     resolve([{userId:101, username:"kenDog", fname:"Kenny", lname:"McFake"}])
//     // })); // mocking the return value
//     jest.spyOn(api, "getLukkers").mockImplementation(async () => {
//         return [{userId:202, username:"JimBo", fname:"Jim", lname:"Pastiche"}]
//     }); // mocking the function itself. will replace the function in the code with the fake one
//     const lukkers = await api.getLukkers();
//     console.log(lukkers);
// });

// test("Lukker List", async ()=>{
    
//     render(<LukkerInfo/>);
//     const element = await screen.findAllByText(/Billy/);
//     screen.debug();
// })