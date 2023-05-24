import { Outlet } from "react-router-dom"

export default function Layout() {
    return <div className="App">
    <div className='topBar-nav'></div>
    <div className='leftBar-nav'></div>
    <Outlet/>
  </div>
}