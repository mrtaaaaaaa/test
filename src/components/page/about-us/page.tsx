import TabAboutUs from "./components/tab-about-us";

const AboutUs = () => {
  return (
    <div className="lg:w-10/12 mx-auto">
      <div className="title">
        <h1 className="text-blue  text-2xl text-center font-bold">درباره ما</h1>
        <span className="block text-center mt-4 px-2">
          ما تمام سعی خود را می‌کنیم تا بهترین خدمات را به مشتریان ارائه دهیم.
        </span>
      </div>
      <TabAboutUs />
    </div>
  );
};
export default AboutUs;
