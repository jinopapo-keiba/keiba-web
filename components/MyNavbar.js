import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';


export default function MyApp(props) {
  return (
    <>
      <header>
        <Navbar bg="dark" expand="md" variant="dark">
            <Navbar.Brand href="#home">Umaaaaaa</Navbar.Brand>
            <Nav>
              <Link href="/analytics" passHref>
                <Nav.Link>
                  過去レース分析
                </Nav.Link>
              </Link>
              <Link href="/" passHref>
                <Nav.Link>
                開催レース分析
                </Nav.Link>
              </Link>
            </Nav>
        </Navbar>
      </header>
    </>
  )
}