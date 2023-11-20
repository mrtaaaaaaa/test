type ImageComponentType = {
  src: string;
  alt: string;
  className: string;
};
const ImageComponent = ({ src, alt, className }: ImageComponentType) => {
  return <img src={src} alt={alt} className={className} />;
};

export default ImageComponent;
