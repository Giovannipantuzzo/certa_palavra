import Image from 'next/image';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import {
  ImageBox,
  YourSpace,
  YourSpaceContainer,
  LogOut,
} from './styles';

Header.Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 25vh;
  flex-direction: column;
  @media (max-width: 400px) {
    height: 21vh;
  }
`;

Header.Top = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 75%;
  background-color: ${({ theme }) => theme.colors.lightGreen};
`;

export default function Header() {
  const { logout, user } = useAuth();
  const router = useRouter();

  // const handleKeypress = (e) => {
  //   if (e.key === 'Enter') {
  //     handleSubmit();
  //   }
  // };

  return (
    <Header.Wrapper>
      <Header.Top>
        <ImageBox>
          <Link href="/Home">
            <Image src="/logo.png" alt="" width="120" height="150" />
          </Link>
        </ImageBox>
        {user ? (
          <YourSpaceContainer onClick={() => router.push('/Perfil')}>
            <YourSpace>
              <BsFillPersonFill />
            </YourSpace>
          </YourSpaceContainer>
        ) : (
          <LogOut onClick={logout}>
            <Link href="/login">
              <FiLogIn size="35" color="#004e7b" style={{ cursor: 'pointer' }} />
            </Link>
          </LogOut>
        )}
      </Header.Top>
    </Header.Wrapper>
  );
}
