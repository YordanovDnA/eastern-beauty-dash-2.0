import React, { useState, useEffect, useRef } from "react";
import MainLayout from "../../../../layout/MainLayout";
import ApiServices from "../../../../networks/ApiServices";
import AxiosServices from "../../../../networks/AxiosService";
import EbLoader from "../../../../components/common/Loader/index";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const SubcategoryForm = () => {
  const { lang, _id } = useParams();
  let isNew = false;
  if (lang && _id) {
    isNew = true;
  }
  const history = useNavigate();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [parentCategory, setParentCategory] = useState({});

  async function getCategory() {
    try {
      if (_id) {
        // when isNew this is parent catgory but in update mode its the  cateogry which being updated
        let response = await AxiosServices.get(
          `${ApiServices.category}/${_id}`
        );
        let cat = response.data.data;

        if (isNew) {
          setParentCategory(cat);
        } else {
          setCategory(cat);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setErr(data.message);
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    let { id, value } = e.target;
    setCategory({
      ...category,
      [id]: value,
    });
  };

  async function createOrUpdateSubCategory() {
    try {
      let response = isNew
        ? await AxiosServices.post(`${ApiServices.category}`, {
            name: category.name,
            description: category.description,
            level: parentCategory.level + 1,
            lang: lang,
            form: parentCategory.form,
            category:
              parentCategory.level === 0
                ? parentCategory.name
                : parentCategory.category,
            categoryId:
              parentCategory.level === 0
                ? parentCategory._id
                : parentCategory.categoryId,
            parent: parentCategory._id,
          })
        : await AxiosServices.put(`${ApiServices.category}/${category._id}`, {
            level: category.level,
            lang: category.lang,
            category: category.category,
            name: category.name,
            description: category.description,
          });
      let data = response.data;
      toast.success(data.message);
      let backUrl = isNew
        ? `/categories/sub/${parentCategory.lang}/${parentCategory._id}`
        : `/categories/sub/${category.lang}/${category.parent}`;
      history(backUrl);
      setLoading(false);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setErr(data.message);
      setLoading(false);
    }
  }

  const onSubmit = () => {
    if (category.name.length && category.description.length > 0) {
      setLoading(true);
      createOrUpdateSubCategory();
    } else {
      category.name.length < 1 && toast.error("Name field is required");
      category.description.length < 1 &&
        toast.error("Description field is required");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <MainLayout>
      {loading ? (
        <EbLoader />
      ) : (
        <>
          <h2 className="text-center mt-5">
            {_id ? "Edit subcategory name" : "Add new subcategory"}
          </h2>
          <br />
          <form className="col-6 mx-auto">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                value={category.name}
                placeholder="Category name"
                autoFocus={true}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                id="description"
                value={category.description}
                rows="10"
                placeholder={"Short description..."}
                onChange={handleChange}
              />
              <button
                style={{ display: "block", marginLeft: "auto" }}
                className="btn btn-success mt-3"
                type="button"
                onClick={() => onSubmit()}
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </MainLayout>
  );
};

export default SubcategoryForm;
