import { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'

const MyNavbar = () => {
  const { publicKey } = useWallet()

  const isMobile = useMediaQuery({ query: `(max-width: 991px)` })
  const [activeLink, setActiveLink] = useState('')
  const navigate = useNavigate()

  const handleLinkClick = (link) => {
    if (activeLink !== link) {
      setActiveLink(link)
    }
  }
  const handleConnectWallet = () => {
    navigate('#features')
  }

  return (
    <header>
      <Navbar expand="lg" className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Navbar.Brand href="/">
            <img src="images/logo.png" alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-right" />
          <Navbar.Collapse id="navbar-right">
            <Nav className="ml-auto">
              <Nav.Link
                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                href="#home"
                onClick={() => handleLinkClick('home')}
              >
                Home
              </Nav.Link>
              <Nav.Link
                className={`nav-link ${
                  activeLink === 'about-us' ? 'active' : ''
                }`}
                href="#about-us"
                onClick={() => handleLinkClick('about-us')}
              >
                ABOUT
              </Nav.Link>
              <Nav.Link
                className={`nav-link ${
                  activeLink === 'why-sec' ? 'active' : ''
                }`}
                href="#why-sec"
                onClick={() => handleLinkClick('why-sec')}
              >
                WHY Kojo
              </Nav.Link>
              <Nav.Link
                className={`nav-link ${
                  activeLink === 'road-sec' ? 'active' : ''
                }`}
                href="#road-sec"
                onClick={() => handleLinkClick('road-sec')}
              >
                Roadmap
              </Nav.Link>
              {isMobile ? (
                <div
                  className="d-flex justify-content-center  me-4 ms-4"
                  role="search"
                >
                  {publicKey ? (
                    <WalletMultiButton />
                  ) : (
                    <a className="btn   btn-red   centerr" href="#home">
                      Buy Now
                    </a>
                  )}
                </div>
              ) : (
                ''
              )}
            </Nav>
          </Navbar.Collapse>
          {!isMobile ? (
            <>
              <div className="d-flex mx-3" role="search">
                {publicKey ? (
                  <WalletMultiButton />
                ) : (
                  <a className="btn   btn-red  centerr" href="#home">
                    Buy Now
                  </a>
                )}
              </div>
              <a
                href="https://t.me/Akiraonsol"
                className="header-tele-ic"
                rel="noreferrer"
                target="_blank"
              >
                <img src="images/telegram.png" alt="" />
              </a>
            </>
          ) : (
            ''
          )}
        </div>
      </Navbar>
    </header>
  )
}

export default MyNavbar
