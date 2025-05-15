import { instance } from "./api.config";

export const ReviewService = {
  fetchReviews(token: string) {
    return instance
      .get("/user/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);
  },

  writeReview(
    review: { menuItemId: string; rating: number; text: string },
    token: string
  ) {
    return instance
      .post("/reviews/create", review, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },
};
