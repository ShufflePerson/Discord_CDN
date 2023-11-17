import { getFullLink } from "./";
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/:url(*)', async (req, res) => {
  const encodedUrl = req.params.url;
  const decodedUrl = decodeURIComponent(encodedUrl);

  const fullLink = await getFullLink(decodedUrl);

  if (fullLink) {
    res.redirect(fullLink); 
  } else {
    res.status(404).send('Failed to get the download link.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

