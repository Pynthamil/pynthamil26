import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Pynthamil Pavendan",
};

export default function PlayPage() {
  redirect("/");
}
