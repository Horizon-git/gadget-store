import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BackButton } from '../../components/BackButton/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { fetchProductDetails } from '../../features/productDetailsSlice';
import './ProductDetailsPage.scss';
import { Loader } from '../../components/Loader/Loader';
import { Category, Product } from '../../types/Product';
import { fetchProducts } from '../../features/productsSlice';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { getSuggestedProducts } from '../../helpers/getSuggestions';
// eslint-disable-next-line max-len
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from '../../features/favoritesSlice';
import { addCartItem, removeCartItem } from '../../features/cartSlice';
import { colors } from '../../helpers/colors';

export const ProductDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchEndX, setTouchEndX] = useState<number>(0);

  const { products, loading } = useAppSelector(state => state.products);
  const { favorites } = useAppSelector(state => state.favorites);
  const { cart } = useAppSelector(state => state.cart);
  const { productDetails, loadingDetails } = useAppSelector(
    state => state.productDetails,
  );

  const { productId = '' } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getCategory = (): Category => {
    const parts = location.pathname.split('/');

    return parts.find(
      part => part === 'phones' || part === 'tablets' || part === 'accessories',
    ) as Category;
  };

  useEffect(() => {
    const category = getCategory();

    dispatch(fetchProductDetails({ productId, category }));
  }, [dispatch, productId]);

  const isFavorite = useMemo(() => {
    return favorites.some(item => item.itemId === productDetails?.id);
  }, [favorites, productDetails?.id]);

  const isCart = useMemo(() => {
    return cart.some(item => item.id === productDetails?.id);
  }, [cart, productDetails?.id]);

  const addToFavorites = () => {
    if (productDetails) {
      const product = products.find(item => item.itemId === productDetails.id);

      if (!isFavorite) {
        dispatch(addFavoriteProduct(product as Product));
      } else {
        dispatch(removeFavoriteProduct(product as Product));
      }
    }
  };

  const addToCart = () => {
    if (productDetails) {
      const item = {
        id: productDetails.id,
        title: productDetails.name,
        image: productDetails.images[0],
        price: productDetails.priceRegular,
        quantity: 1,
      };

      if (!isCart) {
        dispatch(addCartItem(item));
      } else {
        dispatch(removeCartItem(item));
      }
    }
  };

  const suggestedProducts = useMemo(() => {
    if (productDetails) {
      return getSuggestedProducts(
        products,
        productDetails.id,
        8,
        getCategory(),
      );
    }

    return products;
  }, [productDetails, products]);

  const handleTouchStart = (event: React.TouchEvent<HTMLImageElement>) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLImageElement>) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (productDetails) {
      if (
        touchStartX - touchEndX > 50 &&
        currentIndex < productDetails?.images.length - 1
      ) {
        setCurrentIndex(currentIndex + 1);
      } else if (touchEndX - touchStartX > 50 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  return (
    <main className="details-page">
      {loading || loadingDetails ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs />
          <BackButton />

          {productDetails && (
            <>
              <section className="details">
                <h1 className="details__title">{`${productDetails?.name}`}</h1>
                <div className="details__top">
                  <div className="details__images-list">
                    <div className="details__images">
                      {productDetails.images.map((imageUrl, index) => (
                        <div
                          role="button"
                          key={imageUrl}
                          className={classNames('details__image', {
                            active: index === currentIndex,
                          })}
                          onClick={() => setCurrentIndex(index)}
                          onKeyPress={() => {}}
                          tabIndex={-1}
                        >
                          <img
                            src={imageUrl}
                            alt="photoLittle"
                            className="details__img-little"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="details__img-current">
                      <img
                        src={productDetails.images[currentIndex]}
                        alt="phone"
                        className="details__img-big"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                      />
                    </div>
                  </div>
                  <div className="details__info">
                    <div className="details__colors">
                      <h3 className="details__subTitle">Available colors</h3>
                      <div className="details__select__container">
                        {productDetails.colorsAvailable.map(color => {
                          const colorValue = colors.find(
                            item => item.name === color,
                          );

                          return (
                            <button
                              key={color}
                              aria-label="changeColor"
                              onClick={() =>
                                navigate(
                                  `/${productDetails.category}/${productDetails.namespaceId}-${productDetails.capacity.toLocaleLowerCase()}-${color}`,
                                )
                              }
                              className={classNames('details__colors__button', {
                                active: productDetails.color === color,
                              })}
                              type="button"
                            >
                              <div
                                className="details__colors__backGround"
                                style={{ backgroundColor: colorValue?.value }}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="details__capacity">
                      <h3 className="details__subTitle">Select capacity</h3>
                      <div className="details__select__container">
                        {productDetails.capacityAvailable.map(cap => (
                          <button
                            key={cap}
                            type="button"
                            onClick={() =>
                              navigate(
                                `/${productDetails.category}/${productDetails.namespaceId}-${cap.toLocaleLowerCase()}-${productDetails.color}`,
                              )
                            }
                            className={classNames('details__capacity__btn', {
                              'details__capacity__btn-active':
                                productDetails.capacity === cap,
                            })}
                          >
                            {`${cap}`}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="details__price-container">
                      {productDetails.priceDiscount !==
                      productDetails.priceRegular ? (
                        <>
                          <div className="details__price">{`$${productDetails.priceDiscount}`}</div>
                          <div className="details__price details__price-crossed">{`$${productDetails.priceRegular}`}</div>
                        </>
                      ) : (
                        <div className="details__price">{`$${productDetails.priceDiscount}`}</div>
                      )}
                    </div>

                    <div className="details__button">
                      <button
                        type="button"
                        className={classNames('details__button-add', {
                          'details__button-add--active': isCart,
                        })}
                        onClick={addToCart}
                      >
                        {isCart ? 'Added to cart' : 'Add to cart'}
                      </button>
                      <button
                        type="button"
                        aria-label="addToFavorite"
                        className="details__button-favorite"
                        data-cy="addToFavorite"
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

                    <div className="details__spec">
                      <div className="details__spec__list">
                        <span className="details__spec__name">Screen</span>
                        <span className="details__spec__name">Resolution</span>
                        <span className="details__spec__name">Processor</span>
                        <span className="details__spec__name">RAM</span>
                      </div>
                      <div className="details__spec__list">
                        <span className="details__spec__value">
                          {productDetails.screen}
                        </span>
                        <span className="details__spec__value">
                          {productDetails.resolution}
                        </span>
                        <span className="details__spec__value">
                          {productDetails.processor}
                        </span>
                        <span className="details__spec__value">
                          {productDetails.ram}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="details__bottom">
                  <div className="details__about">
                    <h3 className="details__heading">About</h3>
                    <div className="details__container">
                      {productDetails.description.map(item => (
                        <div key={item.title} className="details__description">
                          <div className="details__sub-heading">
                            {item.title}
                          </div>
                          <div className="details__text">{item.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="details__techSpecs">
                    <h3 className="details__heading">Tech Specs</h3>
                    <div className="details__techSpecs__container">
                      <div className="details__spec__list">
                        <span className="details__spec__name">Screen</span>
                        <span className="details__spec__name">Resolution</span>
                        <span className="details__spec__name">Processor</span>
                        <span className="details__spec__name">RAM</span>
                        <span className="details__spec__name">
                          Built in memory
                        </span>
                        <span className="details__spec__name">Camera</span>
                        <span className="details__spec__name">Zoom</span>
                        <span className="details__spec__name">Cell</span>
                      </div>
                      <div className="details__spec__list">
                        <span className="details__spec__value">
                          {productDetails.screen}
                        </span>
                        <span className="details__spec__value">
                          {productDetails.resolution}
                        </span>
                        <span className="details__spec__value">
                          {productDetails.processor}
                        </span>
                        <span className="details__spec__value">
                          {productDetails.ram}
                        </span>
                        <span className="details__spec__value">
                          {productDetails.capacity}
                        </span>
                        <span className="details__spec__value">
                          {productDetails.camera}
                        </span>
                        <span className="details__spec__value">
                          {productDetails.zoom}
                        </span>
                        <span className="details__spec__value">
                          {productDetails.cell.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
          <ProductSlider
            products={suggestedProducts}
            title="You may also like"
          />
        </>
      )}
    </main>
  );
};
