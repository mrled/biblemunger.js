import { previewImageHandlerHof } from "lib/server/preview";
import previewDefaultImage from "lib/all/previewDefaultImage";

const handler = previewImageHandlerHof(previewDefaultImage.openGraph.image);
export default handler;
