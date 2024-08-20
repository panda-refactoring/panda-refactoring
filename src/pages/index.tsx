import type { NextPage } from "next";

import Button from "../components/common/ui/button";
import RecentStyle from "../components/main/recent-style";
import Lookbook from "../components/main/lookbook";
import Header from "../components/common/header";
import Navigation from "../components/common/navigation";
import FloatingButton from "../components/common/ui/floating-button";
import ImageSlide from "../components/market/detail/image-slide";
import Recommend from "../components/main/recommend";

import Modal from "src/components/common/ui/modal";

import useAuth from "../hooks/useAuth";
import { bannerImages } from "../common/consts/banner";

const Home: NextPage = () => {
  const { userData } = useAuth();

  return (
    <>
      <Header />
      <Modal />
      <ImageSlide images={bannerImages} imgH="h-72" propH={288} slideTime={5500} />
      <div className="space-y-10 py-10">
        <Recommend userData={userData} />
        <RecentStyle />
        <Lookbook />
        <div className="flex h-52 w-full flex-col items-center justify-center bg-gradient py-10 text-white">
          <p className="text-base">매일 수익이 발생하는 옷장공유</p>
          <p className="mb-5 mt-1 text-2xl">지금 시작해보세요!</p>
          <Button type="button" text="바로가기" fontColor="text-white" classes="bg-black" divWidth="w-32" />
        </div>
      </div>
      <Navigation />
      <FloatingButton path="/create/market" />
    </>
  );
};

export default Home;
