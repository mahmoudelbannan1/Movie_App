import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import AddMovei from "../Components/AddMovie/AddMovie";
const Home = React.lazy(() => import("../Pages/Home"));
const Details = React.lazy(() => import("../Pages/Details"));
const WishList = React.lazy(() => import("../Pages/WatchList"));
const Search = React.lazy(() => import("../Pages/Search"));
const Error = React.lazy(() => import("../Pages/Error"));

export default function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Details/:id" element={<Details />} />
        <Route path="/WatchList" element={<WishList />} />
        <Route path="/Search/:name" element={<Search />} />
        <Route path="/add-movie" element={<AddMovei />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
}
