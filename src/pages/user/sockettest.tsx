import React, { useState, useEffect } from "react";
import { io } from "socket.io-client"; // Import socket.io-client
// types.ts
export interface ISizeWithQuantity {
  size: string;
  quantity: number;
}

export interface IProductDetail {
  id: number;
  name: string;
  sizesWithQuantity: ISizeWithQuantity[];
}

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<IProductDetail | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null); // Track selected size
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false); // Track if order has been placed
  const socket = io("http://localhost:4000"); // Kết nối WebSocket tới server

  useEffect(() => {
    socket.on("productUpdated", (updatedProduct: IProductDetail) => {
      setProduct(updatedProduct); // Cập nhật lại dữ liệu sản phẩm từ server
      setIsOrderPlaced(true); // Đặt hàng thành công, hiển thị thông báo
    });

    return () => {
      socket.off("productUpdated");
    };
  }, []);

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    setIsOrderPlaced(false); // Reset lại trạng thái đơn hàng khi chọn size mới
  };

  const handlePlaceOrder = () => {
    if (product && selectedSize) {
      // Gửi yêu cầu đặt hàng qua WebSocket
      socket.emit("placeOrder", {
        productId: product.id,
        size: selectedSize,
      });
    }
  };

  // Giả lập dữ liệu sản phẩm
  const initialProduct: IProductDetail = {
    id: 1,
    name: "Product 1",
    sizesWithQuantity: [
      { size: "S", quantity: 10 },
      { size: "M", quantity: 5 },
      { size: "L", quantity: 2 },
    ],
  };

  useEffect(() => {
    setProduct(initialProduct); // Set sản phẩm ban đầu
  }, []);

  return (
    <div>
      <h1>{product?.name}</h1>
      <div>
        <h3>Sizes</h3>
        {product?.sizesWithQuantity.map((sizeData: ISizeWithQuantity) => (
          <button
            key={sizeData.size}
            onClick={() => handleSelectSize(sizeData.size)}
            disabled={sizeData.quantity === 0}
          >
            {sizeData.size} ({sizeData.quantity} left)
          </button>
        ))}
      </div>

      {selectedSize && <p>Selected Size: {selectedSize}</p>}

      {/* Button to place the order */}
      {selectedSize && (
        <button onClick={handlePlaceOrder} disabled={isOrderPlaced}>
          Place Order
        </button>
      )}

      {/* Feedback message after order is placed */}
      {isOrderPlaced && <p>Your order has been placed successfully!</p>}
    </div>
  );
};

export default ProductDetail;
