import { useToast } from "@/hooks/use-toast";
import { LinkIcon } from "lucide-react";

export default function CopyOption({
  postLink,
  setIsOpen,
}: {
  postLink: string;
  setIsOpen: any;
}) {
  const { toast } = useToast();
  return (
    <li
      onClick={() => {
        const cb = navigator.clipboard;
        cb.writeText(postLink).then(() => {
          toast({
            description: "Link copied to clipboard.",
          });
          setIsOpen(false);
        });
      }}
      className="p-4 flex items-center gap-2 hover:bg-accent cursor-pointer"
    >
      <LinkIcon className="w-5 h-5" />
      <span>Copy link to Clipboard</span>
    </li>
  );
}
