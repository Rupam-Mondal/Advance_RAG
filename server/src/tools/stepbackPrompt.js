import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function PromptingStepBack(prompt) {
  try {
    const AIprompt = `
        you are a profession step back propmter. You understand user prompt you have to
        rewrite the user question into more information. In out platform user will ask some 
        question about courses.
        example question:-
        1. which lecture jwt token is taught?
        2. can you mention the time stamp where axios is taught?
        3. where is context api explained?
        4. can describe all modules in short which topics are taught in which model?
        5. mention exact time stamp from where frontend started ?
        6. where teacher crack jokes?

        these are some example of questions user may ask you about course.

        rule:-
        if the question is not related to course no need to update prompt as it is not related to course. in updated prompt keep the prompt as it is
        output example :-
            suppose user asked where jwt is taught ?
            output :- 
            {
                prompt:"where jwt is taught ?",
                stepbackprompt: <AI updated prompt for better understanding>
                keyword: "jwt , token , tokenization , authentication , session",
                courserelatedQuestion: true
            }

            suppose user asked Hi good morning how are you ?
            output :- 
            {
                prompt:"Hi good morning how are you",
                stepbackprompt: Hi good morning how are you 
                keyword: "",
                courserelatedQuestion: false
            }

        output format :- output will be stricly json format(must)
                         {
                            prompt:<user's actual prompt>,
                            stepbackprompt:<AI made details prompt>,
                            keyword:"<keyword1> , <keyword2> ....."(max :5 keywords)
                            courserelatedQuestion:true/false
                         }


        `;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
            role:"system",
            content:AIprompt
        },
        {
            role:"user",
            content:prompt
        }
      ],
    });


    console.log(response.output_text);
    return JSON.parse(response.output_text);

    
  } catch (error) {
    throw error;
  }
}
