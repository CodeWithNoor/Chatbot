import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID, // OPENAI_ORGANIZATION_ID
  apiKey: process.env.OPENAI_API_KEY,      // OPENAI_API_KEY
});

// console.log(configuration)

const openai = new OpenAIApi(configuration);
const query = async (prompt:string, chatId: string, model:string) => {
  const res = await openai.createCompletion({
    model,
    prompt,
    max_tokens: 10, // max_tokens: number of tokens to complete to. Can return fewer if a stop sequence is hit.
    temperature: 0, // temperature: higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
    // top_p: 1,
    // frequency_penalty: 0, // frequency_penalty: number b/w 2.0 & 0.2 decreases the model's likelihood to repeat the same response.
    // presence_penalty: 0, // presence_penalty: increases the model's likelihood to talk about new topics
  }).then(res =>  res.data.choices[0].text)
  .catch(error => `Error: ${error.message}`);

  // console.log("return", res)
  return res;
};

export default query;