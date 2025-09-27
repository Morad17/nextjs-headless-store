import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import Homepage from "@/components/homepage/Homepage";

export default function Home() {
  return (
    <div className="landing-page">
      <Homepage />
    </div>
  );
}
