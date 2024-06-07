import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface modalSliceType {
    component: any,
    isOpen: boolean,
    header: string,
    prevModal: Array<{component: any, header: string}>,
    animateFromLeft?: boolean
    backgroundColor: string
}

const initialState: modalSliceType = {
    component: null,
    isOpen: false,
    header: '',
    prevModal: [],
    animateFromLeft: true,
    backgroundColor: '#fff'
}
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state: modalSliceType, action: PayloadAction<any>)=>{
            if(!state.isOpen){
                state.isOpen = true;
            }
            state.component = action.payload;
            state.prevModal.push({component: action.payload, header: state.header});

        },
        modalSetBackgroundColor: (state: modalSliceType, action: PayloadAction<string>)=>{
          state.backgroundColor = action.payload;
        },
        modalSetHeader: (state: modalSliceType, action: PayloadAction<string>)=>{
            state.header = action.payload;
        },
        removeModal: (state: modalSliceType) => {
            state.component = null;
            state.isOpen = false;
            state.header = '';
            state.prevModal = [];
        },
        modalHide: (state: modalSliceType) => {
          state.isOpen = false;
        },
        modalShow: (state: modalSliceType)=>{
            state.isOpen = true;
        },
        modalGoBack: (state) => {
            state.prevModal.pop();
            const prevModal = state.prevModal.at(-1);

            state.component = prevModal.component;
            state.header = prevModal.header;
        },
        modalSetAnimateFromLeft: (state: modalSliceType, action: PayloadAction<boolean>)=>{
            state.animateFromLeft = action.payload;
        }
    }
})
export const {modalSetAnimateFromLeft,modalSetBackgroundColor, modalHide, modalShow, modalGoBack, setModal, removeModal, modalSetHeader} = modalSlice.actions;
export default modalSlice.reducer;
