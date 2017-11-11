import { Router } from 'express';
import fs from 'fs';

import FileRequirement from './FileRequirement';
import File from '../file/File';
import { simpleAuthorization } from '../authorization/Authorization';
import Response from '../Response';
import { file_dir as fileDir } from '../../../config';

const fileRequirementRouter = Router();

fileRequirementRouter.post('/upload/:id', simpleAuthorization, (req, res) => {
  const fileReq = new FileRequirement();
  const databaseFile = new File();

  fileReq.loadById(req.params.id)
    .then((docRequirement) => {
      const path = `${fileDir}/${docRequirement.fileType}`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }

      if (req.files.file) {
        const file = req.files.file;
        const fileNameSplited = file.name.split('.');
        const fileExt = fileNameSplited[fileNameSplited.length - 1];

        databaseFile.setData(docRequirement._id, res.locals.user._id, fileExt);
        databaseFile.store()
          .then((docFile) => {
            file.mv(`${path}/${docFile._id}.${fileExt}`, (err) => {
              if (!err) {
                res.json(Response(false, { file: docFile }));
              } else {
                res.json(Response(true));
              }
            });
          });
      }
    })
    .catch(e => res.json(Response(true, { l: e.toString() })));
});

fileRequirementRouter.get('/:id', (req, res) => {
  const fileReq = new FileRequirement();

  fileReq.loadById(req.params.id)
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.json(Response(false, doc));
      } else {
        res.json(Response(true));
      }
    })
    .catch(() => res.json(Response(true)));
});

export default fileRequirementRouter;
