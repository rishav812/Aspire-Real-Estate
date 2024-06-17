import React, { useState, useEffect, ChangeEvent } from "react";

import { useForm } from "react-hook-form";
import InputWrapper from "../../utilities/formElements/InputWrapper";
import { useNavigate } from "react-router-dom";
import { IallProduct, initialProducts, IProduct } from "../../../interfaces/commonInterface";
import { addProduct, fetchCategory } from "../../../services/admin";

function AddProduct() {
  const [isButtonDisabled1, setButtonDisabled1] = useState<boolean>(false);
  const { control, handleSubmit, formState: { errors }} = useForm<IallProduct>();

  const [productData, setProductData] = useState<initialProducts>({
    productname: "",
    image: "",
    description: "",
    price: 0,
    category: {_id:"",category_name:""}
  });

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const dataList:any = await fetchCategory();
      setData(dataList.data);
      setIsLoading(true);
    } catch (error) {
      console.log("Error in fetching product data: ", error);
    }
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target && (e.target.files as FileList);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
      console.log("reader.result", reader.result);
      const result = reader.result;

      if (result && typeof result === "string") {
        setProductData({ ...productData, image: result });
      }
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    };
  };

  const onSubmit = async (data: IallProduct) => {
    setButtonDisabled1(true);
    try {
      const response = await addProduct({
        ...data,
        image: productData.image,
        category_id: productData?.category?._id
      });
      console.log(response)
      if (response.status === 200) {
        alert("Product added successfully");
        // navigate("/all-product");
      }
      else if(response.status===400){
        alert("product already added")
      }
      else{
        alert("All fields are required")
      }
    } catch (error) {
      console.log("Error in adding product: ", error);
    }
    setButtonDisabled1(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    let categorydata = e.target.value;
    if(categorydata) {
      const category = data.find((elm: IProduct)=> elm.category_name===categorydata)
      setProductData({ ...productData, category: category});
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          padding: "20%",
          width: "100vw",
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <br />
        <br />
        <h2>Create Product</h2>
        <br />
        <div className="form-group">
          <InputWrapper
            control={control}
            type="text"
            placeholder="Enter ProductName"
            name="productname"
            className="form-control beautiful-input"
          />
          <div className="message error">
            {errors && errors?.productname && (
              <p>
                <>{errors?.productname?.message}</>
              </p>
            )}
          </div>
        </div>
        <br />
        <div className="form-group">
          <InputWrapper
            control={control}
            type="tel"
            placeholder="Enter Price"
            name="price"
            className="form-control beautiful-input"
          />
          <div className="message error">
            {errors && errors?.price && (
              <p>
                <>{errors?.price?.message}</>
              </p>
            )}
          </div>
        </div>
        <br />
        <div className="form-group">
          <InputWrapper
            control={control}
            type="text"
            placeholder="Product Description"
            name="description"
            className="form-control beautiful-input"
          />
          <div className="message error">
            {errors && errors?.description && (
              <p>
                <>{errors?.description?.message}</>
              </p>
            )}
          </div>
        </div>
        <br />
        <div className="form-group">
          <InputWrapper
            control={control}
            type="file"
            placeholder="Upload Image"
            name="image"
            onChange={handleClick}
            className="form-control beautiful-input"
          />
          <div className="message error">
            {errors && errors?.image && (
              <p>
                <>{errors?.image?.message}</>
              </p>
            )}
          </div>
        </div>
        <br />
        <div className="form-group">
          Category :
          <select id="categories" name="categories" onChange={(e) => handleCategory(e)}>
            {data && data.length ? (
              data.map((item: any) => {
                return (
                  <option key={item._id} value={item.id}>
                    {item.category_name}
                  </option>
                );
              })
            ) : (
              <option value="">Select</option>
            )}
          </select>
        </div>
        <br />
        <button type="submit" className="btn btn-primary" disabled={isButtonDisabled1}>Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
