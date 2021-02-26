/* eslint-disable import/prefer-default-export */

import { buildURL } from "react-imgix";

import { NEXT_PUBLIC_IMGIX_URL } from "@constants";
import { Photo } from "@types/models";

export const getImgixUrlForTextureFromRef = (ref: string): string =>
  `${NEXT_PUBLIC_IMGIX_URL}/${ref}?w=1028`;

export const getImgixUrlForPreviewFromRef = (ref: string): string =>
  `${NEXT_PUBLIC_IMGIX_URL}/${ref}?w=500&format=auto`;

export const getImgixUrlForProductPreviewFromRef = (ref: string): string =>
  `${NEXT_PUBLIC_IMGIX_URL}/${ref}?w=500&ar=1&fit=crop&format=auto`;

export const getImgixUrlForPhotos = (ref: string): string =>
  `${NEXT_PUBLIC_IMGIX_URL}/${ref}`;

export const getImgixPathFromSignedUrl = (signedUrl: string) => {
  if (!signedUrl) {
    return null;
  }

  // don't use lookbehind: https://stackoverflow.com/questions/51568821/works-in-chrome-but-breaks-in-safari-invalid-regular-expression-invalid-group
  const matchThis = /(?:(\w+?\.appspot\.com\/o\/|\w+?\.appspot\.com\/|\w+?\.imgix\.net\/)).*?(?=(\?|$))/;

  const matchArray = signedUrl.match(matchThis);

  let text = matchArray?.[0];

  if (!text) {
    return null;
  }

  text = matchArray[0].replace(matchArray[1], "");

  if (text?.startsWith("o/")) {
    return text.split("o/")[1].replaceAll("/", "%2F");
  }
  return text.replaceAll("/", "%2F");
};

export const getImageImgSrcForSnapshotVersion = ({
  version,
  renders,
  isDraft,
  previewUrl,
}: Partial<Photo>) => {
  const sortedRenders = renders.sort((a, b) => {
    if (a.type === "post-processed" && b.type === "unprocessed") {
      return -1;
    }
    return 1;
  });

  return version === "v1.01" || version === "v1.02"
    ? buildURL(`/${sortedRenders?.[0]?.path}`, {
        ...(isDraft && {
          auto: "format",
          mark: "/watermarks/watermark_zerolens.png",
          "mark-align": "center",
        }),
      })
    : previewUrl;
};
