import ActionType from "../actions/actionType";

const initialState ={
    skillTemplete: [],
    message : '',
    status : '',
    refreshSkillTemplete : '',
}


export default function SkillTempeleteReduce(state = initialState, action :any) {
        const {type , payload} = action;
        console.log(payload)
        switch (type) {
            case ActionType.SKILL_TEMPLETE_RESPONSE:
            return {state , skillTemplete:payload ,status:payload.status, refreshSkillTemplete :true};
            case ActionType.DEL_SKILL_TEMPLETE_RESPONSE:
            return {state , refreshSkillTemplete :false};
            case ActionType.CREATE_SKILL_TEMPLETE_RESPONSE:
            return {state , refreshSkillTemplete :false};
            case ActionType.UPDATE_SKILL_TEMPLETE_RESPONSE:
            return {state , refreshSkillTemplete :false};
            default:
                return state;
            }
}