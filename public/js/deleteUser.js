import axios from "axios";
import { showAlert } from "./alerts";

export const deleteUser = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/v1/users/${id}`,
    });

    if (res.data.status === "success") {
      showAlert("success", "Utilisateur supprimé avec succès!");
      window.setTimeout(() => {
        location.assign("/mon-compte");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
