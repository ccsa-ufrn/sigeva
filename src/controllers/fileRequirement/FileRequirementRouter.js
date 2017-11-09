import { Router } from 'express';
import fs from 'fs';

import FileRequirement from './FileRequirement';
import Response from '../Response';
import { file_dir as fileDir } from '../../../config';

const fileRequirementRouter = Router();

fileRequirementRouter.post('/upload/:id', (req, res) => {
  const fileReq = new FileRequirement();

  fileReq.loadById(req.params.id)
    .then((doc) => {
      const path = `${fileDir}/${doc.fileType}`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }

      const file = req.files.file;
      file.mv(`${path}/${file.name}`, (err) => {
        if (!err) {
          res.json(Response(false, { ok: true }));
        } else {
          res.json(Response(true));
        }
      });
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
