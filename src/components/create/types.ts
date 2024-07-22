import { UseFormRegister } from "react-hook-form";
import { CreateState } from "src/common/types/create.types";
import { ProductDataMin } from "src/common/types/data.types";

export interface UploadImagesProps {
  register: UseFormRegister<CreateState>;
  imgsrc: {
    name: string;
    dataUrl: string;
    file: File;
  }[];
  deleteImage: (selectedImage: string) => void;
  encodeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ProductTagTabProps {
  product: ProductDataMin[];
  tagItems: ProductDataMin[];
  closeTab: () => void;
  onSetItems: (list: ProductDataMin[]) => void;
}

export interface TagItemProps {
  tagItem: ProductDataMin;
  removeItem: (id: number) => void;
}
