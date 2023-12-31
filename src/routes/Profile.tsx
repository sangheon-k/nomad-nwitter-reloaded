import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebase';
import styled from 'styled-components';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { ITweet } from '../components/TimeLine';
import Tweet from '../components/Tweet';

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [name, setName] = useState(user?.displayName ?? 'Anonymous');
  const [editMode, setEditMode] = useState(false);

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxSize = 5 * 1024 * 1024;
    if (!user) return;
    if (!files || files.length !== 1) return;
    if (files[0].size > maxSize) {
      alert('첨부파일은 5MB 미만의 파일만 업로드 가능합니다.');
      return;
    }

    const file = files[0];
    const locationRef = ref(storage, `avatars/${user.uid}`);
    const result = await uploadBytes(locationRef, file);
    const avatarUrl = await getDownloadURL(result.ref);
    setAvatar(avatarUrl);
    await updateProfile(user, { photoURL: avatarUrl });
  };

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, 'tweets'),
      where('userId', '==', user?.uid),
      orderBy('createdAt', 'desc'),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { photoUrl, tweet, userId, username, createdAt } = doc.data();
      return { id: doc.id, photoUrl, tweet, userId, username, createdAt };
    });
    setTweets(tweets);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onEditNameClick = async () => {
    if (!user) return;
    if (!editMode) setEditMode(true);
    if (editMode) {
      try {
        await updateProfile(user, { displayName: name });
      } catch (e) {
        console.log(e);
      } finally {
        setEditMode(false);
      }
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrapper>
      <AvatarUpload htmlFor='avatar'>
        {avatar ? (
          <AvatarImg src={avatar} />
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-5 h-5'
          >
            <path d='M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z' />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id='avatar'
        type='file'
        accept='image/*'
      />
      {editMode ? (
        <NameInput onChange={onNameChange} type='text' value={name} />
      ) : (
        <Name>{name ?? 'Anonymous'}</Name>
      )}
      <EditButton onClick={onEditNameClick}>
        {editMode ? 'Save' : 'Edit'}
      </EditButton>

      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const AvatarUpload = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  svg {
    width: 50px;
  }
`;
const AvatarImg = styled.img`
  width: 100%;
`;

const AvatarInput = styled.input`
  display: none;
`;

const NameInput = styled.input``;

const Name = styled.span`
  font-size: 22px;
`;

const EditButton = styled.button``;

const Tweets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
