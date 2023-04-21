/* eslint disable */
import axios from "axios";
import { showAlert } from "./alerts";

// modifier une prestation en fonction de son slug (id)

export const updateBenefit = async (id, type, title, description, price) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `/api/v1/benefits/${id}`,
      data: {
        id,
        type,
        title,
        description,
        price,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Prestation modifiée avec succès");
      window.setTimeout(() => {
        location.assign("/les-prestations");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const deleteBenefit = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/v1/benefits/${id}`,
    });
    console.log(res);
    if (res.data.status == "success") {
      showAlert("success", "Prestation supprimée avec succès");
      window.setTimeout(() => {
        location.assign("/les-prestations");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
