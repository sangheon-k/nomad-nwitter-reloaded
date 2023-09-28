import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src='/github-logo.svg' />
      Continue with Github
    </Button>
  );
}

const Button = styled.span`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
  color: black;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  background-color: white;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;
