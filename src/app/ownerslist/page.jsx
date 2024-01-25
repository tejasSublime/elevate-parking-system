import Image from "next/image";
import { applogo } from "@/images";

export default function OwnerList() {
  return (
    <main className="flex  flex-col mx-auto items-center justify-center">
      <Image src={applogo} alt="applogo" className="" />
      <h2 className="text-center font-extrabold my-">
        This is Owner List Page
      </h2>
    </main>
  );
}
