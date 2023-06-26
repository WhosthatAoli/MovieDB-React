import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { prevPage, nextPage } from "../Reducers/movieDBSlice";
import { useSelector, useDispatch } from "react-redux";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  margin: 1rem auto;
`;

export default function Pagination() {
  const page = useSelector((state) => state.DBReducer.page);
  const totalPages = useSelector((state) => state.DBReducer.totalPages);
  const dispatch = useDispatch();

  return (
    <PaginationContainer>
      <Button onClick={() => dispatch(prevPage())}>Prev</Button>
      <p>
        {page} / {totalPages}
      </p>
      <Button onClick={() => dispatch(nextPage())}>Next</Button>
    </PaginationContainer>
  );
}
