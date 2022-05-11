import React from "react";

import MechanicList from "./MechanicList";

const Profile = (props) => {
  //   const [mechList, setMechList] = React.useState([]);
  console.log("string:", props);

  //   React.useEffect(() => {
  //     getAllMech()
  //       .then((response) => {
  //         const mechanics = response;
  //         setMechList(mechanics);
  //         console.log(mechanics);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  const listOfAllMech = props.mechList.map((mech) => {
    return <MechanicList key={mech._id} mech={mech} />;
  });

  return (
    <div>
      {props.loggedInUser.role === "driver" ? (
        <>
          <h4>Hello {props.loggedInUser.name}</h4>
          <h4>Hello {props.loggedInUser.role}</h4>
          <h3>List of all Mechnic:</h3>
          <div>{listOfAllMech}</div>
        </>
      ) : null}
      {props.loggedInUser.role === "mechanic" ? (
        <>
          <h4>Hello {props.loggedInUser.name}</h4>
          <h4>Hello {props.loggedInUser.role}</h4>
          <p>
            Address: {props.loggedInUser.streetName}{" "}
            {props.loggedInUser.streetNumber}, {props.loggedInUser.postCode}{" "}
            {props.loggedInUser.city}
          </p>
        </>
      ) : null}
    </div>
  );
};

export default Profile;
