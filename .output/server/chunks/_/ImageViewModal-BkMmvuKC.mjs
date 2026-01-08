import { ssr, ssrHydrationKey, ssrAttribute, escape } from "solid-js/web";
import { u as useImageViewModal } from "./router-lSxH-c65.mjs";
import "solid-js";
import "./server.mjs";
import "node:async_hooks";
import "node:stream/web";
const dialog = "_dialog_17nkp_3";
const header = "_header_17nkp_53";
const image = "_image_17nkp_127";
const styles = {
  dialog,
  header,
  "close-button": "_close-button_17nkp_75",
  image
};
var _tmpl$ = ["<dialog", ' id="modal"', "><header", '><a href="#"', ' title="close">✕</a></header><img', ' alt="Project cover"></dialog>'];
const ImageViewModal = () => {
  const modal = useImageViewModal();
  return ssr(_tmpl$, ssrHydrationKey(), ssrAttribute("class", escape(styles.dialog, true), false), ssrAttribute("class", escape(styles.header, true), false), ssrAttribute("class", escape(styles["close-button"], true), false), ssrAttribute("src", escape(modal.imageUrl(), true), false) + ssrAttribute("class", escape(styles.image, true), false));
};
export {
  ImageViewModal as default
};
