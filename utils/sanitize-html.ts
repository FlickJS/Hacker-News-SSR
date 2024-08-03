import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

export const sanitizeHtml = (html: string): string => {
  let cleanHtml;
  let tempDiv;

  if (typeof window === "undefined") {
    const window = new JSDOM("").window;
    const DOMPurifyServer = DOMPurify(window);
    cleanHtml = DOMPurifyServer.sanitize(html, {
      FORBID_TAGS: ["style"],
      FORBID_ATTR: ["style"],
    });

    tempDiv = window.document.createElement("div");
  } else {
    cleanHtml = DOMPurify.sanitize(html, {
      FORBID_TAGS: ["style"],
      FORBID_ATTR: ["style"],
    });

    tempDiv = document.createElement("div");
  }

  tempDiv.innerHTML = cleanHtml;

  const elements = tempDiv.getElementsByTagName("*");
  for (let i = 0; i < elements.length; i++) {
    elements[i].removeAttribute("style");
  }

  return tempDiv.innerHTML;
};
