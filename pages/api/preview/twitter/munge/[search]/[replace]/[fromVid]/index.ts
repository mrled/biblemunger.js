import { previewImageHandlerFromReqHof } from "lib/server/preview";
import { previewImageDimensions } from "lib/all/previewImageDimensions";

const handler = previewImageHandlerFromReqHof(
  previewImageDimensions.twitterImage.width,
  previewImageDimensions.twitterImage.height
);
export default handler;
