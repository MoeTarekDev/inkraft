import { useUser } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserProfile } from "@clerk/clerk-react";

import { Button } from "./ui/button";
import Link from "next/link";
export default function EditAccount() {
  return (
    <Link href="/profile/edit">
      <Button>Edit Account</Button>
    </Link>
  );
}
