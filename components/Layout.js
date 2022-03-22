
import MyNavbar from './MyNavbar'

export default function Layout({ children }) {
  return (
    <>
      <MyNavbar />
      <main>{children}</main>
    </>
  )
}
