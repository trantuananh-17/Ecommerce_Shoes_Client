import { useNavigate, useParams } from "react-router-dom";
import ImagesOverView from "../../components/user/ProductDetail/ImagesOverView";
import { useCallback, useEffect, useState } from "react";
import { fetchDetailProducttAPI } from "../../services/product.service";
import type { IProductDetail } from "../../types/product.type";
import Breadcrumb from "../../components/user/ProductDetail/ui/Breadcrumb";
import ProductInfo from "../../components/user/ProductDetail/ProductInfo";
import ProductTabs from "../../components/user/ProductDetail/ProductTabs";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<IProductDetail | null>(null);
  const navigate = useNavigate();

  const fetchNewProduct = useCallback(async () => {
    if (!slug) return;
    try {
      const response = await fetchDetailProducttAPI(slug);
      console.log(response);

      if (response?.data) {
        setProduct(response.data);
      }
    } catch (error) {
      navigate("/error/not-found");

      console.error("Lỗi khi fetch chi tiết sản phẩm:", error);
    }
  }, [slug, navigate]);

  useEffect(() => {
    fetchNewProduct();
  }, [fetchNewProduct]);

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
                name={product.name}
                color={product.color}
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
