import React, { useState, useContext } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import IMember from '../shared/interfaces/member.interface';
import renderGender from '../shared/utilities/renderGender';
import MembershipModal from '../components/MembershipModal';
import { MemberContext } from '../store/Context';

const ManagementPage = (): JSX.Element => {
  const [state] = useContext<any>(MemberContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [memberId, setMemberId] = useState<string>('');
  const members = state?.value || [];

  const renderTableRow = (member: IMember): React.ReactNode => {
    const { id, fullName, username, email, address, gender } = member;

    const onEditHandler = (memberId: string) => {
      setShowModal(true);
      setMemberId(memberId);
    };

    const onDeleteHandler = (memberId: string) => {};

    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{fullName}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td>{address}</td>
        <td>{renderGender(gender)}</td>
        <td>
          <Button variant='warning' onClick={onEditHandler.bind(null, id)}>
            Edit
          </Button>
          <Button
            className='ms-2'
            variant='danger'
            onClick={onDeleteHandler.bind(null, id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  };

  const showModalHandler = (): void => {
    setMemberId('');
    setShowModal(true);
  };

  const closeModalHandler = (): void => {
    setShowModal(false);
  };

  return (
    <Row>
      <Col md={12}>
        <Button
          className='float-end'
          variant='primary'
          onClick={showModalHandler}
        >
          Add member
        </Button>
        <MembershipModal
          show={showModal}
          memberId={memberId}
          onClose={closeModalHandler}
        />
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Full name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Events</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member: IMember) => renderTableRow(member))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ManagementPage;
