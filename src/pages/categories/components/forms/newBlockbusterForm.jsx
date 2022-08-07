import React, { useState, useEffect } from "react";
import MainLayout from "../../../../layout/MainLayout";
import StringInput from "../common/ProductsFormInputs/stringInput";
import TextAreaInput from "../common/ProductsFormInputs/textareaInput";
import ApiServices from "../../../../networks/ApiServices";
import AxiosServices from "../../../../networks/AxiosService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const NewBlockbustersForm = (props) => {
  const { lang, id, cat } = useParams();
  let isNew = false;
  if (id === "new") {
    isNew = true;
  }

  const history = useNavigate();
  const [category, setCategory] = useState();
  const [blockBuster, setBlockBuster] = useState({
    name: "",
    description: "",
    blockbuster: "",
  });
  const [loading, setLoading] = useState(true);
  //SUBMISION

  const createOrUpdateHealthyAlternatives = async () => {
    try {
      let response = isNew
        ? await AxiosServices.post(ApiServices.products, {
            typeId: category._id,
            categoryId:
              category.level == 0 ? category._id : category.categoryId,
            name: blockBuster.name,
            form: category.form,
            lang,
            description: blockBuster.description,
            blockbuster: blockBuster.blockbuster,
          })
        : await AxiosServices.put(`${ApiServices.products}/${id}`, {
            typeId: blockBuster.typeId,
            categoryId: blockBuster.categoryId,
            name: blockBuster.name,
            form: blockBuster.form,
            lang,
            description: blockBuster.description,
            blockbuster: blockBuster.blockbuster,
          });
      let { data, message } = response.data;
      setBlockBuster(data);
      toast.success(message);
      setLoading(false);
      history(
        isNew
          ? `/categories/sub/${category.lang}/${category._id}`
          : `/categories/sub/${blockBuster.lang}/${blockBuster.typeId}`
      );
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setLoading(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    createOrUpdateHealthyAlternatives();
  };

  const getCategory = async () => {
    try {
      let response = await AxiosServices.get(`${ApiServices.category}/${cat}`);
      let data = response.data.data;
      setCategory(data);
      setLoading(false);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setLoading(false);
    }
  };

  const getProduct = async () => {
    try {
      let response = await AxiosServices.get(`${ApiServices.products}/${id}`);
      let data = response.data.data;
      setBlockBuster(data);
      setLoading(false);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setBlockBuster({
      ...blockBuster,
      [name]: value,
    });
  };

  const handleList = (name, list) => {
    setBlockBuster({
      ...blockBuster,
      [name]: list || [],
    });
  };

  useEffect(() => {
    if (isNew) {
      getCategory();
    } else {
      getProduct();
    }
  }, []);

  return (
    <MainLayout>
      <div className="col-10 col-sm-6 col-md-10 col-lg-8 col-xl-6 m-auto pt-4">
        <h2 className="text-center text-green">
          {id ? "Edit blockbuster" : "Add new blockbuster"}
        </h2>
        <form className="border shadow rounded bg-light p-4">
          <StringInput
            title="Name"
            placeholder="Type blockbuster name"
            value={blockBuster.name}
            setString={handleChange}
          />
          <TextAreaInput
            title="Description"
            placeholder="Provide a short description for this blockbuster..."
            value={blockBuster.description}
            setTextArea={handleChange}
          />
          <TextAreaInput
            title="Blockbuster"
            placeholder="Provide the blockbuster information..."
            value={blockBuster.blockbuster}
            setTextArea={handleChange}
          />
          <button
            onClick={(event) => onSubmit(event)}
            type="submit"
            className="btn btn-primary float-right bg-green"
          >
            Submit
          </button>
          <br />
        </form>
      </div>
    </MainLayout>
  );
};

export default NewBlockbustersForm;
