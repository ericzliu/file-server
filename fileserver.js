const express = require('express');
const multer = require('multer');
var cors = require('cors');

const UPLOAD_PATH = './uploaded/';

const storage = multer.diskStorage({
    destination: `${UPLOAD_PATH}`,
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
  });

const upload = multer({storage: storage}).single('avatar');

const app = express();
app.use(cors());

app.get('/', (request, response) => {
    response.send('Hello world!')
});

app.post('/upload', function(req, res) {
    upload(req, res, function(err) {
        console.log(err);
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded.");
    });
});

app.listen(9876, () => {
    console.log('Fileserver listening on port 9876')
})
