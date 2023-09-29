import styled from 'styled-components';
import PostTweetForm from '../components/PostTweetForm';

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
