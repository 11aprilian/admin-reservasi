import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/layouts/Breadcrumb";
import Verifikasi from "../components/layouts/Verifikasi";
import JadwalTable from "../components/layouts/JadwalTable";

const JadwalUpdate = () => {

  return (
    <div>
      <Navbar />
      <Verifikasi />
      <JadwalTable/>
    </div>
  );
};

export default JadwalUpdate;
