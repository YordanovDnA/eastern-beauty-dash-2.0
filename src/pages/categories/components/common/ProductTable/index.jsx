import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../../../../components/common/Pagination/index";
import AxiosServices from "../../../../../networks/AxiosService";
import ApiServices from "../../../../../networks/ApiServices";
import { toast } from "react-toastify";
import FilterResults from "react-filter-search";
import { productsForm } from "../../../../../utils/index";
import EbModal from "../../../../../components/common/Modal/index";
import EbLoader from "./../../../../../components/common/Loader/index";

const ProductsTable = ({ products: data, category = {}, isMain }) => {
  const [products, setProducts] = useState(data);
  const [isOPen, setIsOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({
    itemId: null,
    itemPos: null,
  });

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [lang, setLang] = useState("en");

  const [err, setErr] = useState();

  const [pagination, setPagination] = useState({
    totalPage: 0,
    page: 0,
    limit: 10,
  });

  async function getProducts(currentPage) {
    try {
      let response = await AxiosServices.get(ApiServices.products, {
        lang: category.lang || lang,
        typeId: category._id,
        limit: pagination.limit,
        page: currentPage === 0 ? 0 : currentPage,
      });
      let products = response.data.data;
      setProducts(products);
      let data = response.data;
      let total = data.total || null;
      let limit = data.limit;
      let page = data.page;
      setPagination({
        total,
        limit,
        page,
        totalPage: (total && Math.ceil(total / limit)) || 0,
      });
      setLoading(false);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setErr(data.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, [lang, category && category._id]);

  const handleModalClose = (type) => {
    if (type === "save") {
      deleteItem(deletedItem.itemId, deletedItem.itemPos);
    }
    setIsOpen(false);
  };

  const handleDelete = async (catId, pos) => {
    setDeletedItem({
      itemId: catId,
      itemPos: pos,
    });
    setIsOpen(true);
  };

  const deleteItem = async (item, pos) => {
    try {
      let response = await AxiosServices.remove(
        `${ApiServices.products}/${item}`
      );
      let data = response.data;
      toast.success(data.message);
      let prod = [...products];
      prod.splice(pos, 1);
      setProducts(prod);
      setLoading(false);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setErr(data.message);
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      {/* The products table */}
      {loading ? (
        <EbLoader />
      ) : (
        <div className="productsTable m-4">
          <h3 className="ml-3 mb-3">Products</h3>
          <div className="row">
            <div className="offset-sm-10 col-sm-2">
              {isMain ? (
                <>
                  <select
                    onChange={(event) => setLang(event.target.value)}
                    className="custom-select my-1 mr-sm-2"
                  >
                    <option defaultValue="en" selected={lang === "en"}>
                      English
                    </option>
                    <option defaultValue="bul" selected={lang === "bul"}>
                      Bulgarian
                    </option>
                  </select>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-center" scope="col">
                  {category.name ? (
                    <Link
                      to={`/products/${productsForm[category.form]}/${
                        category._id
                      }/${category.lang}/new`}
                      className="btn btn-sm btn-success"
                    >
                      Add
                    </Link>
                  ) : (
                    ""
                  )}
                </th>
                <th className="text-center" scope="col">
                  Name
                </th>
                <th className="text-center" scope="col">
                  Description
                </th>
                <th className="text-center" scope="col">
                  <div className="input-group">
                    <input
                      onChange={(event) => setSearch(event.currentTarget.value)}
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FontAwesomeIcon icon={faSearch} />
                      </div>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Products table */}
              {products &&
                search < 1 &&
                products.map((e, index) => (
                  <tr key={e._id}>
                    <th scope="row">
                      <Link
                        to={
                          category.form
                            ? `/products/${productsForm[category.form]}/${
                                category._id
                              }/${category.lang}/${e._id}`
                            : `/products/${productsForm[e.form]}/${e.typeId}/${
                                e.lang
                              }/${e._id}`
                        }
                        className="btn text-info"
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </Link>
                    </th>
                    <td>
                      <Link to={`/categories/sub/product/${e._id}`}>
                        {e.name}
                      </Link>
                    </td>
                    <td>{e.description}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(e._id, index)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              {/* Products table - Search  */}
              {search.length > 0 && (
                <FilterResults
                  value={search}
                  data={products}
                  renderResults={(results) =>
                    results.map((e, index) => (
                      <tr key={e._id}>
                        <th scope="row">
                          <Link
                            to={`/newproduct/${lang}/${e._id}`}
                            className="btn text-info"
                          >
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </Link>
                        </th>
                        <td>
                          <Link to={`/categories/sub/product/${e._id}`}>
                            {e.name}
                          </Link>
                        </td>
                        <td>{e.description}</td>
                        <td>
                          <button
                            onClick={() => handleDelete(e._id, index)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                />
              )}
            </tbody>
          </table>
          <EbModal
            title="Delete Product"
            message="Permanently deleting this item"
            isOPen={isOPen}
            saveText="Delete"
            cancelText="Cancel"
            handleClose={handleModalClose}
          />

          <Pagination
            pagination={pagination}
            getData={getProducts}
            setPagination={setPagination}
          />
          {products.length < 1 && !err && (
            <div className="alert alert-danger text-center font-weight-bold">
              You do not have any products yet. Go ahead and create some in{" "}
              <Link to={`/categories/${lang}`}>categories</Link>.
            </div>
          )}
          {err && (
            <div className="alert alert-danger text-center font-weight-bold">
              {err}. Try to reload the page or contact the admin!
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductsTable;
