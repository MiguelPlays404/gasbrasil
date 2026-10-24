import { 
  collection, 
  doc, 
  setDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db, auth } from './config';
import { CustomerReview } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface NewReviewInput {
  name: string;
  neighborhood: string;
  rating: number;
  comment: string;
}

/**
 * Creates and submits a new customer review to Firestore.
 */
export async function submitSiteReview(input: NewReviewInput): Promise<string> {
  // Defensive validation matching firebase-blueprint.json constraints
  const trimmedName = input.name.trim().slice(0, 60);
  const trimmedNeighborhood = input.neighborhood.trim().slice(0, 60);
  const trimmedComment = input.comment.trim().slice(0, 500);
  const rating = Math.min(5, Math.max(1, Math.round(input.rating)));

  if (trimmedName.length < 2) {
    throw new Error('O nome deve conter pelo menos 2 caracteres.');
  }
  if (trimmedNeighborhood.length < 2) {
    throw new Error('Informe o bairro em Bauru.');
  }
  if (trimmedComment.length < 3) {
    throw new Error('Por favor, escreva uma breve mensagem ou elogio.');
  }

  // Generate safe random review ID conforming to '^[a-zA-Z0-9_\-]+$'
  const reviewId = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const docRef = doc(db, 'reviews', reviewId);
  const nowIso = new Date().toISOString();

  const payload = {
    name: trimmedName,
    neighborhood: trimmedNeighborhood,
    rating,
    comment: trimmedComment,
    createdAt: nowIso,
    verified: true,
  };

  try {
    await setDoc(docRef, payload);
    return reviewId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `reviews/${reviewId}`);
  }
}

/**
 * Listens in real-time to reviews submitted on the site via Firestore.
 */
export function subscribeSiteReviews(
  onReviews: (reviews: CustomerReview[]) => void,
  onError?: (err: Error) => void
): () => void {
  const reviewsCol = collection(db, 'reviews');
  const reviewsQuery = query(reviewsCol, orderBy('createdAt', 'desc'), limit(50));

  const unsubscribe = onSnapshot(
    reviewsQuery,
    (snapshot) => {
      const items: CustomerReview[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        let formattedDate = 'Recentemente';
        if (data.createdAt) {
          try {
            const dateObj = typeof data.createdAt === 'string' ? new Date(data.createdAt) : data.createdAt.toDate();
            formattedDate = dateObj.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
            });
          } catch {
            formattedDate = 'Hoje';
          }
        }

        return {
          id: docSnap.id,
          name: data.name || 'Cliente Gás Brasil',
          neighborhood: data.neighborhood || 'Bauru - SP',
          rating: Number(data.rating) || 5,
          comment: data.comment || '',
          date: formattedDate,
          verified: data.verified ?? true,
          isOnlineSubmission: true,
        };
      });

      onReviews(items);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, 'reviews');
    }
  );

  return unsubscribe;
}
