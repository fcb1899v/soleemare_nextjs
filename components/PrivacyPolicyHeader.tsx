import { NextPage } from "next"
import Header from "./Header";

const titles: string[] = [
  "ホーム",
  "お問い合わせ",
  "プライバシーポリシー",
];

const links: string[] = [
  "/",
  "/inquiry",
  "/privacypolicy",
];

const isinpages: boolean[] = [
  false,
  false,
  false,
];

const PrivacyPolicyHeader: NextPage = () => 
  <Header titles={titles} links={links} isinpages={isinpages}/>

export default PrivacyPolicyHeader
