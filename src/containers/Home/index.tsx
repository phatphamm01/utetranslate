import { ILanguage } from "@common/constant/language";
import ChangeLanguage from "@components/ChangeLanguage";
import Input from "@components/Input";
import Header from "@components/Layout/Header";
import AWSTranslate from "@services/AWS";
import { ITranslateTextPayload } from "@services/AWS/interface";
import { useRouter } from "next/dist/client/router";
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
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [selectInput, setSelectInput] = useState<ILanguage>();
  const [selectOutput, setSelectOutput] = useState<ILanguage>();

  const timer = useRef<any>(null);

  useEffect(() => {
    let url = new URL(location.origin + router.asPath);
    let text = url.searchParams.get("text") || "Hello world!";
    setInput(text);
  }, []);

  useEffect(() => {
    handleCallApi();
    let {
      query: { from, to, text },
    } = router;

    if (input === "") {
      router.push({ query: { from: from, to: to } });
      return;
    }

    router.push({ query: { from: from, to: to, text: input } });
  }, [input]);

  useEffect(() => {
    handleCallApi();
  }, [selectInput]);

  useEffect(() => {
    handleCallApi();
  }, [selectOutput]);

  useEffect(() => {
    if (input) return;
    setOutput("");
  }, [input]);

  const handleCallApi = () => {
    if (input.trim() === "") return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLoading(true);

      let payload: ITranslateTextPayload = {
        Text: input,
        SourceLanguageCode: selectInput?.LanguageCode || "auto",
        TargetLanguageCode: selectOutput?.LanguageCode || "vi",
      };

      handleTranslateApi(payload);
    }, 300);
  };

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
      <ChangeLanguage
        getSelectInput={setSelectInput}
        getSelectOutput={setSelectOutput}
      />
      <HomeBox>
        <TranslateBox>
          <Input
            value={input}
            onChange={handleChangeInput}
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
