import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import { all, call, put, takeLatest } from "redux-saga/effects";
import API from "../api";
import {
  getAllPosts,
  getSinglePost,
  getTrendPosts,
  setAllPosts,
  setLoading,
  setSinglePost,
  setTrendPosts,
  getRelatedPosts,
  setRelatedPosts,
  getSearchedPosts,
  setSearchedPosts,
  getFavoritePosts,
  setFavoritePosts,
  addFavoritePosts,
} from "../reducers/postSlice";
import {
  addFavoritePostsPayload,
  GetAllPostsPayload,
} from "../reducers/@types";
import {
  AllPostsResponse,
  FavoritePostsResponse,
  SinglePostResponse,
} from "./@types";

function* getSinglePostWorker(action: PayloadAction<string>) {
  yield put(setLoading(true));
  const { ok, data, problem }: ApiResponse<SinglePostResponse> = yield call(
    API.getSinglePost,
    action.payload
  );
  if (ok && data) {
    yield put(setSinglePost(data.title));
  } else {
    console.warn("Error getting post", problem);
  }
  yield put(setLoading(false));
}
//TODO payload не понял с типами (надо обязательно 1 чтобы был без вопроса?(т.е не undefined в @types.ts)
function* getAllPostsWorker(action: PayloadAction<GetAllPostsPayload>) {
  const { perPage, page, release_date, released, country } = action.payload;
  if (page === 1) yield put(setLoading(true));
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getAllPosts,
    perPage,
    page,
    release_date,
    released,
    country
  );
  if (ok && data) {
    yield put(
      setAllPosts({
        allPosts: data.pagination.data,
        postsCount: data.pagination.total,
      })
    );
  } else {
    console.warn("Error getting post", problem);
  }
  if (page === 1) yield put(setLoading(false));
}

function* getTrendPostsWorker(action: PayloadAction<any>) {
  yield put(setLoading(true));
  const { ok, data, problem }: ApiResponse<any> = yield call(
    API.getTrendPosts,
    action.payload
  );
  if (ok && data) {
    yield put(setTrendPosts(data.pagination.data));
  } else {
    console.warn("Error getting post", problem);
  }
  yield put(setLoading(false));
}
function* getFavoritePostsWorker(action: PayloadAction<number>) {
  const { ok, data, problem }: ApiResponse<FavoritePostsResponse> = yield call(
    API.getFavoritePosts,
    action.payload
  );
  if (ok && data) {
    yield put(setFavoritePosts(data.items.data));
  } else {
    console.warn("Error getting post", problem);
  }
}
function* addFavoritePostsWorker(
  action: PayloadAction<addFavoritePostsPayload>
) {
  const { id, titleId } = action.payload;
  const { ok, data, problem }: ApiResponse<FavoritePostsResponse> = yield call(
    API.addFavoritePosts,
    id,
    titleId
  );
  if (ok && data) {
    yield put(setFavoritePosts(data.items.data));
  } else {
    console.warn("Error adding post", problem);
  }
}

function* getRelatedPostsWorker(action: PayloadAction<any>) {
  yield put(setLoading(true));
  const { ok, data, problem }: ApiResponse<any> = yield call(
    API.getRelatedPosts,
    action.payload
  );
  if (ok && data) {
    yield put(setRelatedPosts(data.titles));
  } else {
    console.warn("Error getting post", problem);
  }
  yield put(setLoading(false));
}

function* getSearchedPostsWorker(action: PayloadAction<any>) {
  yield put(setLoading(true));
  const { searchValue } = action.payload;
  const { ok, data, problem }: ApiResponse<any> = yield call(
    API.getSearchedPosts,
    action.payload,
    searchValue
  );
  if (ok && data) {
    yield put(setSearchedPosts(data.results));
  } else {
    console.warn("Error getting post", problem);
  }
  yield put(setLoading(false));
}

export default function* postsSaga() {
  yield all([
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getAllPosts, getAllPostsWorker),
    takeLatest(getTrendPosts, getTrendPostsWorker),
    takeLatest(getRelatedPosts, getRelatedPostsWorker),
    takeLatest(getSearchedPosts, getSearchedPostsWorker),
    takeLatest(getFavoritePosts, getFavoritePostsWorker),
    takeLatest(addFavoritePosts, addFavoritePostsWorker),
  ]);
}
