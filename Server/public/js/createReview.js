/* eslint disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const createReview = async (review, rating, benefit, user) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/v1/benefits/${benefit}/reviews`,
      data: {
        review,
        rating,
        benefit,
        user,
      },
    });
    if (res.data.status == "success") {
      showAlert("success", "Review created successfully!");
      window.setTimeout(() => {
        location.assign("/les-prestations/:slug");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
