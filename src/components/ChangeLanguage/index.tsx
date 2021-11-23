import { ILanguage, languge } from "@common/constant/language";
import { Translate } from "iconsax-react";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import useToggleAndCloseVer2 from "src/hooks/useToggleAndCloseVer2";
import tw, { styled } from "twin.macro";

const ChangeLanguageContainer = styled.div`
  ${tw`relative my-14 max-w-[800px] mx-auto`}
`;
const ChangeLanguageBox = styled.div`
  ${tw`flex justify-between items-center px-10 py-3 shadow border rounded-lg`}
`;
const LanguageName = styled.span`
  ${tw`font-bold text-gray-600`}
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const IconBox = styled.div`
  ${tw`absolute`}
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LanguageBox = styled.div`
  ${tw`relative cursor-default w-[120px]`}
`;

const LanguageList = styled.ul`
  ${tw`absolute bg-white z-50 shadow`}
  width: 180px;
  max-height: 200px;
  left: 50%;
  top: calc(100% + 10px);
  transform: translateX(-50%);
  overflow-y: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    ${tw`bg-blue-500`}
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    ${tw`bg-blue-600`}
  }
`;
const LanguageItem = styled.li`
  ${tw`pl-4 pr-6 py-3 text-sm  hover:bg-gray-100`}
`;

interface IChangeLanguage {
  getSelectInput?: Dispatch<SetStateAction<any>>;
  getSelectOutput?: Dispatch<SetStateAction<any>>;
}

const ChangeLanguage: FC<IChangeLanguage> = ({
  getSelectInput,
  getSelectOutput,
}) => {
  const refInput = useRef<HTMLUListElement>(null);
  const refOutput = useRef<HTMLUListElement>(null);
  const [isActiveInput, setIsActiveInput] = useToggleAndCloseVer2(refInput);
  const [isActiveOutput, setIsActiveOutput] = useToggleAndCloseVer2(refOutput);
  const [selectInput, setSelectInput] = useState<ILanguage>(
    languge.find((value) => value.LanguageCode === "vi")!
  );
  const [selectOutput, setSelectOutput] = useState<ILanguage>(
    languge.find((value) => value.LanguageCode === "en")!
  );

  const handleChangeInput = (value: ILanguage) => {
    setSelectInput(value);
    setIsActiveInput(false);

    if (getSelectInput) {
      getSelectInput(value);
    }
  };

  const handleChangeOutput = (value: ILanguage) => {
    setSelectOutput(value);
    setIsActiveOutput(false);

    if (getSelectOutput) {
      getSelectOutput(value);
    }
  };

  const handleConvert = () => {
    let replate = selectInput;
    setSelectInput(selectOutput);
    setSelectOutput(replate);
  };

  return (
    <ChangeLanguageContainer>
      <ChangeLanguageBox>
        <LanguageBox>
          <LanguageName onClick={setIsActiveInput}>
            {selectInput?.Language}
          </LanguageName>
          {isActiveInput && (
            <LanguageList ref={refInput}>
              {languge.map((value) => (
                <LanguageItem
                  key={value.LanguageCode}
                  onClick={() => handleChangeInput(value)}
                >
                  {value.Language}
                </LanguageItem>
              ))}
            </LanguageList>
          )}
        </LanguageBox>

        <LanguageBox>
          <LanguageName onClick={setIsActiveOutput}>
            {selectOutput?.Language}
          </LanguageName>
          {isActiveOutput && (
            <LanguageList ref={refOutput}>
              {languge.map((value) => (
                <LanguageItem
                  key={value.LanguageCode}
                  onClick={() => handleChangeOutput(value)}
                >
                  {value.Language}
                </LanguageItem>
              ))}
            </LanguageList>
          )}
        </LanguageBox>
      </ChangeLanguageBox>
      <IconBox onClick={handleConvert}>
        <Translate size="28" color="#1db964" />
      </IconBox>
    </ChangeLanguageContainer>
  );
};

export default ChangeLanguage;
