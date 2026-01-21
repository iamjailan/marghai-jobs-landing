"use client";

import Image from "next/image";
import React from "react";
import { useI18n } from "@/lib/i18n";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Footer = () => {
  const { t } = useI18n();
  const lang = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const currentYear = new Date().getFullYear();

  const persianYear = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
  }).format(new Date());

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Image
            width={40}
            height={40}
            src={"/logo.png"}
            className="rounded-full"
            alt="marghai-logo"
          />
          <span className="text-2xl font-bold">{t("footer.brand")}</span>
        </div>
        <p className="text-gray-400 mb-4">{t("footer.tagline")}</p>
        <p className="text-gray-500 text-sm">
          Built by{" "}
          <a
            href="https://github.com/iamjailan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            Jailan Samun
          </a>
        </p>
        <p className="text-gray-500 text-sm">
          {t("footer.copyright").replace(
            "{year}",
            lang === "en" ? currentYear.toString() : persianYear.toString(),
          )}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
