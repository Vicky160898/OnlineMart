import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { History } from "../Redux/order/action";

export default function OrderHistory() {
  const { history } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(History(user));
  }, []);
  const handleDelete = () => {
    
  }
  console.log(history);
  return (
    <div>
      {history &&
        history?.map((el) => (
          <div key={el._id}>
            {el.cartitems?.map((ele) => (
              <div key={ele._id}>
                <h1>{ele.name}</h1>
                <button onClick={()=>handleDelete(ele._id)}>Delete</button>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
