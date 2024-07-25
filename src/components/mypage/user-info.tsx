import { UserData } from "src/common/types/data.types";

const UserInfo = ({ userData }: { userData: UserData }) => {
  return (
    <div className="my-10">
      <div className="mb-4 flex items-center justify-center">
        <p className="mx-1 text-xl font-semibold">{userData?.nickname}</p>
      </div>
      <div className="mb-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold">{userData?.followers?.length || 0}</div>
          <div>followers</div>
        </div>
        <div className="mx-3 text-center">
          <div className="text-xl font-semibold">{userData?.followings?.length || 0}</div>
          <div>following</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-semibold">{userData?.product?.length || 0}</div>
          <div>products</div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center px-8">
        {userData?.keywords?.map(({ id, tag }: { id: number; tag: string }) => {
          return (
            <div key={id} className="mx-1 my-1 rounded-xl border-[1px] border-solid border-black px-1 py-1 text-xs">
              {`#${tag}`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserInfo;
