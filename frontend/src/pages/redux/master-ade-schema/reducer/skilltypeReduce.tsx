import ActionType from "../actions/actionType";

const initialState ={
    skillType: [],
    message : '',
    status : '',
    refreshSkillType: '',
}


export default function SkillTypeReduce(state = initialState, action :any) {
        const {type , payload} = action;
        console.log(payload)
        switch (type) {
            case ActionType.SKILL_TYPE_RESPONSE:
            return {state , skillType:payload , refreshSkillType:true};
            case ActionType.CREATE_SKILLTYPE_RESPONSE:
            return {state , refreshSkillType:false};
            case ActionType.DELETE_SKILLTYPE_RESPONSE:
            return {state , refreshSkillType:false};
            case ActionType.UPDATE_SKILLTYPE_RESPONSE:
            return {state , refreshSkillType:false};
            default:
                return state;
            }
}