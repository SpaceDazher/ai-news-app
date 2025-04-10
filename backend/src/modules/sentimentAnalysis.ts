import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts'; // Corrected import path
import { LLMChain } from 'langchain/chains'; // This might be correct, leaving as is for now
import { BaseLanguageModel } from '@langchain/core/language_models/base'; // Corrected import path

const defaultPrompt = `Определи тональность текста: "{text}". Ответь одним словом: positive, negative или neutral.`;

export async function analyzeSentiment(
  llm: BaseLanguageModel,
  text: string,
  promptTemplate: string = defaultPrompt
): Promise<string> {
  const prompt = new PromptTemplate({
    template: promptTemplate,
    inputVariables: ['text'],
  });

  const chain = new LLMChain({ llm, prompt });

  const result = await chain.call({ text });

  const output = result?.text?.trim().toLowerCase() || '';
  return output;
}

export function getDefaultLLM(): BaseLanguageModel {
  return new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
}
