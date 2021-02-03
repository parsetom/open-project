import React from "react";
import PropTypes from "prop-types";

const Badge = ({name, onRemove}) => {
  return (
    <div className="badge badge-light">
      {name} <a href="#" onClick={onRemove}>x</a>
    </div>
  );
};

Badge.propTypes = {
  name: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Badge;
