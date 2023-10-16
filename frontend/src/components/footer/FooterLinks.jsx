import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import '../../styles/FooterLinks.scss'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
const FooterLinks = () => {
  return (
    <>
        <section className='contact-section'>
            <div className='container contact'>
                <div className='contact-icon'>
                    <FaFacebook className='i'/>
                    <FaTwitter className='i'/>
                    <FaInstagram className='i'/>
                    <FaYoutube className='i'/>
                </div>
                <h2>Lets Talk?</h2>
                <Link href='#home' className='btn btn-dark'>Make an enquiry</Link>
            </div>
        </section>

        <section className="footer-section">
            <div className='container footer'>
                <div className="footer-logo">
                <img src={logo} alt='logo' />
                </div>
                <div className="footer-menu">
                    <p className='link-heading'>
                        Features
                    </p>
                    <ul className="nav-ul footer-links">
                        <li>
                            <a href="#home">Link Shortening</a>
                        </li>
                        <li>
                            <a href="#home">Branded Links</a>
                        </li>
                        <li>
                            <a href="#home">Analytics</a>
                        </li>
                        <li>
                            <a href="#home">Blod</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-menu">
                    <p className='link-heading'>
                        Resources
                    </p>
                    <ul className="nav-ul footer-links">
                        <li>
                            <a href="#home">Link Shortening</a>
                        </li>
                        <li>
                            <a href="#home">Branded Links</a>
                        </li>
                        <li>
                            <a href="#home">Analytics</a>
                        </li>
                        <li>
                            <a href="#home">Blod</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-menu">
                    <p className='link-heading'>
                        Company
                    </p>
                    <ul className="nav-ul footer-links">
                        <li>
                            <a href="#home">Link Shortening</a>
                        </li>
                        <li>
                            <a href="#home">Branded Links</a>
                        </li>
                        <li>
                            <a href="#home">Analytics</a>
                        </li>
                        <li>
                            <a href="#home">Blod</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-menu">
                    <p className='link-heading'>
                        Partners
                    </p>
                    <ul className="nav-ul footer-links">
                        <li>
                            <a href="#home">Link Shortening</a>
                        </li>
                        <li>
                            <a href="#home">Branded Links</a>
                        </li>
                        <li>
                            <a href="#home">Analytics</a>
                        </li>
                        <li>
                            <a href="#home">Blod</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </>
  )
} 

export default FooterLinks