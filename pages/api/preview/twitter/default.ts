import { previewImageHandlerHof } from "lib/server/preview";
import previewDefaultImage from "lib/all/previewDefaultImage";

const handler = previewImageHandlerHof(previewDefaultImage.twitter.image);
export default handler;
