import React, { useContext, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import useInput from '../hooks/useInput';
import ModalOverlay from './ModalOverlay';
import {
  checkNotEmpty,
  checkEmail,
  checkSelect,
} from '../shared/utilities/validate';
import IMember from '../shared/interfaces/member.interface';
import classNames from 'classnames';
import { camalize } from '../shared/utilities/stringUtils';
import { MemberContext } from '../store/Context';

interface IMembershipModal {
  show: boolean;
  memberId?: string;
  onClose: () => void;
}

const MembershipModal = ({
  show,
  memberId,
  onClose,
}: IMembershipModal): JSX.Element => {
  const [state, dispatch] = useContext<any>(MemberContext);

  const {
    value: enteredFullNameValue,
    isValid: isValidName,
    hasError: nameHasError,
    valueChangedHandler: fullNameInputChangedHandler,
    valueBlurHandler: fullNameInputBlurHandler,
    resetValue: resetFullNameValue,
    fetchValue: fetchFullNameValue,
  } = useInput((value) => checkNotEmpty(value || ''));

  const {
    value: enteredUsernameValue,
    isValid: isValidUsername,
    hasError: usernameHasError,
    valueChangedHandler: usernameInputChangedHandler,
    valueBlurHandler: usernameInputBlurHandler,
    resetValue: resetUsernameValue,
    fetchValue: fetchUsernameValue,
  } = useInput((value) => checkNotEmpty(value || ''));

  const {
    value: enteredEmailValue,
    isValid: isValidEmail,
    hasError: emailHasError,
    valueChangedHandler: emailInputChangedHandler,
    valueBlurHandler: emailInputBlurHandler,
    resetValue: resetEmailValue,
    fetchValue: fetchEmailValue,
  } = useInput((value) => checkEmail(value || ''));

  const {
    value: enteredAddressValue,
    isValid: isValidAddress,
    hasError: addressHasError,
    valueChangedHandler: addressInputChangedHandler,
    valueBlurHandler: addressInputBlurHandler,
    resetValue: resetAddressValue,
    fetchValue: fetchAddressValue,
  } = useInput((value) => checkNotEmpty(value || ''));

  const {
    value: enteredGender,
    isValid: isValidGender,
    hasError: genderHasError,
    valueChangedHandler: genderInputChangedHandler,
    valueBlurHandler: genderInputBlurHandler,
    resetValue: resetGenderValue,
    fetchValue: fetchGenderValue,
  } = useInput((value) => checkSelect(value));

  const closeModalHandler = (): void => {
    onClose();
    resetFullNameValue();
    resetUsernameValue();
    resetEmailValue();
    resetAddressValue();
    resetGenderValue();
  };

  const saveMemberHandler = (): void => {
    const newMember: IMember = {
      id: memberId || Math.floor(Math.random() * Date.now()).toString(),
      fullName: enteredFullNameValue,
      username: enteredUsernameValue,
      email: enteredEmailValue,
      address: enteredAddressValue,
      gender: parseInt(enteredGender) || 0,
    };
    closeModalHandler();
    dispatch({
      type: 'ADD_EDIT_MEMBER',
      payload: newMember,
    });
  };

  useEffect(() => {
    if (!memberId) {
      return;
    }
    const findMemberById: IMember = state.value.find(
      (member: IMember) => member.id === memberId
    );

    if (!findMemberById) {
      return;
    }

    const { fullName, username, email, address, gender } = findMemberById;
    fetchFullNameValue(fullName);
    fetchUsernameValue(username);
    fetchEmailValue(email);
    fetchAddressValue(address);
    fetchGenderValue(gender);
  }, [
    show,
    memberId,
    fetchFullNameValue,
    fetchUsernameValue,
    fetchEmailValue,
    fetchAddressValue,
    fetchGenderValue,
    state.value,
  ]);

  const title: string = memberId ? 'Edit Member' : 'Add Member';
  let formIsInValid: boolean = true;

  if (
    isValidName &&
    isValidUsername &&
    isValidEmail &&
    isValidGender &&
    isValidAddress
  ) {
    formIsInValid = false;
  }

  return (
    <ModalOverlay title={title} show={show} size='lg' backdrop='static'>
      <ModalOverlay.Body>
        <Form validated={!formIsInValid}>
          {memberId && (
            <Form.Control type='text' value={memberId} hidden readOnly />
          )}
          <Form.Group
            className='mb-3'
            controlId={`fullName-${camalize(title)}`}
          >
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              className={classNames({ 'is-invalid': nameHasError })}
              type='text'
              placeholder='Enter full name'
              required
              value={enteredFullNameValue}
              onChange={fullNameInputChangedHandler}
              onBlur={fullNameInputBlurHandler}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group
                className='mb-3'
                controlId={`username-${camalize(title)}`}
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  className={classNames({ 'is-invalid': usernameHasError })}
                  type='text'
                  placeholder='Enter username'
                  required
                  value={enteredUsernameValue}
                  onChange={usernameInputChangedHandler}
                  onBlur={usernameInputBlurHandler}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className='mb-3'
                controlId={`email-${camalize(title)}`}
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className={classNames({ 'is-invalid': emailHasError })}
                  type='email'
                  placeholder='Enter email'
                  required
                  value={enteredEmailValue}
                  onChange={emailInputChangedHandler}
                  onBlur={emailInputBlurHandler}
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId={`address-${camalize(title)}`}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  className={classNames({ 'is-invalid': addressHasError })}
                  type='text'
                  aria-label='address'
                  placeholder='Enter address'
                  value={enteredAddressValue}
                  onChange={addressInputChangedHandler}
                  onBlur={addressInputBlurHandler}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                className={classNames({ 'is-invalid': genderHasError })}
                aria-label='gender'
                value={enteredGender}
                onChange={genderInputChangedHandler}
                onBlur={genderInputBlurHandler}
              >
                <option value='0'>Select your gender</option>
                <option value='1'>Male 🍆</option>
                <option value='2'>Femal 🍑</option>
                <option value='3'>LGBT 🏳️‍🌈</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>
      </ModalOverlay.Body>
      <ModalOverlay.Footer onClose={closeModalHandler}>
        <Button
          variant='success'
          type='submit'
          onClick={saveMemberHandler}
          disabled={formIsInValid}
        >
          Save
        </Button>
      </ModalOverlay.Footer>
    </ModalOverlay>
  );
};

export default MembershipModal;
