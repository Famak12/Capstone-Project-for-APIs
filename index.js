import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const message = "The latitude and longitutde must be enterned in decimals";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs', {message : message})
})

app.post("/post-data", async (req, res) => {
    try {
        const long = req.body['longitude'];
        const lat = req.body['latitude'];
        const date = req.body['date'];
      const result = await axios.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&date=${date}`);
    //   const resultObject = JSON.stringify(result.data.results);
      res.render("index.ejs", {
        // content: JSON.stringify(result.data.results),
        sunrise : JSON.stringify(result.data.results.sunrise),
        sunset : JSON.stringify(result.data.results.sunset),
        message: message,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});