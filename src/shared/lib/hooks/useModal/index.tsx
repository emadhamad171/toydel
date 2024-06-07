import {
    modalGoBack,
    modalHide,
    modalSetAnimateFromLeft,
    modalSetBackgroundColor,
    modalSetHeader,
    removeModal,
    setModal
} from "@shared";
import {useAppDispatch, useAppSelector} from "../useAppStore";
import {useEffect} from "react";
export const useModal = (modalName=" ")=> {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(modalName)
            dispatch(modalSetHeader(modalName));
    }, []);

    const closeModal = () => {
        dispatch(removeModal());
    }
    const hideModal = () => {
        dispatch(modalHide())
    }
    const setHeader = (header: string) => {
        dispatch(modalSetHeader(header));
    }
    const goBack = () => {
        dispatch(modalGoBack());
    }
    const openModal = (modal: any, isFromLeft=true, backgroundColor='#fff') => {
        dispatch(modalSetBackgroundColor(backgroundColor));
        dispatch(modalSetAnimateFromLeft(isFromLeft));
        dispatch(setModal(modal));
    }

    const header = useAppSelector((state)=>state.modal.header) || '';
    const Modal = useAppSelector((state)=>state.modal.component) || undefined;
    const isOpen = useAppSelector((state)=>state.modal.isOpen) || false;
    const isAnimateFromLeft = useAppSelector(state=>state.modal.animateFromLeft);

    return {
        closeModal,
        openModal,
        hideModal,
        Modal,
        isOpen,
        header,
        setHeader,
        goBack,
        isAnimateFromLeft
    };
}
