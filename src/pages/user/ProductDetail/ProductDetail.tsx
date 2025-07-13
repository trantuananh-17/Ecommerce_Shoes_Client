import { replace, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import type { IProductDetail } from "../../../types/product.type";
import { fetchDetailProducttAPI } from "../../../services/product.service";
import Breadcrumb from "../../../components/user/ProductDetail/ui/Breadcrumb";
import ImagesOverView from "../../../components/user/ProductDetail/ImagesOverView";
import ProductInfo from "../../../components/user/ProductDetail/ProductInfo";
import ProductTabs from "../../../components/user/ProductDetail/ProductTabs";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<IProductDetail | null>(null);
  const [loading, setLoading] = useState(true); // Thêm state để quản lý trạng thái loading
  const navigate = useNavigate();

  const fetchNewProduct = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      const response = await fetchDetailProducttAPI(slug);

      if (response?.data) {
        setProduct(response.data);
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error("Lỗi khi fetch chi tiết sản phẩm:", error);
      navigate("/error/not-found", { replace: true });
    } finally {
      setLoading(false);
    }
  }, [slug, navigate]);

  useEffect(() => {
    fetchNewProduct();
  }, [fetchNewProduct]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="container mb-20">
        {product && (
          <>
            <Breadcrumb category={product.category} name={product.name} />

            <div className="lg:grid grid-cols-4 gap-7 mt-4 flex items-start justify-center">
              <ImagesOverView
                images={product.images}
                thumbnail={product.images[0]?.url ?? ""}
              />

              <ProductInfo
                id={product.id}
                name={product.name}
                color={product.color}
                material={product.material.name}
                closure={product.closure}
                price={product.price}
                averageRating={product.averageRating}
                sizesWithQuantity={product.sizesWithQuantity}
                sizes={product.sizes}
                discountPercentage={product.discountPercentage}
                discountedPrice={product.discountedPrice}
                isInWishlist={product.isInWishlist}
              />
            </div>
          </>
        )}
      </div>

      <div className="container max-w-[1280px] w-full">
        {product && product.brand && (
          <ProductTabs
            name={product.name}
            color={product.color}
            description={product.description}
            category={product.category}
            closure={product.closure}
            material={product.material}
            brand={product.brand}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
