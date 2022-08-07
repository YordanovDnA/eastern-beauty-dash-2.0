import React, { useState, useEffect } from "react";
import MainLayout from "./../../layout/MainLayout";
import AxiosServices from "./../../networks/AxiosService";
import ApiServices from "./../../networks/ApiServices";
import { toast } from "react-toastify";
import { Log } from "./components/common/Log/index";
import EbLoader from "./../../components/common/Loader/index";
import { useParams } from "react-router-dom";

const Product = () => {
  const { _id } = useParams();
  const [name, setName] = useState("");
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState();

  async function getProduct() {
    try {
      let response = await AxiosServices.get(`${ApiServices.products}/${_id}`);
      let cat = response.data.data;
      const { name } = cat;
      setName(name);
      setProduct(cat);
      setLoading(false);
    } catch (error) {
      let data = (error.response && error.response.data) || {};
      toast.error(data.message);
      setErr(data.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <MainLayout>
      {!loading && !err && <Log name={name} data={product} />}
      {!loading && !product && (
        <div className="alert alert-danger" role="alert">
          Ups something is wrong please reload the page or contact the admin.
        </div>
      )}
      {loading && <EbLoader message="Loading..." />}
    </MainLayout>
  );
};

export default Product;
