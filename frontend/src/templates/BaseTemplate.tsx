import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/BaseTemplate.css";

function BaseTemplate() {
  return (
    <div className="template">
      <Header />
      <section>
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}

export default BaseTemplate;
