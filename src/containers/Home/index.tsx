import ChangeLanguage from "@components/ChangeLanguage";
import Input from "@components/Input";
import Header from "@components/Layout/Header";
import AWSTranslate from "@services/AWS";
import { ITranslateTextPayload } from "@services/AWS/interface";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import tw, { styled } from "twin.macro";

const HomeContainer = styled.div`
  ${tw`mb-20`}
`;

const HomeBox = styled.div`
  ${tw`container mx-auto`}
`;

const TranslateBox = styled.div`
  ${tw`w-full grid lg:grid-cols-2 gap-14`}
`;

interface IHome {}

const Home: FC<IHome> = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const timer = useRef<any>(null);

  useEffect(() => {
    if (input.trim() === "") return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLoading(true);

      let payload: ITranslateTextPayload = {
        Text: input,
        SourceLanguageCode: "auto",
        TargetLanguageCode: "en",
      };

      handleTranslateApi(payload);
    }, 300);
  }, [input]);

  useEffect(() => {
    if (input) return;
    setOutput("");
  }, [input]);

  const handleTranslateApi = (payload: ITranslateTextPayload) => {
    AWSTranslate.doTranslate(payload, (err, data) => {
      setOutput(data.TranslatedText);
      setLoading(false);
    });
  };

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <HomeContainer>
      <Header />
      <ChangeLanguage />
      <HomeBox>
        <TranslateBox>
          <Input
            value={input}
            onChange={handleChangeInput}
            micIcon
            volIcon
            placeholder="Vui lòng nhập văn bản vào đây ..."
          />
          <Input
            loading={loading}
            value={output}
            eventPoiter={false}
            volIcon
            placeholder=""
          />
        </TranslateBox>
      </HomeBox>
    </HomeContainer>
  );
};

export default Home;
