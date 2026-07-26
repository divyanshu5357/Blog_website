import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  Facebook,
  Linkedin,
  Twitter,
  MessageCircle,
  Link2,
} from "lucide-react";

import toast from "react-hot-toast";

export default function ShareButtons({
  title,
}) {
  const url = window.location.href;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);

    toast.success("Link copied!");
  };

  return (
    <div className="mt-16 border-y py-8">

      <h3 className="text-xl font-semibold mb-6">
        Share this article
      </h3>

      <div className="flex flex-wrap gap-4">

        <button
          onClick={copyLink}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border hover:bg-gray-100 transition"
        >
          <Link2 size={18} />

          Copy Link
        </button>

        <TwitterShareButton
          url={url}
          title={title}
        >
          <div className="flex items-center gap-2 px-5 py-3 rounded-xl border hover:bg-black hover:text-white transition cursor-pointer">
            <Twitter size={18} />

            X
          </div>
        </TwitterShareButton>

        <LinkedinShareButton
          url={url}
          title={title}
        >
          <div className="flex items-center gap-2 px-5 py-3 rounded-xl border hover:bg-blue-600 hover:text-white transition cursor-pointer">
            <Linkedin size={18} />

            LinkedIn
          </div>
        </LinkedinShareButton>

        <FacebookShareButton url={url}>
          <div className="flex items-center gap-2 px-5 py-3 rounded-xl border hover:bg-blue-700 hover:text-white transition cursor-pointer">
            <Facebook size={18} />

            Facebook
          </div>
        </FacebookShareButton>

        <WhatsappShareButton
          url={url}
          title={title}
        >
          <div className="flex items-center gap-2 px-5 py-3 rounded-xl border hover:bg-green-600 hover:text-white transition cursor-pointer">
            <MessageCircle size={18} />

            WhatsApp
          </div>
        </WhatsappShareButton>

      </div>

    </div>
  );
}