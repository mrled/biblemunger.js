import { previewImageHandlerFromReqHof } from "lib/server/preview";
import { previewImageDimensions } from "lib/all/previewImageDimensions";

const handler = previewImageHandlerFromReqHof(
  previewImageDimensions.ogImage.width,
  previewImageDimensions.ogImage.height
);
export default handler;
