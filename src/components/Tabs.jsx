import React from "react";
import styled from "styled-components";
import { TABS } from "../constants";
import Tab from "./Tab";
import { useSelector, useDispatch } from "react-redux";
import { onClickTab } from "../Reducers/movieDBSlice";
import { useNavigate } from "react-router-dom";

const TabsContainer = styled.ul`
  display: flex;
`;

export default function Tabs(props) {
  const activeTab = useSelector((state) => state.DBReducer.activeTab);
  const isloggedIn = useSelector((state) => state.DBReducer.isloggedIn);
  //console.log(activeTab);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <TabsContainer>
      {TABS.map((tab) => {
        return (
          <Tab
            key={tab.key}
            active={activeTab === tab}
            onClick={() => {
              dispatch(onClickTab(tab));
              navigate("/");
            }}
          >
            {tab.title}
          </Tab>
        );
      })}

      {isloggedIn && (
        <Tab
          className="rated"
          active={activeTab === "RATED"}
          onClick={() => {
            dispatch(onClickTab("RATED"));
          }}
        >
          Rated
        </Tab>
      )}
    </TabsContainer>
  );
}
