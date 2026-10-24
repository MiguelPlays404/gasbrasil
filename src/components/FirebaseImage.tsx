import React from 'react';
import { useStorageImage } from '../firebase/storage';

interface FirebaseImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  storagePath?: string;
  fallbackSrc: string;
}

/**
 * Reusable image component that loads from Firebase Storage (getDownloadURL)
 * and seamlessly falls back to bundled asset if the file is loading, offline, or missing.
 */
export const FirebaseImage: React.FC<FirebaseImageProps> = ({
  storagePath,
  fallbackSrc,
  alt = '',
  className = '',
  ...rest
}) => {
  const { src } = useStorageImage(storagePath, fallbackSrc);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        // Ultimate fallback safety: if the remote URL fails, switch immediately to fallbackSrc
        const target = e.currentTarget;
        if (target.src !== fallbackSrc) {
          target.src = fallbackSrc;
        }
      }}
      {...rest}
    />
  );
};
