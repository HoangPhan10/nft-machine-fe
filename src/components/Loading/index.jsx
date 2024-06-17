import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.scss";
function CustomLoading(props) {
  return (
    <>
    {props?.show ? <div className="nft-loading">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>: <></>}
    </>
  );
}

export default CustomLoading;