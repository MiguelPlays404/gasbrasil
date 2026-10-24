import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerReview } from '../types';
import { CUSTOMER_REVIEWS, STORE_INFO } from '../data/gasData';
import { subscribeSiteReviews, submitSiteReview, NewReviewInput } from '../firebase/reviews';

interface ReviewsContextType {
  siteReviews: CustomerReview[];
  allReviews: CustomerReview[];
  totalReviewsCount: number;
  averageRating: number;
  averageRatingFormatted: string;
  submitReview: (input: NewReviewInput) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

const BASELINE_GOOGLE_REVIEWS_COUNT = STORE_INFO.totalReviews; // 76
const BASELINE_GOOGLE_RATING = STORE_INFO.rating; // 4.8

export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteReviews, setSiteReviews] = useState<CustomerReview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Listen to real-time reviews from Firestore
    const unsubscribe = subscribeSiteReviews(
      (incomingReviews) => {
        setSiteReviews(incomingReviews);
        setIsLoading(false);
      },
      (err) => {
        console.error('Error fetching real-time reviews:', err);
        setError(err.message);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Compute dynamic combined count and average rating
  const totalReviewsCount = BASELINE_GOOGLE_REVIEWS_COUNT + siteReviews.length;
  
  const siteReviewsScoreSum = siteReviews.reduce((sum, rev) => sum + (rev.rating || 5), 0);
  const totalScorePoints = (BASELINE_GOOGLE_REVIEWS_COUNT * BASELINE_GOOGLE_RATING) + siteReviewsScoreSum;
  const averageRating = totalReviewsCount > 0 ? totalScorePoints / totalReviewsCount : BASELINE_GOOGLE_RATING;
  const averageRatingFormatted = averageRating.toFixed(1);

  // Combine site-submitted reviews first (newest on top), followed by baseline verified reviews
  const allReviews: CustomerReview[] = [
    ...siteReviews,
    ...CUSTOMER_REVIEWS,
  ];

  const submitReview = async (input: NewReviewInput): Promise<string> => {
    return await submitSiteReview(input);
  };

  return (
    <ReviewsContext.Provider
      value={{
        siteReviews,
        allReviews,
        totalReviewsCount,
        averageRating,
        averageRatingFormatted,
        submitReview,
        isLoading,
        error,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = (): ReviewsContextType => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};
