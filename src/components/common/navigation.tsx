import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

import useModal from "../../hooks/useModal";

const Navigation: NextPage = () => {
  const router = useRouter();
  const { pathname } = router;
  const { data: session } = useSession();
  const { setLoginModal } = useModal();

  const goLoginPage = () => router.push("/login");

  const modalHandler = () => {
    if (!session) setLoginModal({ submitFn: goLoginPage });
  };

  return (
    <div className="fixed bottom-0 z-20 flex h-12 w-[390px] items-center justify-between bg-black p-5 text-lg shadow dark:border-gray-600 dark:bg-gray-800">
      <div>
        <Link href="/market">
          <button className={`${pathname === "/market" ? "text-primary-violet" : "text-white"}`}>MARKET</button>
        </Link>
      </div>
      <div>
        <Link href="/lookbook">
          <button className={`${pathname === "/lookbook" ? "text-primary-violet" : "text-white"}`}>STYLE</button>
        </Link>
      </div>
      <div>
        {session ? (
          <Link href="/mypage">
            <button
              className={`${
                pathname === "/mypage" || pathname === "/mypage/profile" ? "text-primary-violet" : "text-white"
              }`}
            >
              MYPAGE
            </button>
          </Link>
        ) : (
          <button
            className={`${
              pathname === "/mypage" || pathname === "/mypage/profile" ? "text-primary-violet" : "text-white"
            }`}
            onClick={modalHandler}
          >
            MYPAGE
          </button>
        )}
      </div>
      <div>
        <Link href={session?.user ? "/dm" : "/login"}>
          <button className={`${pathname === "/login" || pathname === "dm" ? "text-primary-violet" : "text-white"}`}>
            {session?.user ? "DM" : "LOGIN"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
