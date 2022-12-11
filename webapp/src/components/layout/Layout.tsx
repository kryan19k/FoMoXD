import NavSideBar from "../ui/NavSideBar/NavSideBar"

const Layout = (props: any) => {
  const onSubmit = (enterDeviceData: any) => {
    props.onSubmit(enterDeviceData)
  }
  return (
    <div className="App">
      <NavSideBar onSubmit={onSubmit} />
      <main>{props.children}</main>
    </div>
  )
}

export default Layout
