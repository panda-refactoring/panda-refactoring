import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../public/asset/image/full-logo.svg";
import graphic5 from "../../public/asset/image/graphic5.svg";
import GithubLink from "./github-link";
import MainSearchForm from "./search-form";

const MainLayout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const goHome = () => router.push("/");

  return (
    <div className="relative h-screen w-full overflow-hidden bg-common-black">
      <Image src={graphic5} alt="" className="absolute -left-52 top-[80%] w-1/2 -translate-y-1/2 opacity-30" />
      <div className="absolute left-1/2 top-0 z-10 mx-auto flex h-screen w-[900px] -translate-x-1/2 justify-between max-xl:w-auto">
        <div className="flex flex-col justify-between py-10 max-xl:hidden">
          <div>
            <Image src={logo} alt="logo" className="w-24 cursor-pointer" onClick={goHome} />
          </div>
          <div>
            <div className="-mt-20 space-y-4 text-white">
              <p className="text-3xl">
                <span className="font-bold">세컨핸드</span> 렌탈 플랫폼
              </p>
              <p className="text-6xl font-bold">
                <span className="text-[#D1F090]">판다</span> panda
              </p>
              <p className="text-textColor-gray-50">Second Hand Rental Platform Panda</p>
            </div>
            <MainSearchForm />
          </div>
          <GithubLink />
        </div>
        <div className="relative w-[390px] flex-shrink-0 overflow-hidden overflow-y-scroll bg-white scrollbar-hide max-xl:mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
