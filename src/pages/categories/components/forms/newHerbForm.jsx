import React, { useState, useEffect } from "react";
import ListInput from "../common/ProductsFormInputs/listInput";
import StringInput from "../common/ProductsFormInputs/stringInput";
import TextAreaInput from "../common/ProductsFormInputs/textareaInput";
import MainLayout from "../../../../layout/MainLayout";
import ApiServices from "../../../../networks/ApiServices";
import AxiosServices from "../../../../networks/AxiosService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const NewHerbForm = () => {
  //Destructure props
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
    synonims: [],
    tags: [],
    location: [],
    usedParts: [],
    chemicalIngredients: [],
    whenToUseIt: [],
    howToUseIt: "",
    cautions: "",
  });
  const [loading, setLoading] = useState(true);
  //SUBMISION

  const createOrUpdateProduct = async () => {
    try {
      let response = isNew
        ? await AxiosServices.post(ApiServices.products, {
            typeId: category._id,
            categoryId:
              category.level == 0 ? category._id : category.categoryId,
            name: products.name,
            lang,
            form: category.form,
            description: products.description,
            purpose: products.purpose,
            ingredients: products.ingredients,
            synonims: products.synonims,
            tags: products.tags,
            usedParts: products.usedParts,
            chemicalIngredients: products.chemicalIngredients,
            location: products.location,
            mixing: products.mixing,
            usage: {
              howToUseIt: products.howToUseIt,
              whenToUseIt: products.whenToUseIt,
            },
            cautions: products.cautions,
          })
        : await AxiosServices.put(`${ApiServices.products}/${id}`, {
            typeId: products.typeId,
            categoryId: products.categoryId,
            name: products.name,
            description: products.description,
            purpose: products.purpose,
            ingredients: products.ingredients,
            synonims: products.synonims,
            tags: products.tags,
            usedParts: products.usedParts,
            chemicalIngredients: products.chemicalIngredients,
            location: products.location,
            mixing: products.mixing,
            usage: {
              howToUseIt: products.howToUseIt,
              whenToUseIt: products.whenToUseIt,
            },
            cautions: products.cautions,
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
      products.synonims.length &&
      products.tags.length &&
      products.location.length &&
      products.usedParts.length &&
      products.chemicalIngredients.length &&
      products.whenToUseIt.length &&
      products.howToUseIt.length &&
      products.cautions.length > 0
    ) {
      setLoading(true);
      createOrUpdateProduct();
    } else {
      products.name.length < 1 && toast.error("Name field is requred");
      products.description.length < 1 &&
        toast.error("Description field is requred");
      products.synonims.length < 1 && toast.error("Synonims field is requred");
      products.tags.length < 1 && toast.error("Tags field is requred");
      products.location.length < 1 && toast.error("Location field is requred");
      products.usedParts.length < 1 &&
        toast.error("Used parts field is requred");
      products.chemicalIngredients.length < 1 &&
        toast.error("Chemical ingredients field is requred");
      products.whenToUseIt.length < 1 &&
        toast.error("When to use it field is requred");
      products.howToUseIt.length < 1 &&
        toast.error("How to use it field is requred");
      products.cautions.length < 1 && toast.error("Cautions field is requred");
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
        whenToUseIt: data.usage.whenToUseIt,
        howToUseIt: data.usage.howToUseIt,
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

  const handleList = (name, list) => {
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
          {id ? "Edit herb" : "Add new herb"}
        </h2>
        <form className="border shadow rounded bg-light p-4">
          {/* Herb name */}
          <StringInput
            title="Name"
            placeholder="Type herb name"
            value={products.name}
            setString={handleChange}
          />
          {/* Description */}
          <TextAreaInput
            title="Description"
            placeholder="Provide a short description..."
            value={products.description}
            setTextArea={handleChange}
          />
          {/* Synonims */}
          <ListInput
            title="Synonims"
            inputPlaceholder="Type a synonim"
            list={products.synonims}
            name="synonims"
            setList={handleList}
          />
          {/* Tags */}
          <ListInput
            title="Tags"
            inputPlaceholder="Type a tag"
            list={products.tags}
            name="tags"
            setList={handleList}
          />
          {/* Location */}
          <ListInput
            title="Location"
            inputPlaceholder="Type a location"
            list={products.location}
            name="location"
            setList={handleList}
          />
          {/* Used parts */}
          <ListInput
            title="Used parts"
            inputPlaceholder="Type a part"
            list={products.usedParts}
            name="usedParts"
            setList={handleList}
          />
          {/* Chemical ingredients */}
          <ListInput
            title="Chemical ingredients"
            inputPlaceholder="Type an ingredient"
            list={products.chemicalIngredients}
            name="chemicalIngredients"
            setList={handleList}
          />
          {/* When to use it */}
          <ListInput
            title="When to use it"
            inputPlaceholder="Type when to use it"
            list={products.whenToUseIt}
            name="whenToUseIt"
            setList={handleList}
          />
          {/* How To Use */}
          <TextAreaInput
            title="How to use"
            name="howToUseIt"
            placeholder="Provide information how to use the herb..."
            value={products.howToUseIt}
            setTextArea={handleChange}
          />
          {/* Cautions */}
          <TextAreaInput
            title="Cautions"
            placeholder="Provide information of any warinings..."
            value={products.cautions}
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

export default NewHerbForm;
