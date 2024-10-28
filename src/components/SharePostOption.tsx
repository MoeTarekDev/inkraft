"use client";
import { Linkedin } from "lucide-react";

export default function SharePostOption({
  postContent,
  postLink,
}: {
  postContent: string;
  postLink: string;
}) {
  const handleLinkedInShare = (e: React.MouseEvent) => {
    e.preventDefault();

    const encodedUrl = encodeURIComponent(postLink);
    const encodedTitle = encodeURIComponent("Check this out");
    const encodedSummary = encodeURIComponent(postContent);

    // LinkedIn sharing URL
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`;

    // Open a popup window
    const width = 550;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      linkedInUrl,
      "linkedin-share-dialog",
      `width=${width},height=${height},left=${left},top=${top},toolbar=0,location=0,menubar=0,directories=0,scrollbars=0`
    );
  };

  return (
    <li
      onClick={handleLinkedInShare}
      className="p-4 hover:bg-accent cursor-pointer"
    >
      <button className="flex items-center gap-2 w-full">
        <Linkedin className="w-5 h-5" />
        <span>Share post to LinkedIn</span>
      </button>
    </li>
  );
}
