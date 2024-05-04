import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Banner from '../../components/Banner/Banner';
import { CategoryBlock } from '../../components/CategoryBlock/CategoryBlock';
import { Loader } from '../../components/Loader/Loader';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { fetchProducts } from '../../features/productsSlice';
import { getBrandNewProducts } from '../../helpers/getBrandNewProducts';
import { getHotPriceProducts } from '../../helpers/getHotPrices';
import './HomePage.scss';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const hotPricedProducts = useMemo(() => {
    return getHotPriceProducts(products);
  }, [products]);

  const newProducts = useMemo(() => {
    return getBrandNewProducts(products);
  }, [products]);

  return (
    <main className="main">
      <h1 className="main__header">Welcome to Nice Gadgets store!</h1>
      <Banner />
      {loading ? (
        <Loader />
      ) : (
        <div className="main__content">
          <ProductSlider products={hotPricedProducts} title="Hot prices" />

          <CategoryBlock />

          <ProductSlider products={newProducts} title="Brand new models" />
        </div>
      )}
    </main>
  );
};
