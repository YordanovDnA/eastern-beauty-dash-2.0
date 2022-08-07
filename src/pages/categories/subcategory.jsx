import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import ProductsTable from "./components/common/ProductTable/index";

import AxiosServices from "../../networks/AxiosService";
import ApiServices from "../../networks/ApiServices";
import EbLoader from "../../components/common/Loader/index";
import { toast } from "react-toastify";
import Pagination from "../../components/common/Pagination/index";
import EbModal from "../../components/common/Modal/index";
import CategoryTable from "./components/common/CategoryTable/index";
import { useParams } from "react-router-dom";

const Subcategory = (props) => {
  const { lang, _id } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [healthyAlternatives, setHealthyAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOPen, setIsOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({
    itemId: null,
    itemPos: null,
  });
  const [err, setErr] = useState(false);
  const [pagination, setPagination] = useState({
    totalPage: 0,
    page: 0,
    limit: 10,
  });

  const [category, setCategory] = useState({});

  async function getCategory() {
    try {
      let response = await AxiosServices.get(`${ApiServices.category}/${_id}`);
      let category = response.data.data;
      setCategory(category);
      getCategories(null, category.level + 1);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setErr(data.message);
      setLoading(false);
    }
  }

  async function getCategories(currentPage = 0, level) {
    try {
      let response = await AxiosServices.get(ApiServices.category, {
        level,
        parent: _id,
        lang,
        limit: pagination.limit,
        page: currentPage === 0 ? 0 : currentPage,
      });
      let mainCategories = response.data.data;
      setSubCategories(mainCategories);
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

  async function getHealthyAlternatives(currentPage = 0, level) {
    try {
      let response = await AxiosServices.get(ApiServices.healthyAlternatives, {
        lang,
        limit: pagination.limit,
        page: currentPage === 0 ? 0 : currentPage,
      });
      let healthyAlternatives = response.data.data;
      setHealthyAlternatives(healthyAlternatives);
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

  const deleteItem = async (catId, pos) => {
    try {
      let response = await AxiosServices.remove(
        `${ApiServices.category}/${catId}`
      );
      let data = response.data;
      toast.success(data.message);
      let cat = [...subCategories];
      cat.splice(pos, 1);
      setSubCategories(cat);
      setLoading(false);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setErr(data.message);
      setLoading(false);
    }
  };

  const deleteHealthyAlternatives = async (catId, pos) => {
    try {
      let response = await AxiosServices.remove(
        `${ApiServices.healthyAlternatives}/${catId}`
      );
      let data = response.data;
      toast.success(data.message);
      let healthy = [...healthyAlternatives];
      healthy.splice(pos, 1);
      setHealthyAlternatives(healthyAlternatives);
      setLoading(false);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setErr(data.message);
      setLoading(false);
    }
  };

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

  useEffect(() => {
    getCategory();
    // getCategories();
  }, [_id, lang]);

  return (
    <MainLayout>
      {loading ? (
        <EbLoader />
      ) : (
        <>
          <h2 className="text-center mt-5">{category.name}</h2>
          <p className="d-flex justify-content-center">
            <span className="mx-auto badge badge-info">
              {" "}
              Level : {category.level + 1}
            </span>
          </p>

          <ProductsTable
            key={category && category.category && category.category._id}
            _id={_id}
            lang={lang}
            category={category}
          />

          <div className="productsTable m-4">
            <h3 className="ml-3 mb-3">Subcategories</h3>
            <CategoryTable
              addUrl={`/categories/sub/new/${lang}/${category._id}`}
              editUrl="/categories/sub/edit"
              subCatUrl="/categories/sub"
              data={subCategories}
              setLang={() => {}}
              handleDelete={handleDelete}
            />

            <EbModal
              title="Delete main category"
              message="Permanently deleting this item"
              isOPen={isOPen}
              saveText="Delete"
              cancelText="Cancel"
              handleClose={handleModalClose}
            />

            <Pagination
              pagination={pagination}
              getData={getCategories}
              setPagination={setPagination}
            />

            {subCategories.length < 1 && !err && (
              <div className="alert alert-danger text-center font-weight-bold">
                You do not have any categories yet. Go ahead and create some.
              </div>
            )}
            {err && (
              <div className="alert alert-danger text-center font-weight-bold">
                {err}. Try to reload the page or contact the admin!
              </div>
            )}
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Subcategory;
