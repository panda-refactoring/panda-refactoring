import { ReactNode } from "react";
import Image from "next/image";
import emptybox from "public/asset/image/emptybox.svg";

const EmptyPost = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-[420px] items-center justify-center text-center">
      <div>
        <div className="mx-auto mb-2 h-20 w-20">
          <Image src={emptybox} alt="" width={80} height={80} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default EmptyPost;
