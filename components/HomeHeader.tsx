import { NextPage } from "next"
import Header from "./Header";

const titles: string[] = [
  "ホーム",
  "商品紹介",
  "当店のこだわり",
  "お知らせ",
  "お問い合わせ",
  "プライバシーポリシー",
];

const links: string[] = [
  "/",
  "products",
  "features",
  "info",
  "/inquiry",
  "/privacypolicy",
];

const isinpages: boolean[] = [
  false,
  true,
  true,
  true,
  false,
  false,
];

const HomeHeader: NextPage = () => 
  <Header titles={titles} links={links} isinpages={isinpages}/>

export default HomeHeader
