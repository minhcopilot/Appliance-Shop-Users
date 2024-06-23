"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Facebook,
  HackerNews,
  Reddit,
  Twitter,
  LinkedIn,
  Pinterest,
  Telegram,
  Whatsapp,
  Pocket,
} from "../icons/index";
import { ShareAltOutlined } from "@ant-design/icons";
import { Affix } from "antd";
import { BsShareFill } from "react-icons/bs";
import { Share } from "../icons/Share";

const isProduction = process.env.NODE_ENV === "production";

export const SocialShare = ({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) => {
  const [share, openShare] = React.useState(false);
  const [host, setHost] = React.useState("");
  const [shareIcons, setShareIcons] = React.useState([]);

  React.useEffect(() => {
    setHost(window.location.host);
  }, []);

  const url = `${isProduction ? "https://" : "http://"}${host}/blog/${slug}`;
  const text = title + url;
  const via = "Gia dụng Đà Nẵng";
  const sharer = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}&via=${via}`,
    reddit: `https://www.reddit.com/submit?title=${title}&url=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`,
    telegram: `https://telegram.me/share/url?url=${url}&text=${text}`,
    whatsapp: `https://wa.me/?text=${title}%0D%0A${url}%0D%0A%0D%0A${text}`,
    pocket: `https://getpocket.com/edit.php?url=${url}`,
  };

  const itemVariants = {
    hidden: (i: any) => ({
      opacity: 0,
      x: -16,
      transition: {
        delay: i * 0.1,
      },
    }),
    visible: (i: any) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1, // custom prop used to stagger delay
      },
    }),
  };

  return (
    <div className="absolute top-[400px] left-[-50px] h-[calc(100%_-_350px)]">
      <ul className="block sticky top-[150px] flex flex-col items-center mt-8 space-y-4 text-yellow-600 p-4">
        <li>
          <a
            className=""
            target="_blank"
            href={sharer.facebook}
            title="Share on Facebook"
          >
            <Facebook />
          </a>
        </li>
        <li>
          <a
            className=""
            target="_blank"
            href={sharer.twitter}
            title="Share on Twitter"
          >
            <Twitter />
          </a>
        </li>
        <li>
          <a
            className=""
            target="_blank"
            href={sharer.reddit}
            title="Share on Reddit"
          >
            <Reddit />
          </a>
        </li>
        <motion.li className="cursor-pointer" whileHover={{}}>
          <Share
            onClick={() => {
              openShare(!share);
            }}
          />
        </motion.li>

        <AnimatePresence>
          {share && (
            <>
              <motion.li
                variants={itemVariants}
                key="linkedin" /* don't forget key! */
                initial="hidden"
                animate="visible"
                exit="hidden"
                custom={1}
              >
                <a
                  className=""
                  href={sharer.linkedin}
                  title="Share on LinkedIn"
                >
                  <LinkedIn />
                </a>
              </motion.li>

              <motion.li
                variants={itemVariants}
                key="pinterest"
                initial="hidden"
                animate="visible"
                exit="hidden"
                custom={2}
              >
                <a
                  className=""
                  href={sharer.pinterest}
                  target="_blank"
                  title="Share on Pinterest"
                >
                  <Pinterest />
                </a>
              </motion.li>

              <motion.li
                variants={itemVariants}
                key="telegram"
                initial="hidden"
                animate="visible"
                exit="hidden"
                custom={3}
              >
                <a
                  className=""
                  href={sharer.telegram}
                  target="_blank"
                  title="Share on Telegram"
                >
                  <Telegram />
                </a>
              </motion.li>

              <motion.li
                variants={itemVariants}
                key="whatsapp"
                initial="hidden"
                animate="visible"
                exit="hidden"
                custom={4}
              >
                <a
                  className=""
                  href={sharer.whatsapp}
                  target="_blank"
                  title="Share on Whatsapp"
                >
                  <Whatsapp />
                </a>
              </motion.li>
              <motion.li
                variants={itemVariants}
                key="pocket"
                initial="hidden"
                animate="visible"
                exit="hidden"
                custom={5}
              >
                <a
                  className=""
                  href={sharer.pocket}
                  target="_blank"
                  title="Share on Pocket"
                >
                  <Pocket />
                </a>
              </motion.li>
            </>
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
};
