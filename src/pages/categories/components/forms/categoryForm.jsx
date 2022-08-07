import React, { useState, useEffect, useRef } from "react";
import MainLayout from "../../../../layout/MainLayout";
import ApiServices from "../../../../networks/ApiServices";
import AxiosServices from "../../../../networks/AxiosService";
import EbLoader from "../../../../components/common/Loader/index";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { categoryForms } from "../../../../utils";

const CategoryForm = () => {
  const history = useNavigate();
  const { lang, level, _id } = useParams();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    level: "",
    lang: "",
    form: "",
    category: "",
  });

  async function getCategory() {
    try {
      setLoading(true);
      if (_id) {
        let response = await AxiosServices.get(
          `${ApiServices.category}/${_id}`
        );
        let cat = response.data.data;
        let { name, description, lang, level, category, form } = cat;
        setCategory({ name, description, lang, level, category, form });
        setLoading(false);
      } else {
        // add new category
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

  async function createOrUpdateCategory() {
    if (category.name.length && category.description.length > 0) {
      try {
        let response = _id
          ? await AxiosServices.put(`${ApiServices.category}/${_id}`, category)
          : await AxiosServices.post(ApiServices.category, {
              level,
              lang,
              category: "main",
              form: category.form,
              name: category.name,
              description: category.description,
            });
        let data = response.data;
        toast.success(data.message);
        history(`/categories/${category.lang || lang}`);
        setLoading(false);
      } catch (error) {
        let data = (error.response && error.response.data) || {};
        toast.error(data.message);
        setErr(data.message);
        setLoading(false);
      }
    } else {
      category.name < 1 && toast.error("Name field is required.");
      category.description < 1 && toast.error("Description field is required.");
    }
  }

  const onSubmit = () => {
    createOrUpdateCategory();
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
            {_id ? "Edit category name" : "Add new category"}
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
              <select
                id="form"
                onChange={handleChange}
                className="custom-select my-1 mr-sm-2"
              >
                <option defaultValue="">...</option>
                {categoryForms.map((form) => (
                  <option
                    selected={category.form == form.value ? true : false}
                    defaultValue={form.value}
                  >
                    {form.name}
                  </option>
                ))}
              </select>
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

export default CategoryForm;
