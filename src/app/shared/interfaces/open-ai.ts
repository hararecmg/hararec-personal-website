import { OpenAIGPT_3Model, OpenAICodexModel, OpenAIModerationModel } from '../types/open-ai';

export interface OpenAIRequest {
    model:             OpenAIGPT_3Model | OpenAICodexModel | OpenAIModerationModel;
    prompt:            string;
    temperature?:       number;
    max_tokens?:        number;
    top_p?:             number;
    frequency_penalty?: number;
    presence_penalty?:  number;
    n?: number;
}

export interface OpenAIResponse {
    id:      string;
    object?:  string;
    created: number;
    model:   string;
    choices: Choice[];
    usage?:   Usage;
}

export interface Choice {
    text:          string;
    index:         number;
    logprobs?:      null;
    finish_reason?: string;
}

export interface Usage {
    prompt_tokens:     number;
    completion_tokens: number;
    total_tokens:      number;
}

export interface OpenAIModerationRequest {
    input: string;
    model?: string;
}

export interface OpenAIModerationResponse {
    id:      string;
    model?:   string;
    results: Result[];
}

export interface Result {
    flagged:         boolean;
    categories:      Categories;
    category_scores?: CategoryScores;
}

export interface Categories {
    sexual:             boolean;
    hate:               boolean;
    violence:           boolean;
    "self-harm":        boolean;
    "sexual/minors":    boolean;
    "hate/threatening": boolean;
    "violence/graphic": boolean;
}

export interface CategoryScores {
    sexual?:             number;
    hate?:               number;
    violence?:           number;
    "self-harm"?:        number;
    "sexual/minors"?:    number;
    "hate/threatening"?: number;
    "violence/graphic"?: number;
}

// temperature: controla la creatividad de la respuesta. Cuanto mayor sea el valor de temperatura, más creativa será la respuesta. Un valor más bajo hará que la respuesta sea más predecible. En este caso, se ha establecido en 0.7, lo que sugiere una respuesta relativamente creativa pero no completamente aleatoria.

// max_tokens: controla el número máximo de tokens (palabras y signos de puntuación) en la respuesta. En este caso, se ha establecido en 256, lo que indica que la respuesta no debe ser demasiado larga.

// top_p: controla la distribución de probabilidad de los tokens en la respuesta. Un valor de 1 significa que se seleccionará el token con la probabilidad más alta. En este caso, se ha establecido en 1, lo que indica que se debe seleccionar el token con la probabilidad más alta.

// frequency_penalty: ajusta la frecuencia de las palabras repetidas en la respuesta. Un valor más alto penaliza las palabras repetidas y un valor más bajo las favorece. En este caso, se ha establecido en 0, lo que indica que no se debe penalizar las palabras repetidas.

// presence_penalty: ajusta la probabilidad de que se repita una respuesta anterior. Un valor más alto favorece las respuestas nuevas, y un valor más bajo favorece las respuestas similares a las anteriores. En este caso, se ha establecido en 0, lo que indica que no se debe penalizar las respuestas similares a las anteriores.

// {
//     "model": "text-davinci-003",
//     "prompt": "Product description: A home milkshake maker\nSeed words: fast, healthy, compact.\nProduct names: HomeShaker, Fit Shaker, QuickShake, Shake Maker\n\nProduct description: A pair of shoes that can fit any foot size.\nSeed words: adaptable, fit, omni-fit.",
//     "temperature": 0.8,
//     "max_tokens": 60,
//     "top_p": 1.0,
//     "frequency_penalty": 0.0,
//     "presence_penalty": 0.0
//   }

// To parse this data:
//
//   import { Convert, OpenAIModerationResponse } from "./file";
//
//   const openAIModerationResponse = Convert.toOpenAIModerationResponse(json);
