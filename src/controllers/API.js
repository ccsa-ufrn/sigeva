import { Router } from 'express';
import Response from './Response';

// To remove
import FileRequirementModel from '../models/fileRequirement.model';

// IMPORT ROUTERS
import userRouter from './user/UserRouter';
import eventRouter from './event/EventRouter';
import systemRouter from './system/SystemRouter';

// To remove
const fs = require('fs');
/**
 * API
 * Defines API's routers
 */
const APIrouter = Router(); // Create a new router instance

// Main route - Just a Rick and Morty stub quote
APIrouter.get('/', (req, res) => {
  res.json({
    rick: 'wubba lubba dub dub',
  });
});

APIrouter.use('/user', userRouter); // Set userRouter to /api/user
APIrouter.use('/event', eventRouter); // Set eventRouter to /api/router
APIrouter.use('/system', systemRouter); // Set systemRouter to /api/system

/* This code below is just a stub to test a thing. Don't ever use this as product */
APIrouter.post('/dropzone/:id', (req, res) => {
  const reqId = req.params.id;
  FileRequirementModel.findById(reqId, (err, doc) => {
    if (!fs.existsSync(`/home/mrmorais/sigeva-code/uploads/${doc.fileType}`)) {
      fs.mkdir(`/home/mrmorais/sigeva-code/uploads/${doc.fileType}`);
    }

    const file = req.files.file;
    file.mv(`/home/mrmorais/sigeva-code/uploads/${doc.fileType}/${file.name}`, (err) => {
      if (!err) {
        res.json({ ok: true });
      }
    });
  });
});
/* restriction ends here */

// Throw 404 error for API's requests when got the end of API
APIrouter.all('*', (req, res) => {
  res.status(404);
  res.json(Response(true, {}, 'This request was not handled by any route'));
});

export default APIrouter;
