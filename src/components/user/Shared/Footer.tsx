import NavLinkItem from "./ui/NavLinkItem";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-24">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <ul className="space-y-2">
              <NavLinkItem text="Contact" link="/" />
              <NavLinkItem text="Artists" link="/" />
              <NavLinkItem text="Local Giving" link="/" />
              <NavLinkItem text="Press" link="/" />
            </ul>
          </div>

          <div className="md:col-span-2 md:flex md:flex-col md:justify-center">
            <h3 className="font-semibold text-xl mb-4 lg:text-center">
              Sign Up For Our Newsletter To Receive Notifications And Other
              Promotions
            </h3>
            <div className="flex mt-4">
              <input
                type="email"
                placeholder="Email address..."
                className="flex-grow px-4 py-4 rounded-l-full border border-r-0 border-gray-300 focus:outline-none focus:border-black"
              />
              <button className="bg-black text-white px-6 py-2 rounded-r-full hover:bg-gray-800 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Customer Services</h3>
            <ul className="space-y-2">
              <NavLinkItem text="FAQs" link="/" />
              <NavLinkItem text="Store Locator" link="/" />
              <NavLinkItem text="Returns" link="/" />
              <NavLinkItem text="Shipping Information" link="/" />
              <NavLinkItem text="Wholesale" link="/" />
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-600 mb-4 md:mb-0 text-center">
            Copyright © 2025. All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
