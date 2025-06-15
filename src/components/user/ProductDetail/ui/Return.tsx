import React from "react";

const Return = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 mb-20 shadow-sm space-y-6 leading-relaxed text-gray-800">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">1. Giới thiệu</h2>
        <p>Chào mừng quý khách hàng đến với website của Darion.</p>
        <p>
          Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa
          là quý khách đồng ý với các điều khoản này. Trang web có quyền thay
          đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua
          bán hàng hóa này, vào bất cứ lúc nào.
        </p>
        <p>
          Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không
          cần thông báo trước. Việc tiếp tục sử dụng website sau khi thay đổi
          được đăng tải có nghĩa là quý khách đồng ý với những thay đổi đó.
        </p>
        <p>
          Quý khách vui lòng kiểm tra thường xuyên để cập nhật những thay đổi từ
          chúng tôi.
        </p>

        <h2 className="text-lg font-semibold">2. Hướng dẫn sử dụng website</h2>
        <p>
          Khi vào website, khách hàng phải đủ 18 tuổi hoặc có sự giám sát của
          người lớn. Khách hàng cam kết có đầy đủ năng lực hành vi dân sự để
          thực hiện các giao dịch theo pháp luật Việt Nam.
        </p>
        <p>
          Trong quá trình đăng ký, quý khách đồng ý nhận email quảng cáo. Nếu
          không muốn nhận nữa, có thể hủy bằng cách nhấn vào liên kết ở cuối mỗi
          email.
        </p>

        <h2 className="text-lg font-semibold">
          3. Thanh toán an toàn và tiện lợi
        </h2>
        <p>
          Quý khách có thể lựa chọn một trong các phương thức thanh toán sau:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Cách 1:</strong> Thanh toán trực tiếp tại cửa hàng
          </li>
          <li>
            <strong>Cách 2:</strong> Thanh toán sau (COD – giao hàng và thu tiền
            tận nơi)
          </li>
          <li>
            <strong>Cách 3:</strong> Thanh toán online qua chuyển khoản
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Return;
