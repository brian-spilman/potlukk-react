
export function bringDish() {

    return <>

        <h2>Bring/Edit Dish</h2>

        <label htmlFor="name">Name</label>
        <input id="name" type="text" />

        <label htmlFor="description">Description</label>
        <input id="description" type="text" />

        <label htmlFor="serves">Serves</label>
        <input type="number" />

        <h4>Allergens:</h4>
        <label htmlFor="milkBox">Milk</label>
        <input id="milkBox" type="checkbox" value="milk" onChange={e => dispatch({ type: "SET_ALLERGY", payload: "MILK" })}></input>
        <label htmlFor="eggBox">Egg</label>
        <input id="eggBox" type="checkbox" value="egg" onChange={e => dispatch({ type: "SET_ALLERGY", payload: "EGG" })}></input>
        <label htmlFor="soyBox">Soy</label>
        <input id="soyBox" type="checkbox" value="soy" onChange={e => dispatch({ type: "SET_ALLERGY", payload: "SOY" })}></input>
        <label htmlFor="nutBox">Tree Nuts</label>
        <input id="nutBox" type="checkbox" value="treeNuts" onChange={e => dispatch({ type: "SET_ALLERGY", payload: "TREE NUTS" })}></input>

        <button>Complete</button>

    </>

}