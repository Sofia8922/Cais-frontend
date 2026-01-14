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

  // const handleError = () => {
  //   setHasError(true);
  //   setLoading(false);
  // };

  // const handleLoad = () => {
  //   setLoading(false);
  // };

  // let imageStyle = {};

  // if(greyedOut) {
  //   imageStyle = {
  //     filter: 'alpha(opacity=40)',
  //     opacity: '0.1'
  //   }
  // }
  
  // if (hasError || loading || imageSource == "") {
  //   imageSource = "../src/assets/SiteLogoGrey.svg";
  // }

  return (
    <img
    src={hasError || loading || !imageSource ? fallBackImage : imageSource}
    alt={imageAlt}
    className={`${imageClassName} ${greyedOut ? "image-disabled" : ""}`}
    onError={() => setHasError(true)}
    onLoad={() => setLoading(false)}
    style={{maxWidth: "100%", maxHeight: "350px"}}
    />
  );
};

export default CustomImage;