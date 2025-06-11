import { instance } from "./api.config";

export const ReviewService = {
  fetchReviews() {
    return instance.get("/user/reviews").then((res) => res.data.data);
  },

  writeReview(review: { menuItemId: string; rating: number; text: string }) {
    return instance.post("/reviews/create", review).then((res) => res.data);
  },
};
