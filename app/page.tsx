// "use client"
// import Button from "@/src/global_ui_vault/button";
// import DialogueBox from "@/src/global_ui_vault/dialogueBox";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const route = useRouter()
//   return (
//     <div className="w-full h-screen">

//       <DialogueBox
//         classname="container bg-background"
//         body={
//           <div className="flex flex-col items-center gap-(--space-5)">
//             <h1 className="text-center">
//               Korverna is launching soon
//             </h1>
//             <Button
//               className="w-fit"
//               onClick={()=>{
//                 route.push("https://wa.me/2347044787352")
//               }}>
//               Contact Us
//             </Button>
//           </div>
//         }
//       />

//       <img 
//         src="https://ik.imagekit.io/qvblsmda9/maxresdefault.jpg" 
//         alt="heavy_duty_machine"
//         className="w-full h-full object-cover" />

//     </div>
//   );
// }



import { redirect } from "next/navigation";

export default function Page() {
  redirect("/welcome");
}