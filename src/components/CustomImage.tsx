import React, { DragEventHandler, useState } from 'react';

interface LinkProps{
    imageSource: string;
    imageAlt: string;
    imageClassName: string;
}

const CustomImage = ({ imageSource, imageAlt, imageClassName }: LinkProps) => {
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  if (hasError || loading || imageSource == "") {
    return <img
      src={"../src/assets/SiteLogoGrey.svg"}
      alt={imageAlt}
      className={imageClassName}
      onError={handleError}
      onLoad={handleLoad}
    />
  }

  return (
    <img
      src={imageSource}
      alt={imageAlt}
      className={imageClassName}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
};

export default CustomImage;