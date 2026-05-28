import { Footer, Navbar, Hero, Corusel, MainPagePosts } from "./component";
import { Box } from "@mui/material";
const IndexPage = () => {
  return <div>
    <Navbar/>
    <Box sx={{ minHeight: '80vh' }} className="pt-24 flex flex-col items-center justify-center">
      
      <Hero/>
      <Corusel/>
      <MainPagePosts/>
    </Box>
    
    <Footer/>
  </div>;
};

export default IndexPage;