/* eslint disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const signup = async (
  name,
  firstname,
  email,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        name,
        firstname,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status == "success") {
      showAlert("success", "Inscription réussie");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
