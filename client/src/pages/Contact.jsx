import Header from "../components/Header";
import SubscribeComponent from "../components/Subscribe";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with the AARAMBH CMS team for inquiries, support, or newsletter subscriptions."
      />
      <Header />
      <main className="pt-20">
        <SubscribeComponent />
      </main>
      <Footer />
    </>
  );
}
