import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOrder, History } from "../Redux/order/action";

export default function OrderHistory() {
  const { history } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(History(user));
  }, []);
  const handleDelete = (id) => {
    dispatch(DeleteOrder(id));
  };
  console.log(history);
  return (
    <div>
      {history &&
        history?.map((el) => (
          <div key={el._id}>
            <button onClick={() => handleDelete(el._id)}>Delete</button>
            {el.cartitems?.map((ele) => (
              <div key={ele._id}>
                <h1>{ele.name}</h1>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
