import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface modalSliceType {
    component: any,
    isOpen: boolean,
    header: string,
}

const initialState: modalSliceType = {
    component: null,
    isOpen: false,
    header: ''
}
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state: modalSliceType, action: PayloadAction<any>)=>{
            state.component = action.payload;
            state.isOpen = true;
        },
        modalSetHeader: (state: modalSliceType, action: PayloadAction<string>)=>{
            state.header = action.payload;
        },
        removeModal: (state: modalSliceType) => {
            state.component = null;
            state.isOpen = false;
            state.header = '';
        }
    }
})
export const {setModal, removeModal, modalSetHeader} = modalSlice.actions;
export default modalSlice.reducer;
