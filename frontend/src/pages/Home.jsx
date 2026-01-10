import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import ProductList from "./ProductList"; // ✅ FIXED IMPORT

function Home() {
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");

  const showBanner = category === null && search === "";

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        setCategory={setCategory}
      />

      {/* FIRST LOAD → BANNER */}
      {showBanner && <HeroBanner />}

      {/* AFTER SEARCH / CATEGORY */}
      {!showBanner && (
        <ProductList category={category} search={search} />
      )}
    </>
  );
}

export default Home;





