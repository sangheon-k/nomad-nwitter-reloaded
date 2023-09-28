import { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import GithubLoginButton from '../components/GithubLoginButton';
import GoogleLoginButton from '../components/GoogleLoginButton';
import * as Styled from '../components/auth-components';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const { email, password } = userInfo;
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.Title>Login 𝕏</Styled.Title>
      <Styled.Form onSubmit={onSubmit}>
        <Styled.Input
          onChange={onChange}
          name='email'
          placeholder='Email'
          type='email'
          required
        />
        <Styled.Input
          onChange={onChange}
          name='password'
          placeholder='Password'
          type='password'
          required
        />
        <Styled.Input
          type='submit'
          value={isLoading ? 'Loading...' : 'Login'}
        />
      </Styled.Form>
      {error !== '' ? <Styled.Error>{error}</Styled.Error> : null}
      <Styled.Switcher>
        Don't have an account?{' '}
        <Link to='/create-account'>Create one &rarr;</Link>
      </Styled.Switcher>
      <GithubLoginButton />
      <GoogleLoginButton />
    </Styled.Wrapper>
  );
}
