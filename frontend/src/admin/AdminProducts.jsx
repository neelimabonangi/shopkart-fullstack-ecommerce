import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import AdminSidebar from "./AdminSidebar";

import "./Admin.css";

function AdminProducts() {

  // ✅ STATES
  const [products,
    setProducts] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const navigate =
    useNavigate();

  // ✅ FETCH PRODUCTS
  useEffect(() => {

    const fetchProducts =
      async () => {

      try {

        setLoading(true);

        // ✅ DIRECT API
        const res =
          await axios.get(
            "https://shopkart-fullstack-ecommerce.onrender.com/api/products"
          );

        console.log(
          "Products:",
          res.data
        );

        if (
          Array.isArray(
            res.data
          )
        ) {

          setProducts(
            res.data
          );

        } else {

          setProducts([]);

        }

      } catch (err) {

        console.error(
          "Fetch products error:",
          err
        );

        alert(
          "Backend not responding ❌"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchProducts();

  }, []);

  // ✅ DELETE
  const handleDelete =
    async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete)
      return;

    try {

      await axios.delete(
        `https://shopkart-fullstack-ecommerce.onrender.com/api/products/${id}`
      );

      setProducts((prev) =>

        prev.filter(
          (p) =>
            p.id !== id
        )
      );

      alert(
        "Product deleted ✅"
      );

    } catch (err) {

      console.error(err);

      alert(
        "Delete failed ❌"
      );
    }
  };

  // ✅ EDIT
  const handleEdit =
    (product) => {

    navigate(

      `/admin/products/edit/${product.id}`,

      {
        state: {
          product
        }
      }
    );
  };

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <div className="admin-content">

        <h2>
          All Products
        </h2>

        {/* LOADING */}
        {loading ? (

          <p>
            Loading products...
          </p>

        ) : products.length === 0 ? (

          <p>
            No products found
          </p>

        ) : (

          <table className="admin-table">

            <thead>

              <tr>

                <th>
                  Image
                </th>

                <th>
                  Name
                </th>

                <th>
                  Category
                </th>

                <th>
                  Price
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map(
                (p) => (

                <tr key={p.id}>

                  {/* IMAGE */}
                  <td>

                    <img
                      src={
                        p.imageUrl ||
                        p.image
                      }

                      alt={p.name}

                      width="60"

                      height="60"

                      style={{
                        objectFit:
                          "cover",

                        borderRadius:
                          "8px"
                      }}
                    />

                  </td>

                  {/* NAME */}
                  <td>
                    {p.name}
                  </td>

                  {/* CATEGORY */}
                  <td>
                    {p.category}
                  </td>

                  {/* PRICE */}
                  <td>
                    ₹{p.price}
                  </td>

                  {/* ACTIONS */}
                  <td>

                    <button
                      className="edit-btn"

                      onClick={() =>
                        handleEdit(p)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"

                      onClick={() =>
                        handleDelete(
                          p.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default AdminProducts;









