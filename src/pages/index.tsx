import dynamic from "next/dynamic";
const Banner = dynamic(() => import("@/components/design/banner"));
const Layout = dynamic(() => import("@/components/design/layout"));
const Collection = dynamic(() => import("@/components/views/collection"));
const Product = dynamic(() => import("@/components/views/product"));
const Grid = dynamic(() => import("@mui/material/Grid"));
export default function Home() {
  return (
    <Layout>
      <Banner
        data={[
          {
            url: "https://jwpharma.me/cdn/shop/files/pexels-photo-3738349.webp?v=1702016742&width=2000",
            title: "Our Collections",
            subtitle: "Discover a dazzling array of cosmetic wonders in Our Collections, curated to elevate your beauty routine and unveil your unique radiance.",
          },
          {
            url: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Our Products",
            // subtitle: "Discover a dazzling array of cosmetic wonders in Our Collections, curated to elevate your beauty routine and unveil your unique radiance.",
       
          },
        ]}
      />
      <Collection perPage={3} />
      <Product perPage={8} />
      <Grid pb={10}></Grid>
    </Layout>
  );
}
