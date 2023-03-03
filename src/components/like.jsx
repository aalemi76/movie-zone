import React from "react";

const Like = ({ status, onTap }) => {
  let className = "fa fa-heart";
  if (!status) className += "-o";
  return (
    <i
      onClick={onTap}
      style={{ cursor: "pointer" }}
      className={className}
      aria-hidden="true"
    />
  );
};

export default Like;
