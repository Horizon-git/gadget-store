/* eslint-disable max-len */
import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCartItem, removeCartItem } from '../../features/cartSlice';
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from '../../features/favoritesSlice';
import { Product } from '../../types/Product';

import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector(state => state.favorites);
  const { cart } = useAppSelector(state => state.cart);

  const isFavorite = useMemo(() => {
    return favorites.some(item => item.id === product.id);
  }, [favorites, product.id]);

  const isCart = useMemo(() => {
    return cart.some(item => item.id === product.itemId);
  }, [cart, product.itemId]);

  const addToFavorites = () => {
    if (!isFavorite) {
      dispatch(addFavoriteProduct(product));
    } else {
      dispatch(removeFavoriteProduct(product));
    }
  };

  const addToCart = () => {
    const item = {
      id: product.itemId,
      title: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    };

    if (!isCart) {
      dispatch(addCartItem(item));
    } else {
      dispatch(removeCartItem(item));
    }
  };

  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    itemId,
    category,
  } = product;

  return (
    <div className="card" data-cy="cardsContainer">
      <Link to={`/${category}/${itemId}`} className="card__link">
        <img src={`${image}`} alt={name} className="card__img" />
        <h2 className="card__title">{`${name}`}</h2>

        <div className="card__price">
          {price === fullPrice ? (
            <p className="card__price-regular">{`$${price}`}</p>
          ) : (
            <>
              <p className="card__price-regular">{`$${price}`}</p>
              <p className="card__price-discount">{`$${fullPrice}`}</p>
            </>
          )}
        </div>

        <div className="card__specs-container">
          <div className="card__specs">
            <p className="card__specs-title">Screen</p>
            <p className="card__specs-value">{screen}</p>
          </div>
          <div className="card__specs">
            <p className="card__specs-title">Capacity</p>
            <p className="card__specs-value">{capacity}</p>
          </div>
          <div className="card__specs">
            <p className="card__specs-title">RAM</p>
            <p className="card__specs-value">{ram}</p>
          </div>
        </div>
      </Link>

      <div className="card__buttons">
        <button
          type="button"
          data-cy="addToCart"
          className={classNames('add-to-cart', {
            'add-to-cart--active': isCart,
          })}
          onClick={addToCart}
        >
          {isCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          data-cy="addToFavorite"
          aria-label="addToFavorite"
          className={classNames('favorites', {
            'favorites--active': isFavorite,
          })}
          onClick={addToFavorites}
        >
          <span
            className={classNames('icon', {
              'icon--favorites': !isFavorite,
              'icon--favorites--red': isFavorite,
            })}
          />
        </button>
      </div>
    </div>
  );
};
