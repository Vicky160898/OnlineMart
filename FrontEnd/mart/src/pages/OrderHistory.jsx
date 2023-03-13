import { Button, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOrder, History } from "../Redux/order/action";
import "./home.css";
export default function OrderHistory() {
  const { history } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    dispatch(History(user));
  }, [dispatch, user]);
  const handleDelete = (id) => {
    dispatch(DeleteOrder(id,toast));
  };
  return (
    <div>
      {history &&
        history?.map((el) => (
          <div key={el._id} className="product03">
            {el.cartitems?.map((ele) => (
              <div key={ele._id} className="product01">
                <img src={ele.image} alt={ele.name} />
                <h1> Product Name:- {ele.name}</h1>
                <h1> Price:- {ele.price}</h1>
                <h1> Quantity:- {ele.quantity}</h1>
              </div>
            ))}
            <Button w="90%" margin={"auto"}>
              Date :- {el.updatedAt}
            </Button>
            <Button w="90%" margin={"auto"}>
              Payment_ID :- {el.razorpay_payment_id}
            </Button>
            <Button w="90%" margin={"auto"}>
              Order_ID :- {el.razorpay_order_id}
            </Button>
            <Button w="90%" margin={"auto"}>
              Total :- ${el.amount / 100}
            </Button>
            <Button
              onClick={() => handleDelete(el._id)}
              w="15%"
              margin={"10px auto"}
              bg="#f0c040"
              color={"white"}
            >
              Delete
            </Button>
          </div>
        ))}
    </div>
  );
}
