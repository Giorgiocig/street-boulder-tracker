import TitleBar from "../common/TitleBar";
import Footer from "../common/Footer";
import BoulderEditor from "./BoulderEditor";
import EventEditor from "../common/EventEditor";

export default function Main() {
  return (
    <>
      <TitleBar />
      <EventEditor />
      <BoulderEditor />
      <Footer />
    </>
  );
}
