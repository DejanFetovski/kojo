const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-logo">
          <a href="/">
            <img src="images/logo.png" alt="" />
          </a>
          <div className="col-md-4 mt-2 social">
            <a href="https://t.me/kojosolana" rel="noreferrer" target="_blank">
              <img src="images/telegram.png" alt="" />
            </a>
            <a
              href="https://x.com/kojosolana?s=21"
              rel="noreferrer"
              target="_blank"
            >
              <img src="images/twitter.png" className="twitter1" alt="" />
            </a>
          </div>
        </div>
        <div className="foot-last text-center">
          {' '}
          Copyright © 2024 Kojo. All Rights Reserved{' '}
        </div>
      </div>
    </footer>
  )
}

export default Footer
