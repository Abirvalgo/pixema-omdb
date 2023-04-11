import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRelatedPosts,
  getTrendPosts,
  postSelectors,
} from "../../redux/reducers/postSlice";
import CardsList from "../../components/CardsList";
import Loader from "../../components/Loader";

const Trends = () => {
  const trendPosts = useSelector(postSelectors.getTrendPosts);
  const dispatch = useDispatch();
  const isLoading = useSelector(postSelectors.getIsLoading);

  useEffect(() => {
    dispatch(getTrendPosts({}));
  }, []);
  return <>{isLoading ? <Loader /> : <CardsList cardsList={trendPosts} />}</>;
};

export default Trends;
