import {modalSetHeader, removeModal, setModal} from "@shared";
import {useAppDispatch, useAppSelector} from "../useAppStore";
import {useEffect} from "react";
export const useModal = (modalName: string)=> {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(modalSetHeader(modalName));
    }, []);
    const closeModal = () => {
        dispatch(removeModal());
    }
    const openModal = (modal: any) => {
        dispatch(setModal(modal));
    }
    const setHeader = (header: string) => {
        dispatch(modalSetHeader(header));
    }
    const header = useAppSelector((state)=>state.modalSliceReducer.header) || '';
    const Modal = useAppSelector((state)=>state.modalSliceReducer.component) || undefined;
    const isOpen = useAppSelector((state)=>state.modalSliceReducer.isOpen) || false;

    return {
        closeModal,
        openModal,
        Modal,
        isOpen,
        header,
        setHeader
    };
}
