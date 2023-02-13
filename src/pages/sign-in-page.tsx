
export function SignInPage() {



    return <>
        <form>
            <h1>Sign Page</h1>

            <label htmlFor="username">User Name</label>
            <input id="username" type="text" />

            <label htmlFor="password">Password</label>
            <input id="password" type="text" />

            <button>Sign In</button>
            <hr />
            <h2>New User</h2>
            <button>Sign Up</button>
        </form>

    </>
}