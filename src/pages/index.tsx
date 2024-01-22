import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
const Banner = dynamic(() => import("@/components/design/banner"), {
  loading: () => <CircularProgress />,
});
const Layout = dynamic(() => import("@/components/design/layout"), {
  loading: () => <CircularProgress />,
});
const Collection = dynamic(() => import("@/components/views/collection"), {
  loading: () => <CircularProgress />,
});
const Product = dynamic(() => import("@/components/views/product"), {
  loading: () => <CircularProgress />,
});
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
            url: "https://jwpharma.me/cdn/shop/files/pexels-photo-8131580.webp?v=1702016761&width=2000",
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
