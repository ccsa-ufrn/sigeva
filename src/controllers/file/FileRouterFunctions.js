import File from './File';
import { file_dir as fileDir } from '../../../config';
/**
 * Endpoint: /file/download/:id
 */
const downloadFile = (req, res) => {
  const id = req.params.id;
  const file = new File();
  file.loadById(id)
    .then((fileDoc) => {
      const path = `${fileDir}/${fileDoc.fileRequirement.fileType}/${fileDoc._id}.${fileDoc.extension}`;
      res.sendFile(path);
    })
    .catch();
};

export {
  downloadFile,
};
