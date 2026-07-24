import { queryService } from "../service/queryService.js";
import { PromptingStepBack } from "../tools/stepbackPrompt.js";

export async function userQuestionController(req , res){
    try {
        const prompt = req?.body?.question;
        const docID = req?.body?.docID;
        const StepBackPrompt = await PromptingStepBack(prompt);
        const result = await queryService(StepBackPrompt , docID);
        return res.json({
            success: true,
            message:"Answer given successfully",
            data: result
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}