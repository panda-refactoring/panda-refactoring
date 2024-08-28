import { NextPage } from "next";
import { ThreeDots } from "react-loader-spinner";

//주소 : https://mhnpd.github.io/react-loader-spinner/docs/category/components

const Loading: NextPage<{ width?: string }> = ({ width }) => {
  return (
    <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center justify-center">
        <div>
          <ThreeDots
            height="80"
            width={width ? Number(width) : 80}
            radius="9"
            color="#B095FF"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
