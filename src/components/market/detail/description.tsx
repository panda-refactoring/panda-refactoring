import { ProductData } from "src/common/types/data.types";

const Description = ({ product }: { product: ProductData }) => {
  return (
    <div className="border-b border-t py-[18px]">
      <p className="mb-8 whitespace-pre-wrap">{product.description}</p>
      {product.hashTag && (
        <ul className="flex space-x-3 text-primary-violet">
          {product.hashTag?.map((item: { id: number; tag: string }) => (
            <li key={item.id}>#{item.tag}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Description;
