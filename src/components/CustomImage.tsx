import React, { DragEventHandler, useState } from 'react';

interface LinkProps{
    imageSource: string;
    imageAlt: string;
    imageClassName: string;
    greyedOut: boolean;
}

const CustomImage = ({ imageSource, imageAlt, imageClassName, greyedOut }: LinkProps) => {
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  let imageStyle = {};

  if(greyedOut) {
    imageStyle = {
      filter: 'alpha(opacity=40)',
      opacity: '0.1'
    }
  }
  
  if (hasError || loading || imageSource == "") {
    imageSource = "../src/assets/SiteLogoGrey.svg";
  }

  return (
    <img
      src={imageSource}
      alt={imageAlt}
      className={imageClassName}
      onError={handleError}
      onLoad={handleLoad}
      style={imageStyle}
    />)
};

export default CustomImage;