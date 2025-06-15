import type { Brand, Material } from "../../../../types/product.type";
import DescriptionItem from "./DescriptionItem";

interface Props {
  name: string;
  color: string;
  category: string;
  description: string;
  brand: Brand;
  material: Material;
  closure: string;
}
const Description: React.FC<Props> = ({
  name,
  category,
  closure,
  color,
  description,
  brand,
  material,
}) => {
  const productId = name.split(" ").at(-1);

  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 mb-20 shadow-sm space-y-4">
      <DescriptionItem title="Mã sản phẩm" content={productId ?? ""} />
      <DescriptionItem title="Màu sắc chính" content={color ?? ""} />
      <DescriptionItem title="Chất liệu" content={material.name ?? ""} />
      <DescriptionItem title="Kiểu buộc giày" content={closure ?? ""} />
      <DescriptionItem title="Danh mục sản phẩm" content={category ?? ""} />
      <DescriptionItem title="Tình trạng" content={"Mới 100%"} />
      <div className="mt-3">
        <strong>Nhãn hàng: </strong>
        <br />
        <p className="mt-3">Tên nhãn hãng: {brand.name}</p>
        <p className="mt-3">Quốc gia: {brand.country}</p>
        <p className="mt-3">
          <a
            href={brand.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Xem chi tiết website
          </a>
        </p>
      </div>
      <DescriptionItem title="Mô tả sản phẩm" />

      <p className="mt-3">{description}</p>
      <p className="mt-3">{material.description}</p>

      <p>
        <u>
          <em>
            <strong>Lưu ý</strong>:
          </em>
        </u>
        &nbsp;
        <em>
          Đối với các sản phẩm hết hàng sẵn hoặc hết size bạn cần, Quý
          khách&nbsp;có thể liên hệ với shop để sử dụng dịch vụ&nbsp;
          <a href="https://deestore.vn/pages/huong-dan-order">ORDER</a>&nbsp;sản
          phẩm của chúng tôi.
        </em>
      </p>
    </div>
  );
};

export default Description;
