import React, { createContext, useReducer } from 'react';
import IMember from '../shared/interfaces/member.interface';

interface IMemberProvider {
  children: React.ReactNode;
}

enum EMemberKind {
  ADD_MEMBER = 'ADD_MEMBER',
  EDIT_MEMBER = 'EDIT_MEMBER',
  DELETE_MEMBER = 'DELETE_MEMBER',
}

interface IAction {
  type: string;
  value: IMember[];
}

interface IState {
  value: IMember[];
}

interface IInitialMemberState {
  value: IMember[];
}

const getLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('members') || '');
  } catch (error) {}
  return [];
};

const setLocalStorage = (value: IMember[]) => {
  localStorage.setItem('members', JSON.stringify(value));
};

const initialMemberState: IInitialMemberState = {
  value: getLocalStorage(),
};

const memberReducer = (state: IState, action: IAction): IState => {
  const { type, value } = action;
  switch (type) {
    case EMemberKind.ADD_MEMBER:
      //   setLocalStorage(value);
      console.log('value ', value);
      return { ...state, value };
    case EMemberKind.EDIT_MEMBER:
      setLocalStorage(value);
      return { ...state, value };
    // case EMemberKind.DELETE_MEMBER:
    //   break;
    default:
      return initialMemberState;
  }
};

export const MemberContext = createContext({});

const MemberProvider = ({ children }: IMemberProvider): JSX.Element => {
  const [store, dispatch] = useReducer(memberReducer, initialMemberState);

  return (
    <MemberContext.Provider value={[store, dispatch]}>
      {children}
    </MemberContext.Provider>
  );
};

export default MemberProvider;
