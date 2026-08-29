declare module 'next/image' {
  import React from 'react';

  export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
  }

  const Image: React.FC<ImageProps>;
  export default Image;
}
