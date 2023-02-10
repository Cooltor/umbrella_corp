/* eslint disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const create = async (type, title, description, price) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/benefits",
      data: {
        type,
        title,
        description,
        price,
      },
    });

    if (res.data.status == "success") {
      showAlert("success", "Prestations créee avec succès!");
      window.setTimeout(() => {
        location.assign("/les-prestations");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
