import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts'; // Corrected import path
import { LLMChain } from 'langchain/chains'; // This might be correct, leaving as is for now
import { BaseLanguageModel } from '@langchain/core/language_models/base'; // Corrected import path

const defaultPrompt = `К какой категории из списка: {categories} относится текст: "{text}"? Ответь только категорией.`;

export async function classifyText(
  llm: BaseLanguageModel,
  text: string,
  categories: string[],
  promptTemplate: string = defaultPrompt
): Promise<string> {
  const prompt = new PromptTemplate({
    template: promptTemplate,
    inputVariables: ['text', 'categories'],
  });

  const chain = new LLMChain({ llm, prompt });

  const result = await chain.call({
    text,
    categories: categories.join(', '),
  });

  const output = result?.text?.trim() || '';
  return output;
}

// Пример инициализации LLM
export function getDefaultLLM(): BaseLanguageModel {
  return new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
}
