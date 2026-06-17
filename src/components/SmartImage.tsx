import { useState, type ReactNode } from "react";

interface SmartImageProps {
  src?: string;
  alt: string;
  className?: string;
  /** Exibido enquanto não há `src` ou se o arquivo não carregar. */
  fallback: ReactNode;
}

/** <img> que cai para um placeholder se a imagem não existir / falhar ao carregar. */
const SmartImage = ({ src, alt, className, fallback }: SmartImageProps) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <>{fallback}</>;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  );
};

export default SmartImage;
