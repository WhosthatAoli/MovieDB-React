import React from "react";
import { CATEGORIES } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { handldCategroiesChange } from "../Reducers/movieDBSlice";

export default function CategorySelect() {
  const category = useSelector((state) => state.DBReducer.category);
  console.log(category);
  const dispatch = useDispatch();

  return (
    <select
      value={category}
      onChange={(e) => dispatch(handldCategroiesChange(e.target.value))}
    >
      {CATEGORIES.map((category) => {
        return (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        );
      })}
    </select>
  );
}
