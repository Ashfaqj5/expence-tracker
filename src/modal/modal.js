import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import './modal.css'

const ModalComponent = (props) => {

  const {show,onHide} =props
  const [inputValue,setValue] = useState()
  const [emailValid, setEmailValid] = useState(true);

console.log(inputValue)

  return (
    <>
      <Modal
        dialogClassName=""
        show={show}
        onHide={onHide}
        centered
      >
        <div className="confirmation-modal p-5 md:p-11">
          <Modal.Header closeButton className="text-lg text-slate-200">
          {
            props?.forgotFlow ?
            <div>
              <div className="p-0 md:pb-6" >Enter email</div>
              <input type="text" className="" style={{color:"black"}}
              onChange={(e)=>{
                setValue(e.target.value)
                const value = e.target.value;
                if(!value) {
                  setEmailValid("email is required")
                 }
                 else  if(!new RegExp(/^[^\s@]+@[^\s@]+(\.[^ !."`'#%&,:;<>=@{}~\$\(\)\*\+_\/\\\?\[\]\^\|]{2,4})$/).test(value)) {
                  setEmailValid("enter a valid email")
                 }
                 else {
                  setEmailValid(true)
                 };
              }}
              placeholder="Enter email"
              ></input>
              { emailValid && (
              <div className="text-xs" style={{color:"red"}}>{emailValid}</div>
              )}
            </div>
            :
             "Are you sure? to continue"

          }
          </Modal.Header>
          <Modal.Footer>
            <div className="footer">
                <button className="cancel" onClick={onHide}>{props.cancel}</button>
                <button className="save" onClick={()=>{props.forgotFlow ? props.onSubmit(inputValue) : props.onSubmit()}}>{props.save}</button>
            </div>

          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
  }
export default ModalComponent;
