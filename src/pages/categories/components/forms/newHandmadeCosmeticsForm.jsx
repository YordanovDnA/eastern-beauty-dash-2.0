import React, { useState, useEffect } from "react";
import StringInput from "./../common/ProductsFormInputs/stringInput";
import ListInput from "./../common/ProductsFormInputs/listInput";
import TextAreaInput from "./../common/ProductsFormInputs/textareaInput";
import MainLayout from "./../../../../layout/MainLayout";
import ApiServices from "../../../../networks/ApiServices";
import AxiosServices from "../../../../networks/AxiosService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const NewHandmadeCosmetics = () => {
  const { lang, id, cat } = useParams();
  let isNew = false;
  if (id === "new") {
    isNew = true;
  }

  const history = useNavigate();

  const [category, setCategory] = useState();
  const [products, setProducts] = useState({
    name: "",
    description: "",
    purpose: "",
    ingredients: [],
    mixing: "",
    usage: "",
    cautions: "",
  });
  const [loading, setLoading] = useState(true);
  //SUBMISION

  const createOrUpdateProduct = async () => {
    let { name, description, purpose, ingredients, mixing, usage, cautions } =
      products;
    try {
      let response = isNew
        ? await AxiosServices.post(ApiServices.products, {
            typeId: category._id,
            categoryId:
              category.level == 0 ? category._id : category.categoryId,
            name,
            lang,
            form: category.form,
            description,
            purpose,
            ingredients,
            mixing,
            usage: {
              howToUseIt: usage,
            },
            cautions,
          })
        : await AxiosServices.put(`${ApiServices.products}/${id}`, {
            typeId: products.typeId,
            categoryId: products.categoryId,
            name,
            description,
            purpose,
            ingredients,
            mixing,
            usage: {
              howToUseIt: usage,
            },
            cautions,
          });
      let { data, message } = response.data;
      setProducts({
        ...data,
        usage: data.usage && data.usage.howToUseIt,
      });
      toast.success(message);
      setLoading(false);
      history(
        isNew
          ? `/categories/sub/${category.lang}/${category._id}`
          : `/categories/sub/${products.lang}/${products.typeId}`
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
      products.name.length &&
      products.description.length &&
      products.purpose.length &&
      products.ingredients.length &&
      products.mixing.length &&
      products.usage.length &&
      products.cautions.length > 0
    ) {
      setLoading(true);
      createOrUpdateProduct();
    } else {
      products.name.length < 1 && toast.error("Name field is required.");
      products.description.length < 1 &&
        toast.error("Description field is required.");
      products.purpose.length < 1 && toast.error("Purpose field is required.");
      products.ingredients.length < 1 &&
        toast.error("Ingredients field is required.");
      products.mixing.length < 1 && toast.error("Mixing field is required.");
      products.usage.length < 1 && toast.error("Usage field is required.");
      products.cautions.length < 1 && toast.error("Caution field is required.");
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
      setProducts({
        ...data,
        usage: data.usage && data.usage.howToUseIt,
      });
      setLoading(false);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setProducts({
      ...products,
      [name]: value,
    });
  };

  const setIngredients = (name, list) => {
    setProducts({
      ...products,
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
          {id ? "Edit H.C." : "Add new H.C."}
        </h2>
        <form className="border shadow rounded bg-light p-4">
          {/* Name */}
          <StringInput
            title="Name"
            placeholder="Type a name..."
            setString={handleChange}
            value={products.name}
          />
          {/* Description */}
          <TextAreaInput
            title="Description"
            placeholder="Provide a short description..."
            setTextArea={handleChange}
            value={products.description}
          />
          {/* Purpose */}
          <StringInput
            title="Purpose"
            placeholder="Type the purpose"
            setString={handleChange}
            value={products.purpose}
          />
          {/* Ingredients */}
          <ListInput
            title="Ingredients"
            inputPlaceholder="Type an ingredient"
            list={products.ingredients}
            name="ingredients"
            setList={setIngredients}
          />
          {/* Mixing */}
          <TextAreaInput
            title="Mixing"
            placeholder="Provide information for mixing the ingredients..."
            setTextArea={handleChange}
            value={products.mixing}
          />
          {/* Usage */}
          <TextAreaInput
            title="Usage"
            placeholder="Provide information about usage..."
            setTextArea={handleChange}
            value={products.usage}
          />
          {/* Caution */}
          <TextAreaInput
            title="Cautions"
            placeholder="Provide information for cautions..."
            setTextArea={handleChange}
            value={products.cautions}
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

export default NewHandmadeCosmetics;
