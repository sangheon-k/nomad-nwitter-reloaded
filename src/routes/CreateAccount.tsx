import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import GithubLoginButton from '../components/GithubLoginButton';
import GoogleLoginButton from '../components/GoogleLoginButton';
import * as Styled from '../components/auth-components';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
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
      const { name, email, password } = userInfo;
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.Title>Join 𝕏</Styled.Title>
      <Styled.Form onSubmit={onSubmit}>
        <Styled.Input
          onChange={onChange}
          name='name'
          placeholder='Name'
          type='text'
          required
        />
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
          value={isLoading ? 'Loading...' : 'Create Account'}
        />
      </Styled.Form>
      {error !== '' ? <Styled.Error>{error}</Styled.Error> : null}
      <Styled.Switcher>
        Already have an account? <Link to='/login'>Log in &rarr;</Link>
      </Styled.Switcher>
      <GithubLoginButton />
      <GoogleLoginButton />
    </Styled.Wrapper>
  );
}
