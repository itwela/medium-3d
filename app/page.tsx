"use client"

import Model from "./model"

export default function MainPage() {
  return (
    <>
    <div className="flex place-content-center place-items-center w-screen h-screen bg-white text-black">
      {/* <h1>Lets import this 3d model!</h1> */}
      <Model />
    </div>
    </>
  )
}