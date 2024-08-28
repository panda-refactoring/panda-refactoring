# 판다 프로젝트 리팩토링 버전

- [msw모킹](https://github.com/panda-refactoring/panda-refactoring/blob/main/src/mocks/handlers.ts)
- 폴더구조 재정의
- 코드 정리
  - 안쓰는 코드, 주석제거, import구문의 정리
- 관심사의 분리 & 컴포넌트 추상화 수준 높이기
  - [컴포넌트 분리하기 (도메인 / 공통)]()
  - [도메인 전용 로직을 커스텀 훅으로 분리하기]()
  - 공통 로직을 유틸함수로 분리하기
- 명확한 이름
  - [모호한 함수명, 변수명을 일관되고 이유있는 이름으로 바꾸기]()
  - 상수화
  - [조건부 렌더링의 조건을 변수화]()
- 코드 리팩토링
  - [중복코드 추출, 긴 함수 리팩토링]()
  - [플래그인수 제거]()
  - [불필요한 상태 동기화 제거]()
  - 조건문, 반복문 리팩토링
- 선언적인 코드
  - useQuery요청을 선언적으로 리팩토링
  - [선언적 로딩처리 (isLoading => suspense)]()
- [에러처리]()
- 테스트

---

## 관련 글

[[Refactoring] Chapter1. 폴더구조를 바꿔보자](https://velog.io/@rlorxl/Refactoring-Chapter1.-%ED%8F%B4%EB%8D%94%EA%B5%AC%EC%A1%B0%EB%A5%BC-%EB%B0%94%EA%BF%94%EB%B3%B4%EC%9E%90)
[[Refactoring] Chapter2 .msw로 가짜 데이터를 모킹해보자 (비동기 문제해결)](https://velog.io/@rlorxl/Refactoring-Chapter2-.msw%EB%A1%9C-%EA%B0%80%EC%A7%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%EB%AA%A8%ED%82%B9%ED%95%B4%EB%B3%B4%EC%9E%90-%EB%B9%84%EB%8F%99%EA%B8%B0-%EB%AC%B8%EC%A0%9C%ED%95%B4%EA%B2%B0)
[[Refactoring] Chapter3. 관심사분리 & useQuery hook을 사용해보자 (feat. SOLID 원칙)]()
[[Refactoring] Chapter4. 불필요한 useEffect동기화를 제거해보자]()
[[Refactoring] Chapter5. React query global 에러콜백과 Error Boundary를 통한 컴포넌트 에러 핸들링을 하자]()

## 관심사 분리

### 컴포넌트 분리

- Recommend

  - Keyword

- Product

  - TitleBox
  - CategoryBox
  - Description
  - Seller
  - PriceBox

- Mypage

  - UserInfo
  - UserPosts
  - CategoryButtons
  - EmptyPost

- Profile

  - ProfileImage
  - NicknameForm
  - KeywordForm
    - Keyword

- Search
  - SearchWords
  - SearchForm
  - GithubLink

> **명확한 책임 분리와 재사용성 증가**
> e.g. `Keyword` 컴포넌트는 개별 키워드 버튼을 렌더링하는 역할만 담당하기 때문에, 컴포넌트의 역할이 명확해졌고 컴포넌트를 다른 리스트에서도 재사용할 수 있다.

[recommend.tsx 32 line ~](https://github.com/panda-refactoring/panda-refactoring/blob/main/src/components/main/recommend.tsx)
[keyword.tsx](https://github.com/panda-refactoring/panda-refactoring/blob/main/src/components/main/keyword.tsx)

**선언적인 코드**

렌더링하는 부분을 컴포넌트로 분리해 어떤걸 렌더링하는지 예측할 수 있게 되어 가독성이 좋아지고 선언적으로 코드를 작성.

```jsx
// as-is
{
  hasRecommendList ? (
    <div className="grid min-h-[540px] grid-cols-2 gap-3 transition">
      {recommendList?.map(data => (
        <ProductItem {...data} key={data.id} imgh="h-[190px]" />
      ))}
    </div>
  ) : (
    <div className="flex min-h-[540px] items-center justify-center text-center">
      <div>
        <div className="mx-auto mb-4 h-20 w-20">
          <Image src={emptybox} alt="" width={80} height={80} />
        </div>
        <p>해당 키워드에 준비된 상품이 없습니다.</p>
      </div>
    </div>
  );
}
```

```jsx
// to-be
{
  hasRecommendList ? (
    <div className="grid min-h-[540px] grid-cols-2 gap-3 transition">
      {recommendList?.map(data => (
        <ProductItem {...data} key={data.id} imgh="h-[190px]" />
      ))}
    </div>
  ) : (
    <div className="flex min-h-[540px] items-center justify-center text-center">
      <EmptyProduct />
    </div>
  );
}
```

**도메인관련 로직을 커스텀 훅으로 분리**

도메인 관련 로직을 커스텀 훅으로 분리해 컴포넌트의 관심사를 분리한다.

- [useComment]()
- [useTextArea]()
- [useRecentWord]()

### 명확한 이름 정하기

**파일-컴포넌트 명 통일**

`MainProduct` → ProductItem

**파일명 변경**

- `create/` → create/market
- `create/post` → create/style-feed

**props명 변경**

- `keywords={keywords}` → keywordItemList={keywordItemList}
- `keyword={keyword}` → keyword={selectedKeyword}

**조건부 렌더링의 조건을 변수화**

```jsx
// as-is
...
return (
    <>
      {recommendList?.length > 0 ? (
        <div className="grid min-h-[540px] grid-cols-2 gap-3 transition">
          {recommendList?.map(data => (
            <ProductItem {...data} key={data.id} imgh="h-[190px]" />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[540px] items-center justify-center text-center">
          <EmptyProduct />
        </div>
      )}
      {recommendList?.length > 0 && keywordItemList[selectedKeyword] && (
        <RecommendButton
          refreshRecommends={setRecommendItems}
          keywordItemList={keywordItemList}
          keyword={selectedKeyword}
        />
      )}
    </>
  );
```

```jsx
// to-be
...
 const hasRecommendList = recommendList?.length > 0;
 const isVisibleRecommendButton = recommendList?.length > 0 && keywordItemList[selectedKeyword];

  return (
    <>
      {hasRecommendList ? (
        <div className="grid min-h-[540px] grid-cols-2 gap-3 transition">
          {recommendList?.map(data => (
            <ProductItem {...data} key={data.id} imgh="h-[190px]" />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[540px] items-center justify-center text-center">
          <EmptyProduct />
        </div>
      )}
      {isVisibleRecommendButton && (
        <RecommendButton
          refreshRecommends={setRecommendItems}
          keywordItemList={keywordItemList}
          keyword={selectedKeyword}
        />
      )}
    </>
  );
```

[RecommendList.tsx 19 lines~](https://github.com/panda-refactoring/panda-refactoring/blob/main/src/components/main/recommend-list.tsx)

## 코드 리팩토링

### 중복코드 추출

두개의 useEffect에서 중복된 코드를 하나의 useEffect에서 수행할 수 있도록 리팩토링

```jsx
// as-is
useEffect(() => {
  if (status !== "success" || !userData) return;

  setKeyword(userData.keywords[0]?.tag);
  setKeywordItems(userData.keywords, products);
}, [status, userData]);

useEffect(() => {
  if (session === "unauthenticated" && status === "success") {
    setKeyword("추천아이템");
    setKeywordItemList({ 추천아이템: products });
  }
}, [session, status]);
```

```jsx
// to-be
useEffect(() => {
  if (status !== "success") return;

  if (userData) {
    setKeyword(userData.keywords[0]?.tag);
    setKeywordItems(userData.keywords, products);
    return;
  }

  if (isUnAuthenticatedUser) {
    setKeyword("추천아이템");
    setKeywordItemList({ 추천아이템: products as ProductData[] });
  }
}, [status, userData, session]);
```

### 플래그인수 제거

**props에 따른 분기처리 수정1**

submit관련 로직을 공통으로 사용하는 컴포넌트에서 사용할 수 있는 `type`, `userData`를 props로 받는 `useCreatePost`.

```jsx
// as-is
const {
  submit,
  status: isLoading,
  toast,
  handleImage,
} = useCreatePost({ type: "market", userData: userData.contents });
```

type에 따른 분기 로직을 제거하고, 각각의 type에 대응되는 함수들을 생성해 커스텀 훅에 type을 넘기는 대신 명시적 함수를 호출하도록 수정.

컴포넌트에서 useMutation을 직접 사용하는 대신 mutate를 반환하는 각각의 래퍼함수를 만들어 컴포넌트에서 호출하도록 수정.

```jsx
// create.ts
export const useCreateMarket = () => {
  return useMutation({
    mutationKey: CREATE_KEY.MARKET,
    mutationFn: async (payload: MarketPayload) => await apiPost.CREATE_ITEM(payload),
  });
};
```

**props에 따른 분기처리 수정2**

- props로 productData나 lookbookData전달
- 커스텀훅에서 react-query서버요청
- productData나 lookbookData에 따른 분기처리를 커스텀 훅 내부에서 함.

```jsx
// as-is
const updateFav = useCallback(async (favConfig: { currentUserId: number, lookId?: number, productId?: number }) => {
  const { currentUserId, productId, lookId } = favConfig;
  const payload = productId ? { productId } : { lookId };

  const data = apiPost.UPDATE_USER(currentUserId, payload);
  return data;
}, []);
```

컴포넌트에서 query훅을 실행

```jsx
// to-be
const { mutate, isSuccess } = useUpdateLookbookFavorite();

const clickComment = () => {
  if (!userId) {
    setLoginModal({ submitFn: goLoginPage });
    return;
  }

  mutate({
    currentUserId: userId,
    lookId: id,
  });
};
```

### 불필요한 상태 동기화(useEffect) 제거

**중복된 state와 useEffect를 제거해 불필요한 상태 동기화를 제거**

useRecommend가 마운트되었을 때 useEffect에서
`[setRecommendItems]` → `[setRandomItems]` → `useEffect실행` → `[setRecommendList]` 의 흐름으로 불필요한 상태의 동기화가 연이어 발생되도록 구현되어 있다.
`randomItems`는 `setRecommendItems`의 변수와 useState상태로 중복되어 존재한다.

```jsx
// as-is
const useRecommend = ({ keyword, productList }: IUseRecommend) => {
  const [randomItems, setRandomItems] = useState<KeywordItemList>({});
  const [recommendList, setRecommendList] = useState<ProductData[]>([]);

  const { status: session } = useSession();
  const isUnAuthenticatedUser = session === "unauthenticated";

  const setRecommendItems = (keywordItemList: KeywordItemList) => {
    const randomItems: KeywordItemList = {};

    Object.entries(keywordItemList).forEach(([key, value]) => {
      randomItems[key] = random(value);
    });

     setRandomItems(randomItems);
  };

  useEffect(() => {
    if (isUnAuthenticatedUser) {
      setRecommendList(randomItems["추천아이템"]);
      return;
    }
    setRecommendList(randomItems[keyword]);
  }, [randomItems]);

   useEffect(() => {
    if (!keyword) return;
    setRecommendItems(productList);
  }, [keyword, productList]);

  return { recommendList, setRecommendItems };
};
```

중복된 state와 useEffect를 제거해 불필요한 상태의 동기화를 제거하였다.

```jsx
// to-be
const useRecommend = ({ keyword, productList }: IUseRecommend) => {
  const [recommendList, setRecommendList] = useState<ProductData[]>([]);

  const { status: session } = useSession();
  const isUnAuthenticatedUser = session === "unauthenticated";

  const handleRecommendItems = (keywordItemList: KeywordItemList) => {
    const randomItems: KeywordItemList = {};

    Object.entries(keywordItemList).forEach(([key, value]) => {
      randomItems[key] = random(value);
    });

    if (isUnAuthenticatedUser) {
      setRecommendList(randomItems["추천아이템"]);
      return;
    }

    setRecommendList(randomItems[keyword]);
  };

  useEffect(() => {
    if (!keyword) return;

    handleRecommendItems(productList);
  }, [keyword, productList]);

  return { recommendList, setRecommendItems };
};

export default useRecommend;
```

**초기값을 useEffect내부에서 업데이트 → 일반 변수를 계산하여 업데이트**

useEffect에서 marketData, isLoading상태를 의존성 배열로 가지고 있고 marketList는 useState로 관리하고 있어 리렌더링이 계속 될 수 있다.

```jsx
// as-is
 const [marketList, setMarketList] = useState<MainProductData[]>([]);

  useEffect(() => {
    if (isLoading) return;

    const copiedData = marketData.slice();
    setMarketList(copiedData.reverse());
  }, [marketData, isLoading]); // props
```

일반 변수가 props에 따라 계산되도록 수정하여 리렌더링을 줄이고 불필요한 동기화를 제거하였다.

```jsx
// to-be
const marketList: MainProductData[] = hasValue && marketData ? marketData.slice().reverse() : [];
```

**불필요한 커스텀 훅 삭제**

커스텀훅에 데이터(기본값)을 전달해 useState, useEffect로 리스트를 업데이트하여 반환된다.

```jsx
// as-is: 커스텀 훅 내부에서 useEffect로 state값을 업데이트하여 lookbookList를 반환
const { lookbookList } = useLookbook({ lookbooks: lookbooks ?? [] });
```

부모 컴포넌트에서 리스트를 일반 변수로 관리하고 useQuery로 반환된 기본값에 따라 계산하여 리스트를 업데이트하였다.

```jsx
// to-be: 컴포넌트에서 lookbookList를 계산
const sortingWithFavoriteCounts = (lookbooks: LookbookData[]) => {
  return lookbooks.sort((a, b) => b.favorite.length - a.favorite.length);
};

const lookbookList = lookbooks ? sortingWithFavoriteCounts(lookbooks).splice(0, 7) : [];
```

## 전역 에러핸들링

React query global 에러콜백과 ErrorBoundary를 사용하여 에러를 전역으로 핸들링한다.

**QueryProvider.tsx**

QueryClientProvider의 Wrapper역할을 수행하고 global 오류폴백을 렌더링한다.

```jsx
  const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler, //  에러 발생시 실행시킬 함수
      retry: 0,
    },
  },
});

<QueryClientProvider client={queryClient}>
```

[query-provider.tsx]()

**ErrorBoundary.tsx**

state에 각 에러에 맞는 state를 추가하여 에러 상태에 따른 폴백을 렌더링한다.
`componentDidCatch`에서 error의 경우에 따른 setState로 인해 렌더링될 UI가 달라지고 에러가 없으면 기존 컴포넌트가 렌더링된다.

```jsx
componentDidCatch(error: any, errorInfo: ErrorInfo) {
  // You can use your own error logging service here
  switch (error) {
    case "AxiosError":
      this.setState({ axiosError: true });
  }
}

render() {
  // Check if the error is thrown
  if (this.state.hasError) {
    // You can render any custom fallback UI
    if (this.state.axiosError) return this.props.modalFallback;

    return this.props.errorFallback;
  }

  // Return children components in case of no error
  return this.props.children;
}
```

[error-boundary.tsx]()
