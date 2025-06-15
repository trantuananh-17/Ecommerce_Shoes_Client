import { useEffect, useState } from "react";
import type { Image } from "../../../types/product.type";

interface Props {
  images: Image[];
  thumbnail: string;
}
const ImagesOverView: React.FC<Props> = ({ images, thumbnail }) => {
  const [selectedImage, setSelectedImage] = useState<string>(thumbnail);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0].url);
    }
  }, [images]);

  return (
    <div className="col-span-2 flex gap-3 ">
      <ul className="flex flex-col gap-4">
        {images.map((img: Image) => (
          <li
            key={img._id}
            onClick={() => setSelectedImage(img.url)}
            // className="group w-[82px] cursor-pointer p-[10px] rounded-md border border-black hover:border-black transition-all"
            className={`group w-[82px] cursor-pointer p-[10px] rounded-md transition-all
    ${
      selectedImage === img.url
        ? "border-2 border-gray-500"
        : "border border-transparent hover:border-gray-400"
    }`}
          >
            <img
              className="image rounded-md transition-transform duration-300 group-hover:scale-115 "
              src={img.url}
              alt="Ảnh nhỏ"
            />
          </li>
        ))}
      </ul>
      <div className="group  rounded-xl overflow-hidden max-h-[900px]">
        <img
          src={selectedImage}
          className="image max-h-[700px] h-full transition-transform duration-300 group-hover:scale-110"
          alt=""
        />
      </div>
    </div>
  );
};

export default ImagesOverView;
