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
  payload: any;
}

interface IState {
  value: IMember[];
}

interface IInitialMemberState {
  value: IMember[];
}

const getLocalStorage = (): IMember[] => {
  try {
    return JSON.parse(localStorage.getItem('members') || '');
  } catch (error) {}
  return [];
};

const setLocalStorage = (value: IMember[]): void => {
  localStorage.setItem('members', JSON.stringify(value));
};

const initialMemberState: IInitialMemberState = {
  value: getLocalStorage(),
};

const memberReducer = (state: IState, action: IAction): IState => {
  const { type, payload }: IAction = action;
  switch (type) {
    case EMemberKind.ADD_MEMBER:
      let newMember: IMember[] = [...state.value];
      const i = newMember.findIndex((member) => member.id === payload.id);
      if (i > -1) newMember[i] = payload;
      else newMember = [...state.value, payload];
      setLocalStorage(newMember);
      return { ...state, value: newMember };
    case EMemberKind.DELETE_MEMBER:
      const deletedMembers: IMember[] = [
        ...(state?.value).filter(
          ({ id: memberId }) => memberId !== payload.memberId
        ),
      ];
      setLocalStorage(deletedMembers);
      return { ...state, value: deletedMembers };
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
