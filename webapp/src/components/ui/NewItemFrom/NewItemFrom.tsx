import React, { useState, useRef } from "react"
import ReactDOM from "react-dom"
import ItemFrom from "./ItemForm"
import "./NewItemFrom.css"

const NewItemFrom = (props: any) => {
  const onSubmit = (enterDeviceData: any) => {
    props.onClick()
    props.onSubmit(enterDeviceData)
  }

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div
          className={props.isShow ? "form-background-wrapper" : "hide"}
          onClick={(e) => {
            //@ts-ignore
            console.log("??", e.target, this)
            // if (e.target !== this) return
            props.onClick()
          }}
        >
          <ItemFrom
            isShow={props.isShow}
            onSubmit={onSubmit}
            style={{ "pointer-events": "none" }}
          ></ItemFrom>
        </div>,
        document.getElementById("backdrop-root") as HTMLElement
      )}
    </React.Fragment>
  )
}

export default NewItemFrom
