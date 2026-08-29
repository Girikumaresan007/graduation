import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, fill, className, priority, sizes, ...props }) => {
  return (
    <img
      src={src}
      alt={alt || ''}
      className={`${fill ? 'absolute inset-0 w-full h-full object-cover' : ''} ${className || ''}`}
      {...props}
    />
  );
};

export default Image;
