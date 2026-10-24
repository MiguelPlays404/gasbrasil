import { ref, getDownloadURL } from 'firebase/storage';
import { useState, useEffect } from 'react';
import { storage, firebaseConfig } from './config';

// In-memory cache for resolved Firebase Storage download URLs
const urlCache = new Map<string, string>();

/**
 * Known Firebase Storage file paths for all website assets
 */
export const FIREBASE_STORAGE_PATHS = {
  // Hero Carousel slides (6 images)
  carousel: [
    'images/carousel/hero_frota_liquigas.jpg',
    'images/carousel/hero_familia_cozinha.jpg',
    'images/carousel/banner_parcelamento_3x.jpg',
    'images/carousel/hero_entregador_sorriso.jpg',
    'images/carousel/hero_cozinha_restaurante.jpg',
    'images/carousel/hero_deposito_caminhoes.jpg',
  ],
  // Gas Cylinder Products
  products: {
    p13: 'images/products/botijao_p13_gas.jpg',
    p45: 'images/products/cilindro_p45_gas.jpg',
    p5: 'images/products/botijao_p5_gas.jpg',
  },
  // Banners & Promotional Graphics
  banners: {
    gasDoPovo: 'images/banners/gas_do_povo_oficial.png',
    parcelamento3x: 'images/banners/banner_parcelamento_3x.jpg',
  },
  // Brand identity
  brand: {
    logo: 'images/brand/logo_gas_brasil.png',
  },
} as const;

/**
 * Generates the direct public Google Cloud / Firebase Storage media URL format
 */
export function getDirectStorageUrl(storagePath: string): string {
  const bucket = firebaseConfig.storageBucket;
  const encodedPath = encodeURIComponent(storagePath);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedPath}?alt=media`;
}

/**
 * Resolves a public download URL from Firebase Storage using getDownloadURL()
 * Falls back to fallbackUrl if not found or network fails.
 */
export async function getStorageImageUrl(
  storagePath: string,
  fallbackUrl: string
): Promise<string> {
  if (urlCache.has(storagePath)) {
    return urlCache.get(storagePath)!;
  }

  try {
    const storageRef = ref(storage, storagePath);
    const downloadUrl = await getDownloadURL(storageRef);
    urlCache.set(storagePath, downloadUrl);
    return downloadUrl;
  } catch {
    // If not yet uploaded or offline, cache the fallback to avoid repeated failures
    urlCache.set(storagePath, fallbackUrl);
    return fallbackUrl;
  }
}

/**
 * Custom React hook to seamlessly load an image from Firebase Storage via getDownloadURL
 * with fallback to local bundled asset.
 */
export function useStorageImage(
  storagePath: string | undefined,
  fallbackSrc: string
): { src: string; isCloud: boolean; loading: boolean } {
  const [src, setSrc] = useState<string>(() => {
    if (storagePath && urlCache.has(storagePath)) {
      return urlCache.get(storagePath)!;
    }
    return fallbackSrc;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isCloud, setIsCloud] = useState<boolean>(false);

  useEffect(() => {
    if (!storagePath) {
      setSrc(fallbackSrc);
      setLoading(false);
      return;
    }

    if (urlCache.has(storagePath)) {
      const cached = urlCache.get(storagePath)!;
      setSrc(cached);
      setIsCloud(cached !== fallbackSrc);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const storageRef = ref(storage, storagePath);

    getDownloadURL(storageRef)
      .then((downloadUrl) => {
        if (isMounted) {
          urlCache.set(storagePath, downloadUrl);
          setSrc(downloadUrl);
          setIsCloud(true);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          // If the object does not exist yet in Firebase Storage, fallback gracefully
          urlCache.set(storagePath, fallbackSrc);
          setSrc(fallbackSrc);
          setIsCloud(false);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [storagePath, fallbackSrc]);

  return { src, isCloud, loading };
}
