import { NextPage } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Icon } from "@iconify/react";

import useModal from "../../../hooks/useModal";
import { useRouter } from "next/router";

const FloatingButton: NextPage<{ path: string }> = ({ path }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { setLoginModal } = useModal();

  const goLoginPage = () => router.push("/login");

  const modalHandler = () => {
    if (!session) setLoginModal({ submitFn: goLoginPage });
  };

  return (
    <Link href={!session ? "" : path} className="fixed bottom-24 z-30 translate-x-[310px]" onClick={modalHandler}>
      <button className="rounded-full border border-primary-violet bg-black p-3 shadow-lg hover:animate-spin">
        <Icon icon="ic:baseline-plus" aria-label="게시글 작성하기" className="text-3xl text-primary-violet" />
      </button>
    </Link>
  );
};

export default FloatingButton;
