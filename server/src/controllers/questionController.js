import { PromptingStepBack } from "../tools/stepbackPrompt.js";

export async function userQuestionController(req , res){
    try {
        const prompt = req?.body?.question;
        console.log(prompt)
        const StepBackPrompt = await PromptingStepBack(prompt);
        return res.json({
            data:StepBackPrompt
        })
    } catch (error) {
        
    }
}