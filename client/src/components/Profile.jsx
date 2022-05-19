import React from "react";

import MechanicList from "./MechanicList";
import ChatForm from "./ChatForm";

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
    <div className="profile w3-row-padding">
      {props.loggedInUser.role === "driver" ? (
        <>
          <div className="user-detail w3-third">
            <h4>
              {" "}
              <i class="fa fa-user"> {props.loggedInUser.name}</i>
            </h4>
            <h4>Hello {props.loggedInUser.role}</h4>
          </div>
          <div className="list-of-mech w3-twothird">
            <h3>List of all Mechnic:</h3> <hr />
            <ul class="w3-ul w3-border">
              <li>{listOfAllMech}</li>
            </ul>
          </div>
        </>
      ) : null}
      {props.loggedInUser.role === "mechanic" ? (
        <>
          <div className="user-detail w3-third">
            <h4>
              <i class="fa fa-user"> {props.loggedInUser.name}</i>
            </h4>
            <h4>
              <i class="fa fa-wrench"> {props.loggedInUser.role}</i>{" "}
            </h4>
            <p>
              <i class="fa fa-address-card">
                {" "}
                {props.loggedInUser.streetName}{" "}
                {props.loggedInUser.streetNumber}, {props.loggedInUser.postCode}{" "}
                {props.loggedInUser.city}{" "}
              </i>
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Profile;
