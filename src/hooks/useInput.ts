import React from 'react';
import { useReducer, useCallback } from 'react';

enum EActionKind {
    CHANGED_HANDLER = "CHANGED_HANDLER",
    BLUR_HANDLER = 'BLUR_HANDLER',
    FETCH_DATA = 'FETCH_DATA',
    RESET = 'RESET',
}

interface IAction {
    type: string;
    value?: string;
    touched?: boolean;
}

interface IState {
    value?: string;
    touched?: boolean;
}

const initialValuesState = {
    value: "",
    touched: false,
};

const valueReducer = (state: IState, action: IAction): IState => {
    const { type, value, touched } = action;
    switch (type) {
        case EActionKind.CHANGED_HANDLER:
            return { ...state, value };
        case EActionKind.BLUR_HANDLER:
            return { ...state, touched };
        case EActionKind.FETCH_DATA:
            return { ...state, value };
        case EActionKind.RESET:
            return { ...state, value, touched };
        default:
            return initialValuesState;
    }
};

const useInput = (validateValue: (value?: string) => boolean): any => {
    const [enteredValue, dispatcher] = useReducer(
        valueReducer,
        initialValuesState
    );
    const { value, touched } = enteredValue;

    const valueIsValid = validateValue(value);
    const hasError = !valueIsValid && touched;

    const valueChangedHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatcher({ type: EActionKind.CHANGED_HANDLER, value: event?.target?.value });
    };

    const valueBlurHandler = (): void => {
        dispatcher({ type: EActionKind.BLUR_HANDLER, touched: true });
    };

    const fetchValue = useCallback((data: string): void => {
        dispatcher({ type: EActionKind.FETCH_DATA, value: data });
    }, []);

    const resetValue = useCallback((): void => {
        dispatcher({ type: EActionKind.RESET, value: "", touched: false });
    }, []);

    return {
        value,
        isValid: valueIsValid,
        hasError,
        valueChangedHandler,
        valueBlurHandler,
        fetchValue,
        resetValue,
    };

};

export default useInput;
