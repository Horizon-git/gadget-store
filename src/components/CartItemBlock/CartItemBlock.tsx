import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
// eslint-disable-next-line max-len
import {
  decreaseItem,
  increaseItem,
  removeCartItem,
} from '../../features/cartSlice';
import { CartItem } from '../../types/CartItem';
import './CartItemBlock.scss';

type Props = {
  item: CartItem;
};

export const CartItemBlock: React.FC<Props> = ({ item }) => {
  const { id, title, image, price, quantity } = item;

  const dispatch = useAppDispatch();
  const onClickIncrease = () => {
    dispatch(increaseItem(item));
  };

  const onClickDecrease = () => {
    dispatch(decreaseItem(item));
  };

  const onClickclear = () => {
    dispatch(removeCartItem(item));
  };

  return (
    <>
      <div className="cart-item">
        <div className="cart-item__container">
          <button
            type="button"
            className="cart-item__delete"
            aria-label="delete"
            onClick={onClickclear}
          >
            <span className="icon icon--close" />
          </button>
          <Link to={`/phones/${id}`}>
            <img src={image} alt="" className="cart-item__image" />
          </Link>
          <Link to={`/phones/${id}`}>
            <div className="cart-item__name">
              <div className="cart-item__name__char">{title}</div>
            </div>
          </Link>
        </div>

        <div className="cart-item__container--right">
          <div className="cart-item__count">
            <button
              type="button"
              className="cart-item__action-quantity"
              disabled={quantity === 1}
              onClick={onClickDecrease}
            >
              -
            </button>
            <span className="cart-item__quantity">{quantity}</span>
            <button
              type="button"
              className="cart-item__action-quantity"
              onClick={onClickIncrease}
            >
              +
            </button>
          </div>
          <div className="cart-item__price">{`$${price * quantity}`}</div>
        </div>
      </div>
    </>
  );
};
