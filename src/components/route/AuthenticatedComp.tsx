import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function AuthenticatedComp({ component: C, ...rest }) {

  useEffect(() => {
    checkAccess()
  }, [])

  const history = useHistory();

  const checkAccess = async () => {
    try {
      const res = await Axios.get(`/api/public/checkAccess`);
      const msg = res.data;
      console.log(msg)
    } catch (err) {
      history.push("/login")
    }
  }

  return (
    <>
      <C />
    </>
  );
}