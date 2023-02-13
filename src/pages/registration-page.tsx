export function RegistrationPage() {



    return <>

        <form onSubmit = {}>

            <label htmlFor="firstName">First Name</label>
            <input id="firstName" type="text" value="" required/>

            <label htmlFor="firstName">Last Name</label>
            <input id="lastName" type="text" value="" required/>

        
            <label htmlFor="username">Username</label>
            <input id="username" type="text" value="" required/>

            <label htmlFor="password">Password *</label>
            <input id="password" type="text" value="" required/>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" value="" required/>

            <input type="checkbox" value="milk" onChange={}>Milk</input>
            <input type="checkbox" value="egg" onChange={}>Egg</input>
            <input type="checkbox" value="soy" onChange={}>Soy</input>
            <input type="checkbox" value="treeNuts" onChange={}>Tree Nuts</input>

            <button type='submit'>Register</button>

        </form>

    </>
}