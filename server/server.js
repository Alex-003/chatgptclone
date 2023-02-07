import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req,res) =>
res.status(200). send({
    message: 'Hello from AI'
}));

app.post('/', async (req,res) => {
 try {
const prompt = req.body.prompt;

const response = await openai.createCompletion({
 model: "text-davinci-003",
 prompt:`${prompt}`,
 temperature: 0.9,
 max_tokens:3000,
 top_p: 1,
 frequency_penalty: 0.5,
 presence_penalty: 0,

});
res.status(200).send({
  bot: response.data.choices[0].text
})
 } catch (error) {
  console.log(error);
  res.status(500).send({error})
 }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));


/* This code sets up an Express.js web server and uses the OpenAI API to generate text completions. 
The code sets up a configuration for the OpenAI API with an API key obtained from the environment variables defined in a .env file. 
It then creates an instance of the OpenAI API.

The Express server uses the CORS middleware to allow cross-origin requests and the express.json middleware to parse JSON requests.
There are two endpoints defined:

GET /: Returns a JSON object with the message 'Hello from AI'.
POST /: Receives a JSON object with a prompt string, uses the OpenAI API to generate a text completion for the prompt, 
and returns the response as a JSON object with the completed text.

If an error occurs, the error is logged and a 500 status code with the error message is returned in the response. */