import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function GoogleLoginButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src='/google-logo.svg' />
      Sign in with Google
    </Button>
  );
}

const Button = styled.span`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
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
