import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import {
  getAllProduct,
  findandUpdateProduct,
  findandDeleteProduct,
  undoProduct,
  fetchCategory,
} from "../../../services/admin";
import { RootStateOrAny, useSelector } from "react-redux";
import { IallProduct } from "../../../interfaces/commonInterface";
import "bootstrap/dist/css/bootstrap.min.css";
import "./product.css";
import React from "react";
import CommonSelect from "../../utilities/formElements/CommonSelect";
import { useForm } from "react-hook-form";
import CommonMultiSelect from "../../utilities/formElements/CommonSelect";
import { useFilter } from "../../hooks/useFilters";

const AllProduct = () => {
  const { control, getValues } = useForm();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dlt, setDlt] = useState<boolean>(false);
  const [isId, setIsId] = useState<String>("");
  const [undo, setUndo] = useState<boolean>(false);
  const [addProduct, setAddProduct] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useFilter();
  const [reload, setReload] = useState(false);

  const isLoggedin = useSelector(
    (state: RootStateOrAny) => state.AuthReducer.isLoggedIn
  );

  const location = window.location;
  const history = window.history;

  if (isLoggedin) {
    history.pushState(null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }

  const fetchData = async () => {
    try {
      const dataList = await getAllProduct();
      setData(dataList.productData);
      setIsLoading(true);
    } catch (error) {
      console.log("Error in fetching product data: ", error);
    }
  };

  const addProductToUser = async (data: any) => {
    setAddProduct(true);
    setIsId(data._id);
    try {
      const res = await findandUpdateProduct(data._id);
      if (res.status === 200) {
        alert("Product Successfully added to user dashboard");
      } else if (res.status === 400) {
        alert("Product has already been added to user dashboard");
      } else if (res.status === 404) {
        alert("Product you want to add doesn't exist in admin pannel");
      } else {
        alert("Error while findind the product");
      }
      setAddProduct(false);
    } catch (error) {
      console.log("error in add product", error);
    }
  };

  const removeProduct = async (id: String) => {
    setUndo(true);
    setIsId(id);
    try {
      const res = await undoProduct(id);
    } catch (error) {
      console.log("error in delete product", error);
    }
    setUndo(false);
  };

  const deleteProduct = async (id: string) => {
    setDlt(true);
    setIsId(id);
    try {
      const res = await findandDeleteProduct(id);
    } catch (error) {
      console.log("error in delete product", error);
    }
    setDlt(false);
  };

  const fetchCategoryList = async () => {
    try {
      const dataList: any = await fetchCategory();
      setCategory(dataList.data);
      setIsLoading(true);
    } catch (error) {
      console.log("Error in fetching product data: ", error);
    }
  };

  // useEffect(() => {
  //   console.log("label",getValues("category")?.label);
  //   console.log("value",getValues("category")?.value);
  // }, [reload]);

  useEffect(() => {
    fetchData();
    fetchCategoryList();
  }, [dlt, undo, addProduct]);

  return (
    <div className="d-flex product">
      <div>
        {/* <CommonMultiSelect
          name="category"
          firstOption="Select Category"
          secondOption="All"
          placeholder={"Select Category"}
          control={control}
          options={[...category]}
          onchange={() => {
            setReload(!reload);
            setGlobalFilter({
              ...globalFilter,
              filter: {
                ...globalFilter.filter,
                category: {
                  label: getValues("category")?.label,
                  value: getValues("category")?.value,
                },
              },
            });
          }}
        /> */}
      </div>
      {data && data.length
        ? data.map((item: IallProduct, index) => (
            <Card key={index} className="productCard">
              <Card.Img
                variant="top"
                // src={item.image}
                alt="Product"
                className="productImg"
              />
              <Card.Body>
                <Card.Title>{item.productname}</Card.Title>
                <Card.Title>{item.description}</Card.Title>
                <Card.Text>Price: {item.price}</Card.Text>
                {item.enum === "INACTIVE" ? (
                  <Button
                    variant="success"
                    onClick={() => addProductToUser(item)}
                    disabled={isId === item._id && addProduct}
                  >
                    Add
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => removeProduct(item._id)}
                    disabled={isId === item._id && undo}
                  >
                    Undo
                  </Button>
                )}
                &nbsp;&nbsp;
                <Button
                  variant="primary"
                  onClick={() => deleteProduct(item._id)}
                  disabled={isId === item._id && dlt}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))
        : null}
    </div>
  );
};

export default AllProduct;
