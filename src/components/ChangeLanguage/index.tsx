import { Translate } from "iconsax-react";
import { FC } from "react";
import tw, { styled } from "twin.macro";

const ChangeLanguageContainer = styled.div`
  ${tw`relative my-14 max-w-[800px] mx-auto`}
`;
const ChangeLanguageBox = styled.div`
  ${tw`flex justify-between items-center px-10 py-3 shadow border rounded-lg`}
`;
const LanguageName = styled.span`
  ${tw`font-bold text-gray-600`}
`;
const IconBox = styled.div`
  ${tw`absolute`}
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface IChangeLanguage {}

const ChangeLanguage: FC<IChangeLanguage> = () => {
  return (
    <ChangeLanguageContainer>
      <ChangeLanguageBox>
        <LanguageName>Auto Detected</LanguageName>

        <LanguageName>Việt Nam</LanguageName>
      </ChangeLanguageBox>
      <IconBox>
        <Translate size="28" color="#1db964" />
      </IconBox>
    </ChangeLanguageContainer>
  );
};

export default ChangeLanguage;
