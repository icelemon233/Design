import mascotSrc from '../../assets/cinna-avatar.webp';
import apiIconSrc from '../../assets/cinna-doc-icon-api.webp';
import sampleIconSrc from '../../assets/cinna-doc-icon-sample.webp';
import usageIconSrc from '../../assets/cinna-doc-icon-usage.webp';
import portraitSrc from '../../assets/cinna-portrait.webp';

export const Mascot = ({
  className,
  size,
  alt = '',
  variant = 'avatar',
}: {
  className?: string;
  size?: number;
  alt?: string;
  variant?: 'avatar' | 'portrait';
}) => (
  <img
    alt={alt}
    className={['cinna-mascot', className ?? ''].filter(Boolean).join(' ')}
    src={variant === 'portrait' ? portraitSrc : mascotSrc}
    style={size ? { width: size, height: size } : undefined}
  />
);

export const DocIcon = ({ kind }: { kind: 'sample' | 'usage' | 'api' }) => {
  const assetByKind = {
    sample: sampleIconSrc,
    usage: usageIconSrc,
    api: apiIconSrc,
  };

  return (
    <img
      alt=""
      aria-hidden="true"
      className={`cinna-doc-frame__icon cinna-doc-frame__icon--${kind}`}
      src={assetByKind[kind]}
    />
  );
};
