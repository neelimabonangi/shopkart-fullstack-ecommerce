import ProductList from "./ProductList";

function ProductsPage({ category, search }) {
  return (
    <div className="products-page">
      <ProductList category={category} search={search} />
    </div>
  );
}

export default ProductsPage;

