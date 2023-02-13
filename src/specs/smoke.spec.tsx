import { render, screen } from "@testing-library/react";
import App from "../App";


test("Github action works correctly", async () => {
    render(<App/>);
    const heading = await screen.findByText(/Potlukk/); // Just check that the element is there
})