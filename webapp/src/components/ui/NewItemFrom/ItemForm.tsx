import React, { useEffect, useRef, useState, useReducer } from "react"
import BaseInput from "../BaseInput"

import "./ItemFrom.css"

const checkIsEmoji = (value?: string) => {
  if (!value) return false
  const regex = /\p{Extended_Pictographic}/gu
  return regex.test(value)
}

const ItemFrom = (props: any) => {
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35572
  const iconInputRef = useRef<HTMLInputElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)

  const activate = () => {
    // @ts-ignore
    iconInputRef.current.focus()
  }

  const inputReducer = (state: any, action: any) => {
    const isEmoji = checkIsEmoji(iconInputRef?.current?.value)
    if (action.type === "INPUT_BLUR") {
      return {
        input: {
          ...state.input,
        },
        isValid: isEmoji,
      }
    }
    return {
      input: {
        icon: iconInputRef?.current?.value as string,
        title: titleInputRef?.current?.value as string,
        name: nameInputRef?.current?.value as string,
        description: descriptionRef?.current?.value as string,
      },
      isValid: isEmoji,
    }
  }

  const [inputState, dispatchInput] = useReducer(inputReducer, {
    input: {
      icon: "",
      name: "",
      description: "",
      title: "",
    },
    isValid: false,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Checking from validity!")
      dispatchInput({
        type: "INPUT_BLUR",
      })
    }, 500)
    return () => {
      console.log("Clean up !!")
      clearTimeout(timer) // 每一次有新的 useEffect 被觸發都先清除前一個 setTmeout 重新計算
    }
  }, [inputState.input.icon])

  const submitHandler = (event: any) => {
    event.preventDefault()
    dispatchInput({
      type: "USER_SUBMIT",
    })

    if (!inputState.isValid) {
      alert("!isFormValid")
      return activate()
    }
    props.onSubmit(inputState.input)
  }

  return (
    <form
      onSubmit={submitHandler}
      onClick={(e: any) => {
        e.stopPropagation()
      }}
    >
      <div className="from-inputs">
        <div className="from-title">DEVICE</div>

        <BaseInput
          placeholder="emoji here..."
          label="icon"
          ref={iconInputRef}
        />

        <BaseInput label="title" ref={titleInputRef} />

        <BaseInput label="name" ref={nameInputRef} />

        <BaseInput label="description" ref={descriptionRef} />

        <div className="from-actions">
          <button type="submit">SAVE</button>
        </div>
      </div>
    </form>
  )
}

export default ItemFrom
