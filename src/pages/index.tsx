import dynamic from "next/dynamic";
const Banner = dynamic(() => import("@/components/design/banner"));
const Layout = dynamic(() => import("@/components/design/layout"));
const Collection = dynamic(() => import("@/components/views/collection"));
export default function Home() {
  return (
    <Layout>
      <>
        <Banner data={[
          {
            url:"https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title:"test"
          },
          {
            url:"https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600",
            title:"test"
          }
        ]}  />
        <Collection perPage={3} />
      </>
    </Layout>
  );
}
