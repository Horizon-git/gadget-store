import { Link } from 'react-router-dom';

import './Footer.scss';

export const footerLinks = [
  {
    name: 'Github',
    path: 'https://github.com/Horizon-git',
  },
  {
    name: 'Contacts',
    path: '/',
  },
  {
    name: 'Rights',
    path: '/',
  },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__links">
          <Link to="/">
            <div className="footer__logo" />
          </Link>
          <nav className="footer__nav">
            {footerLinks.map(({ name, path }) => (
              <Link to={path} className="footer__link" key={name}>
                {name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer__button-container">
          <p className="footer__button-text">Back to top</p>
          <button
            className="footer__button"
            type="button"
            onClick={() => scrollToTop()}
          >
            <img
              src="./img/icons/arrow.svg"
              alt="Arrow"
              className="footer__image"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
