import styled from 'styled-components';
import { auth } from '../firebase';
import PostTweetForm from '../components/PostTweetForm';

export default function Home() {
  const logout = () => {
    auth.signOut();
  };

  return (
    <Wrapper>
      <button onClick={logout}>Log Out</button>
      <PostTweetForm />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
