import React, { useState, useEffect } from "react";

import MainLayout from "../../layout/MainLayout";

import Loader from "react-loader-spinner";
import AxiosServices from "../../networks/AxiosService";
import ApiServices from "../../networks/ApiServices";
import EbLoader from "../../components/common/Loader/index";
import { toast } from "react-toastify";
import Pagination from "../../components/common/Pagination/index";
import EbModal from "../../components/common/Modal/index";
import CategoryTable from "./components/common/CategoryTable/index";
import { useParams } from "react-router-dom";

const Categories = (props) => {
  const { lang } = useParams();
  const [mainCategories, setMainCategories] = useState([]);
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

  async function getMainCategories(currentPage) {
    try {
      let response = await AxiosServices.get(ApiServices.category, {
        level: 0,
        lang,
        limit: pagination.limit,
        page: currentPage === 0 ? 0 : currentPage,
      });
      let mainCategories = response.data.data;
      setMainCategories(mainCategories);
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
      let cat = [...mainCategories];
      cat.splice(pos, 1);
      setMainCategories(cat);
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
    getMainCategories();
  }, [lang]);

  return (
    <MainLayout>
      {loading ? (
        <EbLoader />
      ) : (
        <>
          <h2 className="text-center mt-5">Categories</h2>
          <div className="productsTable m-4">
            <CategoryTable
              addUrl={`/categories/new/${lang}/0`}
              editUrl="/categories/edit"
              subCatUrl="/categories/sub"
              data={mainCategories}
              lang={lang}
              isMainCategory={true}
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
              getData={getMainCategories}
              setPagination={setPagination}
            />

            {mainCategories.length < 1 && !err && (
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

export default Categories;
