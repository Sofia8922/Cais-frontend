import React, { DragEventHandler, useState } from 'react';

interface ImageProps{
    imageSource: string;
    imageAlt: string;
    imageClassName: string;
    greyedOut: boolean;
}

const CustomImage = ({ imageSource, imageAlt, imageClassName, greyedOut }: ImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fallBackImage = "../src/assets/SiteLogoGrey.svg";

  const handleError = () => {
    setHasError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  let imageStyle = {filter: "", opacity: "", maxWidth: "100%", maxHeight: "350px"};

  if(greyedOut) {
    imageStyle = {
      filter: 'brightness(40%)',
      opacity: '0.2',
      maxWidth: "100%",
      maxHeight: "350px",
    }
  }
  
  if (hasError || loading || imageSource == "") {
    imageSource = "../src/assets/SiteLogoGrey.svg";
  }

  return (
    <img
    src={hasError || loading || !imageSource ? fallBackImage : imageSource}
    alt={imageAlt}
    className={`${imageClassName} ${greyedOut ? "image-disabled" : ""}`}
    onError={() => setHasError(true)}
    onLoad={() => setLoading(false)}
    style={imageStyle}
    />
  );
};

export default CustomImage;