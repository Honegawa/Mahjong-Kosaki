import {
  DOWNLOAD_DIRECTORY,
  FORM,
} from "../utils/constants/download.constants.js";
import fs from "fs";

export const downloadForm = async (req, res) => {
  const filePath = `${DOWNLOAD_DIRECTORY}/${FORM}`;

  if (!fs.existsSync(filePath)) {
    return res.status(400).json({ error: "File not found." });
  }

  res.download(filePath, FORM, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "Error: Unable to download the file." });
    }
  });
};
