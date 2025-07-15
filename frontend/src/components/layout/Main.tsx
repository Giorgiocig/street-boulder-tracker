import TitleBar from "../common/TitleBar";
import Footer from "../common/Footer";
import BoulderEditor from "./BoulderEditor";
import EventForm from "./EventForm";

export default function Main() {
  return (
    <>
      <TitleBar />
      <EventForm />
      <BoulderEditor />
      <Footer />
    </>
  );
}
