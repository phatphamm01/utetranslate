import { FC } from "react";
import tw, { styled } from "twin.macro";

const HeaderContainer = styled.div`
  ${tw`py-3 bg-blue-500 shadow`}
`;
const HeaderBox = styled.div`
  ${tw`container mx-auto `}
`;
const Logo = styled.h1`
  ${tw`text-2xl font-extrabold text-white`}
`;

interface IHeader {}

const Header: FC<IHeader> = () => {
  return (
    <HeaderContainer>
      <HeaderBox>
        <Logo>UTE Translate</Logo>
      </HeaderBox>
    </HeaderContainer>
  );
};

export default Header;
