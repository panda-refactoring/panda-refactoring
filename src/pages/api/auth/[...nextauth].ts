import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import client from "../../../common/lib/client";
import createHashedPassword from "../../../common/util/hash";
import { loginInfos } from "../../../mocks/data/users";

interface Credentials {
  email: string;
  password: string;
  nickname: string;
}

export default NextAuth({
  session: {
    strategy: "jwt", // 기본설정도 true지만 명시적으로 설정함. (로그인 성공시 쿠키에 jwt토큰 생성 확인)
    maxAge: 3 * 60 * 60, // 3 hours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      async authorize(credentials: Credentials) {
        const { email, password, nickname } = credentials;
        const CheckUser = loginInfos.filter(info => info.email === email && info.password === password);
        if (CheckUser.length === 0) {
          throw new Error("유저 정보를 찾을 수 없습니다.");
        } else {
          return { email, nickname };
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const email = user.email;
      const myString: string = email?.toString() || "";
      if (account?.type === "credentials") return true;
      if (account?.provider === "google") {
        const existGoogle = await client.user.findMany({
          where: {
            email: myString,
          },
        });
        if (existGoogle.length === 0) {
          await client.user.create({
            data: {
              email: myString,
              password: createHashedPassword(user.id),
            },
          });
        }
      } else {
        const existKakao = await client.user.findMany({
          where: {
            email: myString,
          },
        });
        if (existKakao.length === 0) {
          await client.user.create({
            data: {
              email: myString,
              password: createHashedPassword(user.id),
            },
          });
        }
      }
      return true;
    },
  },
});
