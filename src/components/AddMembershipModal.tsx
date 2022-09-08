import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import useInput from '../hooks/useInput';
import ModalOverlay from './ModalOverlay';
import {
  checkNotEmpty,
  checkEmail,
  checkSelect,
} from '../shared/utilities/validate';

interface IAddMembershipModal {
  show: boolean;
  onClose: () => void;
}

const AddMembershipModal = ({
  show,
  onClose,
}: IAddMembershipModal): JSX.Element => {
  const {
    value: enteredFullNameValue,
    isValid: isValidName,
    hasError: nameHasError,
    valueChangedHandler: fullNameInputChangedHandler,
    valueBlurHandler: fullNameInputBlurHandler,
    resetValue: resetFullNameValue,
  } = useInput((value) => checkNotEmpty(value || ''));

  const {
    value: enteredUsernameValue,
    isValid: isValidUsername,
    hasError: usernameHasError,
    valueChangedHandler: usernameInputChangedHandler,
    valueBlurHandler: usernameInputBlurHandler,
    resetValue: resetUsernameValue,
  } = useInput((value) => checkNotEmpty(value || ''));

  const {
    value: enteredEmailValue,
    isValid: isValidEmail,
    hasError: emailHasError,
    valueChangedHandler: emailInputChangedHandler,
    valueBlurHandler: emailInputBlurHandler,
    resetValue: resetEmailValue,
  } = useInput((value) => checkEmail(value || ''));

  const {
    value: enteredGender,
    isValid: isValidGender,
    hasError: genderHasError,
    valueChangedHandler: genderInputChangedHandler,
    valueBlurHandler: genderInputBlurHandler,
    resetValue: resetGenderValue,
  } = useInput((value) => checkSelect(value));

  const saveMemberHandler = (event: any) => {
    onClose();
    console.log(enteredGender);
    resetFullNameValue();
    resetUsernameValue();
    resetEmailValue();
    resetGenderValue();
  };

  let formIsInValid = true;

  if (isValidName && isValidUsername && isValidEmail && isValidGender) {
    formIsInValid = false;
  }

  return (
    <ModalOverlay title='Add Member' show={show} size='lg' backdrop='static'>
      <ModalOverlay.Body>
        <Form validated={!formIsInValid}>
          <Form.Group className='mb-3' controlId='fullName'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter full name'
              id='fullName'
              required
              value={enteredFullNameValue}
              onChange={fullNameInputChangedHandler}
              onBlur={fullNameInputBlurHandler}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter username'
                  id='username'
                  required
                  value={enteredUsernameValue}
                  onChange={usernameInputChangedHandler}
                  onBlur={usernameInputBlurHandler}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  id='email'
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
              <Form.Group className='mb-3' controlId='dateOfBirth'>
                <Form.Label>date of birth</Form.Label>
                <Form.Control
                  type='date'
                  id='dateOfBirth'
                  placeholder='Enter date of birth'
                  onChange={(event) => console.log(event.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                aria-label='gender'
                id='gender'
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
      <ModalOverlay.Footer onClose={onClose}>
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

export default AddMembershipModal;
