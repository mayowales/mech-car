import React from "react";
import { getOneUser } from "../services/userApi";
import { useParams } from "react-router-dom";

function MechDetails() {
  const { id } = useParams();
  const [mechanicDetail, setMechanicDetail] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getOneUser(id)
      .then((response) => {
        setMechanicDetail(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="profile w3-row-padding">
      {loading ? (
        <h1>loading</h1>
      ) : (
        <>
          <h1>MechDetails</h1>
          <p>
            <i class="fa fa-wrench"> {mechanicDetail.name}</i>
          </p>
          <p>
            <i class="fa fa-address-card">
              {" "}
              {mechanicDetail.streetName}
              {mechanicDetail.streetNumber}, {mechanicDetail.postCode}
              {mechanicDetail.city}
            </i>
          </p>
        </>
      )}
    </div>
  );
}

export default MechDetails;
