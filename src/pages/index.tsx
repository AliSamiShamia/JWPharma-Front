import dynamic from "next/dynamic";
const Banner = dynamic(() => import("@/components/design/banner"));
const Layout = dynamic(() => import("@/components/design/layout"));
export default function Home() {
  return (
    <Layout>
      <>{/* <Banner data={[]}  /> */}</>
    </Layout>
  );
}
