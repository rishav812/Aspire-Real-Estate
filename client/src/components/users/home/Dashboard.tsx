import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { BsPlus, BsDash } from "react-icons/bs";
import { IallProduct, IcartProduct } from "../../../interfaces/commonInterface";
import {
  fetchCategories,
  getAllProductService,
  getProductByCategory,
  addToCartService,
  addToWishlist,
} from "../../../services/user";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import React from "react";
import { AddToCartAction } from "../../../state_management/actions/CartAction";

const UserDashboard = () => {
  console.log("userdashboard===>");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonDisabled1, setButtonDisabled1] = useState<boolean>(false);
  const [isId1, setIsId1] = useState<String>("");
  const [isButtonDisabled2, setButtonDisabled2] = useState<boolean>(false);
  const [isId2, setIsId2] = useState<String>("");
  const [count, setCount] = useState(0);

  const isLoggedin = useSelector(
    (state: RootStateOrAny) => state.AuthReducer.isLoggedIn
  );

  const user_id = useSelector(
    (state: RootStateOrAny) => state.AuthReducer.authData.user_id
  );

  const userCartData = useSelector(
    (state: RootStateOrAny) => state.CartReducer
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
      const dataList = await getAllProductService(skip);
      console.log("datalist", dataList);
      setData(dataList.productData);
      setIsLoading(true);
    } catch (error) {
      console.log("Error in fetching product data: ", error);
    }
  };

  const loadCategory = async () => {
    try {
      const dataList = await fetchCategories();
      setCategory(dataList.data);
    } catch (error) {
      console.log("Error in fetching product data: ", error);
    }
  };

  const handleFilter = async (id: string) => {
    try {
      const dataList = await getProductByCategory(id);
      console.log(dataList);
      setData(dataList.productData);
      setIsLoading(true);
    } catch (error) {
      console.log("error in handling the filter", error);
    }
  };

  const addToCart = async (data: IcartProduct) => {
    const { _id } = data;
    setButtonDisabled1(true);
    setIsId1(_id);
    try {
      dispatch(AddToCartAction({ ...data }));
      const resp = await addToCartService({ user_id, _id });
      console.log(resp);
      if (resp.status === 200) {
        alert("Product successfully added to Cart");
      }
    } catch (error) {
      console.log(error);
    }
    setButtonDisabled1(false);
  };

  const addToFav = async (data: IcartProduct) => {
    const { _id } = data;
    setButtonDisabled2(true);
    setIsId2(_id);
    try {
      const resp: any = await addToWishlist({ user_id, _id });
      if (resp.status === 200) {
        alert("Product successfully added to Wishlist");
      }
      if (resp.status === 400) {
        alert("Product already added to your wishlist");
      }
    } catch (error) {
      console.log(error);
    }
    setButtonDisabled2(false);
  };

  const CartCount = (count: number, cartId: string) => {
    data.map((item: any) => {
      if (item._id == cartId) {
      }
    });
    console.log("count==>", count);
    setCount(count + 1);
  };

  useEffect(() => {
    fetchData();
    loadCategory();
  }, []);

  return (
    <div className="d-flex product">
      <div className="bx-1">
        <p>Filter by Category:</p>
        <div className="clearfilter">
          <Link to="#" onClick={fetchData}>
            Show All
          </Link>
        </div>

        {category && category.length
          ? category.map((item: any, index) => (
              <div className="inner">
                <Link to="#" onClick={() => handleFilter(item._id)}>
                  {item.category_name}
                </Link>
              </div>
            ))
          : null}
      </div>
      <div className="bx-2">
        
        {data && data.length
          ? data.map((item: IallProduct, index) => (
              <Card key={index} className="productCard">
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt="Product"
                  className="productImg"
                />
                <Card.Body>
                  <Card.Title>{item.productname}</Card.Title>
                  <Card.Title>{item.description}</Card.Title>
                  <Card.Text>Price: ${item.price}</Card.Text>
                  <Button
                    variant="success"
                    onClick={() => addToCart(item)}
                    disabled={isId1 === item._id && isButtonDisabled1}
                  >
                    Add To Cart
                  </Button>
                  <BsPlus
                    size={20}
                    className="mr-2"
                    onClick={() => CartCount(count, item._id)}
                  />
                  {item._id ? <span className="mr-2">{count}</span> : <span className="mr-2">0</span>}
                  <BsDash
                    size={20}
                    onClick={() => CartCount(count, item._id)}
                  />
                  &nbsp;&nbsp;
                  <Button
                    variant="primary"
                    onClick={() => addToFav(item)}
                    disabled={isId2 === item._id && isButtonDisabled2}
                  >
                    Wishlist
                  </Button>
                </Card.Body>
              </Card>
            ))
          : null}
      </div>
    </div>
  );
};

export default UserDashboard;
