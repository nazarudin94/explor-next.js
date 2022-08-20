import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
