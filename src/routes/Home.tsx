import styled from 'styled-components';
import PostTweetForm from '../components/PostTweetForm';
import TimeLine from '../components/TimeLine';

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
      <TimeLine />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
`;
