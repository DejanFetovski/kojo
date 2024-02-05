import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Buynow from './Buynow'

export default function Index() {
  return (
    <>
      <Header />
      <div className="site-wraper">
        <section className="hero-sec" id="home">
          <div className="container">
            <div className="hero-sec-text">
              <div className="hero-sec-text-in">
                <h1>$KOJO: Where Meme Meets Moonshot on Solana!</h1>
                <p>
                  Welcome to $KOJO, the barkin' new sensation on the Solana
                  blockchain! As dog memes continue to skyrocket, $KOJO brings
                  you the ultimate blend of canine charisma and crypto coolness.
                  Get ready for a howlin' good time as we embark on a journey to
                  the moon, one meme at a time.
                </p>
                <img src="images/img1.png" width="250px" alt="" />
              </div>
            </div>
          </div>
        </section>
        <Buynow />
        <section id="about-us" className="why-section section-padding pb-0">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="heading-text">
                  <h4>About Kojo</h4>
                  <p>
                    Meet $KOJO, the memecoin with a paw-some twist. Our mascot,
                    the trendsetting tail-wagger, knows how to keep it cool in
                    the world of decentralized finance. Sporting shades and
                    barking at the crypto scene, $KOJO is not just a currency;
                    it's a meme-orable investment that's barking its way to the
                    moon.
                  </p>
                </div>
              </div>
              <div className="col-md-6 ms-auto">
                <figure className="mb-0">
                  <img src="images/img1.png" width="100%" alt="" />
                </figure>
              </div>
            </div>
          </div>
        </section>
        <section className="pre-box">
          <div className="container">
            <div className="pre-box-in">
              <div className="heading-text text-center w-75 m-auto">
                <h4>
                  Presale Live Now! <br /> Participate Early in KOJO’s Presale
                </h4>
                <span className="divider"></span>
                <p>
                  The presale for KOJO is now live, offering you the exclusive
                  opportunity to get involved before the official launch. This
                  public first-come, first-served (FCFS) presale is designed to
                  be open to everyone, ensuring a fair chance for all. Our goal
                  is to support our early supporters by providing them with
                  priority access before the official launch.
                </p>
                <h2>Secure Your KOJO Tokens Now</h2>
                <div className="text-center">
                  <a href="#home" className="btn btn-red">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="qr-sec" className="why-section section-padding pb-0">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-md-5">
                <figure className="mb-0">
                  <img src="images/img2.png" width="100%" alt="" />
                </figure>
              </div>
              <div className="col-md-6 ms-auto">
                <div className="heading-text">
                  <h4>Alternative Participation Method</h4>
                  <p>
                    If you prefer an alternative way to participate in the
                    presale or encounter difficulties accessing the dapp or
                    connecting your wallet to our website for security reasons,
                    you can still join the presale. Simply send SOL directly to{' '}
                    <a href="javascript:;">KojoCoin.sol</a>
                  </p>
                  <div className="qr-img">
                    <img src="images/qr.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-story section-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <article>
                  <figure>
                    <img src="images/img3.png" alt="" />
                  </figure>
                  <div className="heading-text">
                    <h4>🚀 POWER OF HODL</h4>
                    <span className="divider"></span>
                    <p>
                      With $KOJO, the market is not just bullish; it's downright
                      howlish. Forget traditional charts; we're trading in memes
                      and laughs. Join us as we transform the financial
                      landscape into a comic strip, and let's howl all the way
                      to the moon!
                    </p>
                  </div>
                </article>
              </div>
              <div className="col-md-6">
                <article>
                  <figure>
                    <img src="images/img2.png" alt="" />
                  </figure>
                  <div className="heading-text">
                    <h4>$KOJO'S DIARY</h4>
                    <span className="divider"></span>
                    <p>
                      Strutting into Meme-ory And that's the tail of $KOJO, the
                      crypto-loving canine with style and sass. Turning the
                      crypto sidewalk into a runway and cracking jokes that have
                      the whole community howling, $KOJO knows how to keep it
                      cool. Life's a walk in the park when you're as cool as
                      $KOJO.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
        <section className="about-section section-padding" id="why-sec">
          <div className="container">
            <div className="heading-text text-center w-50 mx-auto">
              <h4>Why Choose Kojo?</h4>
            </div>
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="heading-text">
                  <figcaption>
                    <h3>Unrivaled Memeness</h3>
                    <p>
                      KOJO isn't just a memecoin; it's a celebration of the best
                      memes on Solana. Our tokenomics and design are crafted to
                      make your investment experience both enjoyable and
                      profitable.
                    </p>
                  </figcaption>
                </div>
                <div className="heading-text">
                  <figcaption>
                    <h3>Solana-Powered</h3>
                    <p>
                      Harnessing the speed and efficiency of the Solana
                      blockchain, KOJO ensures quick transactions and low fees.
                      Say goodbye to slow and expensive transactions!
                    </p>
                  </figcaption>
                </div>
                <div className="heading-text">
                  <figcaption>
                    <h3>Community-Driven</h3>
                    <p>
                      KOJO thrives on community love. Join us in community
                      events, share your favorite dog memes, and watch KOJO grow
                      as we all do.
                    </p>
                  </figcaption>
                </div>
                <div className="heading-text">
                  <figcaption>
                    <h3>Secure and Transparent</h3>
                    <p>
                      Built on Solana's secure blockchain, KOJO ensures
                      transparency and reliability. Check our smart contract on
                      the blockchain and witness the security behind the
                      memeness
                    </p>
                  </figcaption>
                </div>
              </div>
              <div className="col-md-5 ms-auto">
                <figure>
                  <img src="images/img5.png" width="100%" alt="" />
                </figure>
              </div>
            </div>
          </div>
        </section>
        <section className="roadmap-sec section-padding" id="road-sec">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <img src="images/img7.png" width="100%" alt="" />
              </div>
              <div className="col-md-7">
                <div className="heading-text mb-4">
                  <h4>📅 ROADMAP</h4>
                </div>
                <ul>
                  <li>
                    <div className="phase-box">
                      <span>PHASE 1</span>
                    </div>
                    <div className="phase-details">
                      <h4>Presale</h4>
                      <div>
                        <span>Website Landing Page</span>
                        <span>Public Presale </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="phase-box">
                      <span>PHASE 2</span>
                    </div>
                    <div className="phase-details">
                      <h4>Launch on Solana</h4>
                      <div>
                        <span>Build Community</span>
                        <span>Dexscreener and Birdeye Update</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="phase-box">
                      <span>PHASE 3</span>
                    </div>
                    <div className="phase-details">
                      <h4>Trending on X</h4>
                      <div>
                        <span>CG & CMC Listing</span>
                        <span>Staking Dapp Audit</span>
                        <span>NFT Presale</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="phase-box">
                      <span>PHASE 4</span>
                    </div>
                    <div className="phase-details">
                      <h4>Exchange Listings Galore</h4>
                      <div>
                        <span>First Set of Exchange Listings</span>
                        <span>Moontok Listing</span>
                        <span>Adding Additional Liquidity</span>
                        <span>More Exchange Listings</span>
                        <span>Marketing Push</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="phase-box">
                      <span>PHASE 5</span>
                    </div>
                    <div className="phase-details">
                      <h4>Meme-orable Milestones</h4>
                      <div>
                        <span>Promo Wear</span>
                        <span>Tier 1 Listings</span>
                        <span>Staking D'app Full Release</span>
                        <span>NFT Drop</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="roshi-crypto section-padding">
          <div className="container">
            <img src="images/group.png" width="100%" alt="" />
            <div className="roshi-crypto-in">
              <h2>Kojo Community Hub</h2>
              <p>
                Join our Telegram and X communities to connect with fellow KOJO
                enthusiasts. Share your thoughts, engage in discussions, and
                stay updated on the latest news and events.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
