import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import Timeline from "../components/Timeline";
import { storage } from "../services/storage";
export default function Experience() {
  return <><Navbar/><main className="min-h-screen bg-[#0d0b1c] px-5 pb-20 pt-28"><div className="mx-auto max-w-5xl"><SectionTitle eyebrow="Journey" title="Experience & Education"/><Timeline items={storage.getExperience()}/></div></main><Footer/></>;
}
