import { useCallback, useEffect, useState } from "react";
import Banner from "../../../components/user/Landing/Banner";
import Benefits from "../../../components/user/Landing/Benefits";
import BestSeller from "../../../components/user/Landing/BestSeller";
import DiscountCode from "../../../components/user/Landing/DiscountCode";
import type { IProductItem } from "../../../types/product.type";
import { usePagination } from "../../../hooks/usePagination";
import {
  fetchListDiscountedProductAPI,
  fetchListNewProductAPI,
} from "../../../services/product.service";
import ProductContext from "../../../context/ProductContext";
import NewProduct from "../../../components/user/Landing/NewProduct";

const LandingPage = () => {
  const { pagination, updatePagination } = usePagination(1, 4);

  const [listBestSeller, setBestSeller] = useState<IProductItem[]>([]);
  const [listNewProduct, setNewProduct] = useState<IProductItem[]>([]);

  const fetchBestSeller = useCallback(async () => {
    const response = await fetchListDiscountedProductAPI(
      pagination.page,
      pagination.limit
    );

    if (response?.data) {
      setBestSeller(response.data.data);
      updatePagination({
        totalDocs: response.data.totalDocs,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        limit: response.data.limit,
      });
    }
  }, [pagination.page, pagination.limit, updatePagination]);

  const fetchNewProduct = useCallback(async () => {
    const response = await fetchListNewProductAPI(
      pagination.page,
      pagination.limit
    );

    if (response?.data) {
      setNewProduct(response.data.data);
      updatePagination({
        totalDocs: response.data.totalDocs,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        limit: response.data.limit,
      });
    }
  }, [pagination.page, pagination.limit, updatePagination]);

  useEffect(() => {
    fetchBestSeller();
    fetchNewProduct();
  }, [fetchBestSeller, fetchNewProduct]);

  console.log(listBestSeller);

  return (
    <div className="wrap">
      <Banner />
      <Benefits />
      <DiscountCode />
      <ProductContext.Provider value={listBestSeller}>
        <BestSeller />
      </ProductContext.Provider>
      <ProductContext.Provider value={listNewProduct}>
        <NewProduct />
      </ProductContext.Provider>
    </div>
  );
};

export default LandingPage;
