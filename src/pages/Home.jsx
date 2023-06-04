import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/layouts/Breadcrumb";
import Navbar from "../components/layouts/Navbar";
import { MdArticle, MdDirections, MdCalendarMonth, MdOutlinePersonPin } from "react-icons/md";
import axios from "axios";
import CountRow from "../components/layouts/CountRow";
import ContentRow from "../components/layouts/ContentRow";

const Home = () => {
  return (
    <div>
      <Navbar />
      <CountRow/>
      <ContentRow/>
    </div>
  );
};

export default Home;
