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
  YourSpaceName,
  YourSpaceContainer,
  LogOut,
} from './styles';

Header.Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 25vh;
  max-height: 125px;
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
  background-color: ${({ theme }) => theme.colors.primary};
`;

export default function Header() {
  const { user } = useAuth();
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
            <Image src="/logo.png" alt="" width="90" height="90" />
          </Link>
        </ImageBox>
        {user ? (
          <YourSpaceContainer onClick={() => router.push('/Perfil')}>
            <YourSpace>
              {user?.image ? (
                <BsFillPersonFill style={{ height: '50px', width: '25px' }} />
              ) : (
                <BsFillPersonFill style={{ height: '50px', width: '25px' }} />
              )}
              <YourSpaceName>{user.name}</YourSpaceName>
            </YourSpace>
          </YourSpaceContainer>
        ) : (
          <LogOut onClick={() => router.push('/login')}>
            <Link href="/login">
              <FiLogIn size="30" color="#91ca6c" style={{ cursor: 'pointer' }} />
            </Link>
          </LogOut>
        )}
      </Header.Top>
    </Header.Wrapper>
  );
}
