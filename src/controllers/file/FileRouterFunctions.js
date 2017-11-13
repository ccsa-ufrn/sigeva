import File from './File';
import { file_dir as fileDir } from '../../../config';
import fs from 'fs';
/**
 * Endpoint: /file/download/:id
 */
const downloadFile = (req, res) => {
  const id = req.params.id;
  const file = new File();
  file.loadById(id)
    .then((fileDoc) => {
      const path = `${fileDir}/${fileDoc.fileRequirement.fileType}/${fileDoc._id}.${fileDoc.extension}`;
      res.download(path);
    })
    .catch(() => {
      res.send('File not found').end();
    });
};

export {
  downloadFile,
};
