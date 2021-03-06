
import React, { memo } from 'react';
import Link from './Link';
import Icon from './Icon';

export default memo((props) => {
  const mapImageSizes = () => {
    // Single image
    if (props.image) {
      return props.image;

      // Multiple images
    } if (props.images) {
      let { images } = props;

      // An array of image objects (eg Artists), so just pick the first one
      if (Array.isArray(images) && images.length > 0) {
        images = images[0];
      }

      // Default to medium-sized image, but accept size property as override
      let size = 'medium';
      if (props.size) {
        size = props.size;
      }

      // Return the requested size
      if (images[size]) {
        return images[size];
      }
    }

    // No images
    return null;
  };

  const image = mapImageSizes();
  let class_name = 'thumbnail thumbnail--loaded';

  if (props.size) {
    class_name += ` thumbnail--${props.size}`;
  }
  if (props.circle) {
    class_name += ' thumbnail--circle';
  }
  if (props.className) {
    class_name += ` ${props.className}`;
  }

  let zoom_icon = null;
  if (props.canZoom && image) {
    zoom_icon = <Link className="thumbnail__zoom" to={`/image-zoom?url=${image}`}><Icon name="search" /></Link>;
  }

  return (
    <div className={class_name}>
      {props.useImageTag ? (
        <img alt="Artwork thumbnail" className="thumbnail__image thumbnail__image--use-image-tag" src={`${image || '/iris/assets/no-image.svg'}`} />
      ) : (
        <div className="thumbnail__image" style={{ backgroundImage: `url("${image || '/iris/assets/no-image.svg'}")` }} />
      )}
      {props.glow && image && <div className="thumbnail__image thumbnail__image--glow" style={{ backgroundImage: `url("${image}")` }} />}
      {zoom_icon}
    </div>
  );
});
