import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gemini-pro",
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
) {
  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `\nYou are to output ${
      list_output && "an array of objects in"
    } the following in json format: ${JSON.stringify(
      output_format
    )}. \nDo not put quotation marks or escape character \\ in the output fields.`;

    if (list_output) {
      output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
    }

    if (dynamic_elements) {
      output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}`;
    }

    if (list_input) {
      output_format_prompt += `\nGenerate an array of json, one json for each input element.`;
    }

    const geminiModel = genAI.getGenerativeModel({ model: model });

    const prompt = system_prompt + output_format_prompt + error_msg + "\n" + user_prompt.toString();

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    let res: string = response.text().replace(/'/g, '"') ?? "";

    res = res.replace(/(\w)"(\w)/g, "$1'$2");

    if (verbose) {
      console.log("Prompt:", prompt);
      console.log("\nGemini response:", res);
    }

    try {
      let output: any = JSON.parse(res);

      if (list_input) {
        if (!Array.isArray(output)) {
          throw new Error("Output format not in an array of json");
        }
      } else {
        output = [output];
      }

      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          if (/<.*?>/.test(key)) {
            continue;
          }

          if (!(key in output[index])) {
            throw new Error(`${key} not in json output`);
          }

          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            if (Array.isArray(output[index][key])) {
              output[index][key] = output[index][key][0];
            }
            if (!choices.includes(output[index][key]) && default_category) {
              output[index][key] = default_category;
            }
            if (output[index][key].includes(":")) {
              output[index][key] = output[index][key].split(":")[0];
            }
          }
        }

        if (output_value_only) {
          output[index] = Object.values(output[index]);
          if (output[index].length === 1) {
            output[index] = output[index][0];
          }
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
      console.log("An exception occurred:", e);
      console.log("Current invalid json format ", res);
    }
  }

  return [];
}  /*
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-3.5-turbo",
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
): Promise<any> {
  const isListInput: boolean = Array.isArray(user_prompt);
  const hasDynamicElements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const isListOutput: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  let error_msg: string = "";

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OpenAI API key in environment variables');
  }

  for (let attempt = 0; attempt < num_tries; attempt++) {
    let output_format_prompt: string = `\nYou are to output ${
      isListOutput ? "an array of objects in" : "the"
    } the following format in JSON: ${JSON.stringify(output_format)}. \nDo not use quotation marks or escape characters \\ in the output fields.`;

    if (isListOutput) {
      output_format_prompt += `\nIf an output field is a list, classify output into the best element of the list.`;
    }

    if (hasDynamicElements) {
      output_format_prompt += `\nText enclosed by < and > means you should generate content to replace it. Example input: Go to <location>, Example output: Go to the garden.\nKeys with < and > mean you should generate the key name. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}.`;
    }

    if (isListInput) {
      output_format_prompt += `\nGenerate an array of JSON objects, one for each input element.`;
    }

    const prompt = `${system_prompt}${output_format_prompt}${error_msg}\n${Array.isArray(user_prompt) ? user_prompt.join('\n') : user_prompt}`;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: model,
          messages: [{ role: 'system', content: system_prompt }, { role: 'user', content: prompt }],
          temperature: temperature,
          max_tokens: 2048, // Adjust based on your needs
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      let res: string = response.data.choices[0].message.content.replace(/'/g, '"') ?? "";

      res = res.replace(/(\w)"(\w)/g, "$1'$2");

      if (verbose) {
        console.log("Prompt:", prompt);
        console.log("\nChatGPT response:", res);
      }

      try {
        let output: any = JSON.parse(res);

        if (isListInput) {
          if (!Array.isArray(output)) {
            throw new Error("Output is not in an array of JSON objects");
          }
        } else {
          output = [output];
        }

        for (let index = 0; index < output.length; index++) {
          for (const key in output_format) {
            if (/<.*?>/.test(key)) {
              continue;
            }

            if (!(key in output[index])) {
              throw new Error(`${key} is missing in the JSON output`);
            }

            if (Array.isArray(output_format[key])) {
              const choices = output_format[key] as string[];
              if (Array.isArray(output[index][key])) {
                output[index][key] = output[index][key][0];
              }
              if (!choices.includes(output[index][key]) && default_category) {
                output[index][key] = default_category;
              }
              if (output[index][key].includes(":")) {
                output[index][key] = output[index][key].split(":")[0];
              }
            }
          }

          if (output_value_only) {
            output[index] = Object.values(output[index]);
            if (output[index].length === 1) {
              output[index] = output[index][0];
            }
          }
        }

        return isListInput ? output : output[0];
      } catch (e) {
        error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
        console.error("An exception occurred:", e);
        console.error("Invalid JSON format:", res);
      }
    } catch (error) {
      console.error("Error from OpenAI API:", error);
      error_msg = `\n\nError message from OpenAI API: ${error}`;
    }
  }

  return [];
}  */
