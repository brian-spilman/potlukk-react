import { FormEvent } from "react"

export function PotlukkConfirmationModal({ setOpenModal, submitData }: { setOpenModal: any, submitData:any}) {
console.log("confirmation")
    return <div>

        <p>Are you sure you want create this potlukk?</p>
        <button onClick={submitData}>Yes</button>
        <button onClick={() => {setOpenModal(false)}}>Cancel</button>

    </div>
}