import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ name, disabled, onRemove }) => {
  return (
    <span className="badge badge-dark">
      {name}{' '}
      <button disabled={disabled} name={name} onClick={onRemove}>
        x
      </button>
    </span>
  );
};

Badge.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
};

export default Badge;
