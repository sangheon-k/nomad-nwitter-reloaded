import styled from 'styled-components';
import { ITweet } from './TimeLine';
import { auth, db, storage } from '../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useState } from 'react';

export default function Tweet({
  username,
  photoUrl,
  tweet,
  userId,
  id,
}: ITweet) {
  const [isLoading, setLoading] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState('');
  const user = auth.currentUser;

  const onDelete = async () => {
    const ok = confirm('Are you sure you want to delete this tweet?');
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, 'tweets', id));
      if (photoUrl) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value);
  };

  const onEdit = async () => {
    if (user?.uid !== userId) return;

    if (!isEditing) {
      setEditTweet(tweet);
      setEditing(true);
    }

    if (isEditing) {
      try {
        setLoading(true);
        await updateDoc(doc(db, 'tweets', id), { tweet: editTweet });
        setEditing(false);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {isEditing ? (
          <PayloadTextArea
            rows={4}
            maxLength={180}
            onChange={onChangeEdit}
            value={editTweet}
          />
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {user?.uid === userId ? (
          <ButtonWrap>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
            <EditButton onClick={onEdit}>
              {!isEditing ? 'EDIT' : isLoading ? 'Updating...' : 'Confirm'}
            </EditButton>
          </ButtonWrap>
        ) : null}
      </Column>
      <Column>{photoUrl ? <Photo src={photoUrl} /> : null}</Column>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const PayloadTextArea = styled.textarea`
  border: 2px solid white;
  margin: 10px 0;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 16px;
  color: white;
  border: 2px solid #1d9bf0;
  background-color: black;
  width: 100%;
  resize: none;
  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const Payload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 7px;
`;

const DeleteButton = styled.button`
  background-color: crimson;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled(DeleteButton)`
  background-color: #fff;
  color: black;
`;
