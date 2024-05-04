import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { getTotalCount } from '../../helpers/getTotalCount';
import './Header.scss';
import './Nav.scss';
import './Menu.scss';
import { useState } from 'react';
import ThemeSwither from '../ThemeSwither/ThemeSwither';

export const headerLinks = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Phones',
    path: '/phones',
  },
  {
    name: 'Tablets',
    path: '/tablets',
  },
  {
    name: 'Accessories',
    path: '/accessories',
  },
];

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('nav__link', {
    'nav__link--active': isActive,
  });

const getIconClass = ({ isActive }: { isActive: boolean }) =>
  classNames('icon__block', {
    'icon__block--active': isActive,
  });

const getIconClassName = ({ isActive }: { isActive: boolean }) =>
  classNames('icon__block icon__block--mobile', {
    'icon__block--active': isActive,
  });

export const Header = () => {
  // const location = useLocation();
  // const pageName = location.pathname
  //   .split('/')
  //   .filter(path => path !== '')
  //   .join('');

  const favorites = useAppSelector(state => state.favorites.favorites);
  const cart = useAppSelector(state => state.cart.cart);
  const [showMenu, setShowMenu] = useState(false);
  // const root = document.documentElement.dataset.theme;

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <header className="header">
        <div className="header__container">
          <Link to="/" className="header__logo-container">
            <div className="header__logo" />
          </Link>
          <nav className="header__nav nav">
            <ul className="nav__list">
              {headerLinks.map(({ name, path }) => (
                <li className="nav__item" key={name}>
                  <NavLink className={getLinkClass} to={path}>
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="header__right">
          {/* {(pageName === 'phones' ||
            pageName === 'tablets' ||
            pageName === 'accessories' ||
            pageName === 'favorites') && <Search pageName={pageName} />} */}
          <div className="icon__block icon__block--theme">
            <ThemeSwither />
          </div>
          <NavLink className={getIconClass} to="/favorites">
            <span className="icon icon--favorites" />
            {favorites.length > 0 && (
              <span className="icon__counter">{favorites.length}</span>
            )}
          </NavLink>
          <NavLink className={getIconClass} to="/cart">
            <span className="icon icon--cart" />
            {cart.length > 0 && (
              <span className="icon__counter">{getTotalCount(cart)}</span>
            )}
          </NavLink>
          <button
            className="icon__block icon__block--menu"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="icon icon--menu" />
          </button>
        </div>
      </header>
      <aside
        className={classNames('header__menu menu', {
          'header__menu--visible': showMenu,
        })}
      >
        <header className="menu__header header">
          <div className="header__container">
            <Link to="/" className="header__logo-container">
              <img src="./img/logo.svg" alt="logo" className="header__logo" />
            </Link>
          </div>
          <div className="header__right">
            <div className="icon__block icon__block--theme">
              <ThemeSwither />
            </div>
            <button
              className="icon__block icon__block--menu"
              onClick={() => setShowMenu(!showMenu)}
            >
              <span className="icon icon--close" />
            </button>
          </div>
        </header>
        <nav className="menu__nav nav">
          <ul className="nav__list">
            {headerLinks.map(({ name, path }) => (
              <li className="nav__item" key={name}>
                <NavLink className={getLinkClass} to={path} onClick={closeMenu}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu__bottom">
          <NavLink
            className={getIconClassName}
            to="/favorites"
            onClick={closeMenu}
          >
            <span className="icon icon--favorites" />
            {favorites.length > 0 && (
              <span className="icon__counter">{favorites.length}</span>
            )}
          </NavLink>
          <NavLink className={getIconClassName} to="/cart" onClick={closeMenu}>
            <span className="icon icon--cart" />
            {cart.length > 0 && (
              <span className="icon__counter">{getTotalCount(cart)}</span>
            )}
          </NavLink>
        </div>
      </aside>
    </>
  );
};
