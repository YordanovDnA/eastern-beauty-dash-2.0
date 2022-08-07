import React, { useState, useEffect } from "react";
import TextAreaInput from "./../common/ProductsFormInputs/textareaInput";
import StringInput from "./../common/ProductsFormInputs/stringInput";
import MainLayout from "./../../../../layout/MainLayout";
import ApiServices from "../../../../networks/ApiServices";
import AxiosServices from "../../../../networks/AxiosService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const NewHealthyAlternatives = () => {
  const { lang, id, cat } = useParams();
  let isNew = false;
  if (id === "new") {
    isNew = true;
  }

  const history = useNavigate();
  const [category, setCategory] = useState();
  const [healthyAlternatives, setHealthyAlternatives] = useState({
    name: "",
    description: "",
    insteadOf: "",
    tryTo: "",
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
            name: healthyAlternatives.name,
            form: category.form,
            lang,
            description: healthyAlternatives.description,
            insteadOf: healthyAlternatives.insteadOf,
            tryTo: healthyAlternatives.tryTo,
          })
        : await AxiosServices.put(`${ApiServices.products}/${id}`, {
            typeId: healthyAlternatives.typeId,
            categoryId: healthyAlternatives.categoryId,
            name: healthyAlternatives.name,
            form: healthyAlternatives.form,
            lang,
            description: healthyAlternatives.description,
            insteadOf: healthyAlternatives.insteadOf,
            tryTo: healthyAlternatives.tryTo,
          });
      let { data, message } = response.data;
      setHealthyAlternatives(data);
      toast.success(message);
      setLoading(false);
      history(
        isNew
          ? `/categories/sub/${category.lang}/${category._id}`
          : `/categories/sub/${healthyAlternatives.lang}/${healthyAlternatives.typeId}`
      );
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setLoading(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (
      healthyAlternatives.name.length &&
      healthyAlternatives.description.length &&
      healthyAlternatives.tryTo.length &&
      healthyAlternatives.insteadOf.length > 0
    ) {
      setLoading(true);
      createOrUpdateHealthyAlternatives();
    } else {
      healthyAlternatives.name.length < 1 &&
        toast.error("Name field is required");
      healthyAlternatives.description.length < 1 &&
        toast.error("Description field is required");
      healthyAlternatives.insteadOf.length < 1 &&
        toast.error("Instead of field is required");
      healthyAlternatives.tryTo.length < 1 &&
        toast.error("Try to field is required");
    }
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
      setHealthyAlternatives(data);
      setLoading(false);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setHealthyAlternatives({
      ...healthyAlternatives,
      [name]: value,
    });
  };

  const handleList = (name, list) => {
    setHealthyAlternatives({
      ...healthyAlternatives,
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
          {id ? "Edit H.A." : "Add new H.A."}
        </h2>
        <form className="border shadow rounded bg-light p-4">
          {/* Name */}
          <StringInput
            title="Name"
            placeholder="Type a name..."
            value={healthyAlternatives.name}
            setString={handleChange}
          />

          {/* Description */}
          <TextAreaInput
            title="Description"
            placeholder="Provide a short description..."
            value={healthyAlternatives.description}
            setTextArea={handleChange}
          />

          {/* Instead of */}
          <TextAreaInput
            title="Instead of"
            placeholder="Provide instead of information..."
            value={healthyAlternatives.insteadOf}
            name="insteadOf"
            setTextArea={handleChange}
          />

          {/* Tryt to */}
          <TextAreaInput
            title="Try to"
            placeholder="Provide information of try to..."
            value={healthyAlternatives.tryTo}
            name="tryTo"
            setTextArea={handleChange}
          />

          {/* Form submission */}
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

export default NewHealthyAlternatives;
