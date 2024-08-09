import { useState } from "react";

interface credentialProps {
  region: string;
  accessKey: string;
  secretKey: string;
}

interface ImageInfo {
  name: string;
  dataUrl: string;
  file: File;
}

const useUpload = ({ region, accessKey, secretKey }: credentialProps) => {
  const [imgsrc, setImgsrc] = useState<ImageInfo[]>([]);

  const deleteImage = (selectedImage: string) => {
    setImgsrc(prev => prev.filter(item => item.dataUrl !== selectedImage));
  };

  const encodeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files;
    if (!imageFile || imageFile.length < 0) return;

    [...imageFile].forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result as string;
        const obj = {
          name: file.name,
          dataUrl: result,
          file,
        };

        setImgsrc(prev => [...prev, obj]);
      };
    });
  };

  return { deleteImage, encodeFile, imgsrc };
};

export default useUpload;
