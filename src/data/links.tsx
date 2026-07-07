import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, ContactIcon, GitForkIcon, UserStarIcon, HeartIcon } from "lucide-react";

export const DATA = {

  navbar: [
    { href: "/", icon: HomeIcon, label: "ഹോം" },
    { href: "/core", icon: UserStarIcon, label: "ഞങ്ങളെക്കുറിച്ച്" },
    { href: "/donate", icon: HeartIcon, label: "കാമ്പയിൻ" },
    { href: "/contact", icon: ContactIcon, label: "ബന്ധപ്പെടുക" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://dub.sh/dillion-github",
        icon: Icons.github,

        navbar: false,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/jawahrathul_uloom_suffa_dars/?hl=en",
        icon: Icons.instagram,

        navbar: true,
      },
      Facebook: {
        name: "Facebook",
        url: "https://www.facebook.com/jawharathululoomsuffadars",
        icon: Icons.facebook,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/channel/UCsNNaTn6vyHI1YfAGZnD2_Q",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },
} as const;
