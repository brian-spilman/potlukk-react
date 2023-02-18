import { FormEvent } from "react"
import "../../style/styles.css"

export function PotlukkConfirmationModal({ setOpenModal, submitData }: { setOpenModal: any, submitData: any }) {
    console.log("confirmation")
    return <>
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h3 style={{ margin: "5px 40px 50px ", }}>Are you sure you want to create this potlukk?</h3>
                </div>
                <button className="bigBtn" onClick={submitData}>Yes</button>
                <button id="noBtn" onClick={() => { setOpenModal(false) }}>Cancel</button>
            </div>
        </div>
    </>
}