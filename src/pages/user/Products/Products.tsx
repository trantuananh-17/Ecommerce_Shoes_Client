import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Filter from "../../../components/user/Products/Filter";
import ProductList from "../../../components/user/Products/ProductList";
import Banner from "../../../components/user/Products/ui/Banner";
import MenuBtn from "../../../components/user/Products/ui/MenuBtn";
import { fetchBrandNameAPI } from "../../../services/brand.service";
import { fetchCategoryNameAPI } from "../../../services/category.service";
import { fetchClosureNameAPI } from "../../../services/closure.service";
import { fetchMaterialNameAPI } from "../../../services/material.service";
import { fetchListProductsAPI } from "../../../services/product.service";
import { Menus } from "../../../utils/filter.util";
import { updateMenus, type MenuItem } from "../../../utils/updateMenu";
import Pagination from "../../../components/user/Products/ui/Pagination";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;

  const [menus, setMenus] = useState<MenuItem[]>(Menus);
  const [pagination, setPagination] = useState({
    page: Number(page),
    limit: 9,
    totalDocs: 0,
    totalPages: 1,
  });

  const { data: MaterialData } = useQuery({
    queryKey: ["materials"],
    queryFn: () => fetchMaterialNameAPI(),
    staleTime: 1000 * 60 * 60,
  });

  const { data: CategoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategoryNameAPI(),
    staleTime: 1000 * 60 * 60,
  });

  const { data: BrandsData } = useQuery({
    queryKey: ["brands"],
    queryFn: () => fetchBrandNameAPI(),
    staleTime: 1000 * 60 * 60,
  });

  const { data: ClosuresData } = useQuery({
    queryKey: ["closures"],
    queryFn: () => fetchClosureNameAPI(),
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (MaterialData && CategoriesData && BrandsData && ClosuresData) {
      setMenus((prevMenus) =>
        updateMenus(
          prevMenus,
          MaterialData.data,
          CategoriesData.data,
          BrandsData.response,
          ClosuresData.data
        )
      );
    }
  }, [MaterialData, CategoriesData, BrandsData, ClosuresData]);

  const { data: Products } = useQuery({
    queryKey: ["products", pagination.page, pagination.limit],
    queryFn: () => fetchListProductsAPI(pagination.page, pagination.limit),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 60,
  });

  const products = Products?.data?.data || [];
  const paginationData = Products?.data;

  useEffect(() => {
    if (paginationData) {
      setPagination((prev) => ({
        ...prev,
        totalDocs: paginationData.totalDocs,
        totalPages: paginationData.totalPages,
        page: paginationData.currentPage,
      }));
    }
  }, [paginationData]);

  useEffect(() => {
    setSearchParams({ page: pagination.page.toString() });
  }, [pagination.page, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="bg-white">
      <Banner />
      <div className="flex p-8 gap-8 min-h-[40vh] ">
        <Filter menus={menus} />
        <div className="relative">
          <MenuBtn />
          <ProductList products={products} />
        </div>
      </div>
      <Pagination
        currentPage={pagination.page}
        totalItems={pagination.totalDocs}
        pageSize={pagination.limit}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Products;
