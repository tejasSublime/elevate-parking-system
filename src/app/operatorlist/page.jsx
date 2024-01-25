import Image from "next/image";
import { applogo } from "@/images";

export default function OperatorList() {
  return (
    <main className="flex  flex-col mx-auto items-center justify-center">
      <Image src={applogo} alt="applogo" className="" />
      <h2 className="text-center font-extrabold my-">This is Operator List Page</h2>
    </main>
  );
}
