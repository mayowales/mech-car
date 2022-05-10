import axios from "axios";

const signup = (
  role,
  name,
  email,
  password,
  streetName,
  streetNumber,
  postCode,
  city
) => {
  //   console.log(
  //     role,
  //     name,
  //     email,
  //     password,
  //     streetName,
  //     streetNumber,
  //     postCode,
  //     city
  //   );
  return axios
    .post("/api/auth/signup", {
      role,
      name,
      email,
      password,
      streetName,
      streetNumber,
      postCode,
      city,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const login = (email, password) => {
  return axios
    .post("/api/auth/login", { email, password })
    .then((response) => {
      return response; // changed respond.data to just response
    })
    .catch((error) => {
      return error.response.data;
    });
};

const logout = () => {
  return axios
    .delete("/api/auth/logout")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export { signup, login, logout };
