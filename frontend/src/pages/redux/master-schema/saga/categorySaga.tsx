import apimethod from "@/pages/api/apimethod";
import { call, put } from 'redux-saga/effects';
import { getAllCategoryRes } from "../action/actionReducer";

function* handleGetAllCat():any {
    try {
        const result = yield call(apimethod.getCategory)
        yield put(getAllCategoryRes(result.data[0]))
        // console.log("saga cat");
    } catch (error) {
        yield put(getAllCategoryRes({message: error, status:400}))
    }
}

export { handleGetAllCat}