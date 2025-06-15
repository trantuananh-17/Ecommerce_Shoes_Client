const PaymentTabs = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 mb-20 shadow-sm space-y-6 leading-relaxed text-gray-800">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">1. Giới thiệu</h2>
        <p>Chào mừng quý khách hàng đến với website của Darion.</p>
        <p>
          Khi quý khách truy cập vào trang website của chúng tôi có nghĩa là quý
          khách đồng ý với các điều khoản này. Trang web có quyền thay đổi,
          chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán
          hàng hóa này, vào bất cứ lúc nào.
        </p>
        <p>
          Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không
          cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang web sau
          khi các thay đổi được đăng tải, có nghĩa là quý khách chấp nhận với
          những thay đổi đó.
        </p>
        <p>
          Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay
          đổi của chúng tôi.
        </p>

        <h2 className="text-lg font-semibold">2. Hướng dẫn sử dụng website</h2>
        <p>
          Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc
          truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp.
        </p>
        <p>
          Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch
          mua bán hàng hóa theo quy định hiện hành của pháp luật Việt Nam.
        </p>
        <p>
          Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ
          website. Nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối
          bằng cách nhấp vào đường link ở dưới cùng trong mọi email quảng cáo.
        </p>

        <h2 className="text-lg font-semibold">
          3. Thanh toán an toàn và tiện lợi
        </h2>
        <p>Người mua có thể tham khảo các phương thức thanh toán sau đây:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Cách 1:</strong> Thanh toán trực tiếp (người mua nhận hàng
            tại địa chỉ cửa hàng)
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

export default PaymentTabs;
