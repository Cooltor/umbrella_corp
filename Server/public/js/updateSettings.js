/* eslint disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const updateData = async (name, firstname, email) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:3000/api/v1/users/updateMe",
      data: { name, firstname, email },
    });

    if (res.data.status === "success") {
      showAlert("success", "Modification(s) enregistrée(s) avec succès!");
      window.setTimeout(() => {
        location.assign("/mon-compte");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
