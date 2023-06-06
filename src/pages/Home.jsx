import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/layouts/Breadcrumb";
import Navbar from "../components/layouts/Navbar";
import CountRow from "../components/layouts/CountRow";
import ContentRow from "../components/layouts/ContentRow";
import Verifikasi from "../components/layouts/Verifikasi";


const Home = () => {
  return (
    <div className="bg-light">
      <Verifikasi />
      <Navbar />
      <CountRow/>
      <ContentRow/>
    </div>
  );
};

export default Home;
