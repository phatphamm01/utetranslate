import * as AWSpro from "@aws-sdk/client-textract";

import AWS from "aws-sdk";
import { ITranslateTextPayload } from "./interface";
import { decode } from "base64-arraybuffer";
import {
  AnalyzeDocumentCommand,
  AnalyzeDocumentCommandInput,
} from "@aws-sdk/client-textract";
import { stringMap } from "aws-sdk/clients/backup";

AWS.config.region = "us-east-1";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-1:e8ecc73b-676d-46f8-89ba-e957866f07e6",
});

const AWSTranslate = (function () {
  const translate = new AWS.Translate({ region: AWS.config.region });
  const polly = new AWS.Polly();
  const textractClient = new AWSpro.Textract({
    region: "us-east-1",
    credentials: {
      accessKeyId: "AKIAS7PNU27UDS4IMPU5",
      secretAccessKey: "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",
    },
  });

  const doTranslate = (
    payload: ITranslateTextPayload,
    callback: (
      err: AWS.AWSError,
      data: AWS.Translate.TranslateTextResponse
    ) => void
  ) => {
    if (!payload.Text) {
      throw "Vui lòng nhập đầu vào";
    }

    translate.translateText(payload, callback);
  };

  const doTextract = async (image?: string) => {
    if (!image) return;

    try {
      let result = await fetch(image) // pass in some data-uri
        .then(function (response) {
          return response.arrayBuffer();
        });

      let buffer = new Uint8Array(result);

      let params: AnalyzeDocumentCommandInput = {
        Document: {
          Bytes: buffer,
        },
        FeatureTypes: ["TABLES", "FORMS"],
      };

      const response = await textractClient.analyzeDocument(params);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const doSynthesize = (text: string, languageCode: string, callback: any) => {
    var voiceId;
    switch (languageCode) {
      case "de":
        voiceId = "Marlene";
        break;
      case "en":
        voiceId = "Joanna";
        break;
      case "es":
        voiceId = "Penelope";
        break;
      case "fr":
        voiceId = "Celine";
        break;
      case "pt":
        voiceId = "Vitoria";
        break;
      default:
        voiceId = null;
        break;
    }
    if (!voiceId) {
      alert('Hiện tại polly chưa hỗ trợ ngôn ngữ: "' + languageCode + '"');
      return;
    }
    var params = {
      OutputFormat: "mp3",
      SampleRate: "8000",
      Text: text,
      TextType: "text",
      VoiceId: voiceId,
    };
    polly.synthesizeSpeech(params, (err, data) => {
      if (!data) return;

      var uInt8Array = new Uint8Array(data.AudioStream as any);
      var arrayBuffer = uInt8Array.buffer;
      var blob = new Blob([arrayBuffer]);
      var url = URL.createObjectURL(blob);
      let audioElement = new Audio([url] as any);
      callback(audioElement);
    });
  };
  return {
    doTranslate: doTranslate,
    doTextract: doTextract,
    doSynthesize: doSynthesize,
  };
})();

export default AWSTranslate;
