import React from "react";
import { Link } from "react-router-dom";

const MechanicList = (props) => {
  const { mech } = props;
  return (
    <div>
      <Link to={`/profile/${mech._id}`}>
        <h4>{mech.name}</h4>
        <h4>
          {mech.streetName} {mech.streetNumber} <hr />
        </h4>
      </Link>
    </div>
  );
};

export default MechanicList;
