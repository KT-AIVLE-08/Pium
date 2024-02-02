/** @jsxImportSource @emotion/react */

import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import {
  scenarioCategoryStyle,
  scenarioGuideMsgStyle,
  scenarioHeaderWrapperStyle,
  scenarioMikeBtnStyle,
  scenarioMultipleExampleStyle,
  scenarioMultipleExampleWapperStyle,
  scenarioQuestionBackgroundImgStyle,
  scenarioQuestionStyle,
  scenarioQuestionWrapperStyle,
  scenarioRemainCountWrapperStyle,
  scenarioRetryMsgStyle,
  scenarioSupportBtnColoredStyle,
  scenarioSupportBtnStyle,
} from "./style";

import { COLORS } from "styles/colors";
import { resultState, userState } from "store/userState";
import { LINK } from "utils/constants";

export const ScenarioPage = () => {
  const nav = useNavigate()

  const [result, setResult] = useRecoilState(resultState);
  const [user, setUser] = useRecoilState(userState);
  const [urlData, setUrlData] = useState(null);
  const [showGuide, setShowGuide] = useState(false); // 가이드 메시지 보여주는 여부
  const [questionNum, setQuestionNum] = useState(-1); // 문항 번호
  const [questions, setQuestions] = useState([]); // 문항 리스트
  const [audio, setAudio] = useState(null); // 질문 음성 파일
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [answerAudioBlob, setAnswerAudioBlob] = useState(null);
  const [multiple, setMultiple] = useState(false);
  const [remain, setRemain] = useState(2);
  const [url, setUrl] = useState(null);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const retryMsgRef = useRef();

  //
  useEffect(() => {
    const path = window.location.pathname.split("/")
    // 처음 렌더링 될 때, 문제 질문들과, 각 문제의 객관식 답안들을 api 요청해서 받아옴
    fetch(
      `https://pium.site/api/qa/${path[path.length - 1]}`,
      {
        credentials: "include",
        method: "get",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuestions(data.qstList);
        setQuestionNum(0);
      });
  }, []);

  useEffect(() => {
    if (questionNum >= 0) {
      let path = questions[questionNum].qst_voice_url;
      if(path[0] === '.') {
        path = path.slice(16);
        setUrl(path);
      };
      console.log(path);
      setAudio(new Audio(path));
    }
  }, [questionNum, questions])

  console.log(audio);

  useEffect(() => {
    // 오디오 파일이 설정되면 재생
    if (audio) {
      audio.volume = 1;
      setTimeout(() => {
        audio.autoplay = true;
        audio.load();
      }, 300);
    }
  }, [audio]);

  // STT
  const handleClickMikeBtn = async () => {
    // 재시도 메시지가 display: "inline" 상태면 "none" 으로 변경
    if (retryMsgRef.current.style.display === "inline") {
      retryMsgRef.current.style.display = "none";
    }

    // recognitionRef.current가 선언 되어 있는지 확인, 없다면 생성(만들면 다시 안만듬)
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "ko-KR";
      recognitionRef.current.continuous = true;

      recognitionRef.current.onstart = () => {
        setTranscript("");
        setListening(true);
      };

      recognitionRef.current.onend = () => {
        stopRecording();
      };

      recognitionRef.current.onresult = (event) => {
        const { transcript } = event.results[event.results.length - 1][0];
        setTranscript((prevTranscript) => prevTranscript + transcript + " ");
      };
    }

    try {
      if (!listening) {
        setTimeout(() => {
          setShowGuide(!showGuide);
        }, 1000);

        // 마이크 권한 요청 및 음성 녹음 시작
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        mediaRecorderRef.current.onstop = () => {
          // 음성 파일 생성
          const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
          setAnswerAudioBlob(blob);

          setListening(false);
          // 음성 녹음 스트림 중지
          stream.getTracks().forEach((track) => track.stop());
          // recognition 중지
          recognitionRef.current.stop();
          // audioChunks 배열 초기화
          audioChunksRef.current = [];
        };

        // 음성 인식 시작
        recognitionRef.current.start();
        // 녹음 시작
        mediaRecorderRef.current.start();
      } else {
        stopListeningAndRecording();
      }
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopListeningAndRecording = () => {
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
      setShowGuide(!showGuide);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleClickSubmitBtn = async () => {
    if (!listening && transcript !== "") {
      // 결과 페이지를 위한 질문과 응답 recoil resultState 에 저장
      setResult([...result, {
        question: questions[questionNum].qst_text_detail,
        answer: transcript,
      }]);
  
      const formData = new FormData();
      const date = new Date().toString();
      const today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      var hour = today.getHours();
      var minute = today.getMinutes();
      var second = today.getSeconds();
  
      formData.append('audio', answerAudioBlob, `${year}_${month}_${day}_${hour}_${minute}_${second}_${user.user_id}`+'.wav');
      
      try {
        const uploadResponse = await fetch('https://pium.site/api/upload/', {
          method: 'POST',
          body: formData,
        });
  
        if (!uploadResponse.ok) {
          throw new Error(`HTTP error! Status: ${uploadResponse.status}`);
        }
  
        const uploadData = await uploadResponse.json();
        if (uploadData.success === true) {
          let url = uploadData.audio_url;
  
          // 첫 번째 fetch가 완료된 후 두 번째 fetch를 호출
          const similarityResponse = await fetch("https://pium.site/api/similarity/", {
            credentials: "include",
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              scenario_id: parseInt(window.location.pathname.split("/")[2]),
              qst_id: questions[questionNum].qst_id,
              std_answ_detail: transcript,
              user_id: user.user_id,
              std_answ_type: "s",
              answ_voice_url: url,
            }),
          });
  
          if (similarityResponse.status === 200) {
            const data = await similarityResponse.json();
            if (data.judgement) {
              setQuestionNum(questionNum + 1);
              setRemain(2);
              setMultiple(false);
              retryMsgRef.current.style.display = "none";
            } else {
              if (remain > 0) {
                setRemain(remain - 1);
              } else {
                setMultiple(true);
              }
  
              retryMsgRef.current.style.display = "inline";
            }
            setTranscript("");
          } else {
            // Handle non-200 status if needed
          }
        } else {
          console.log(uploadData);
          console.log('오류');
        }
  
        if (questionNum === questions.length - 1) {
          nav(LINK.ANSWERPAGE);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  };

  const handleClickMultipleBtn = () => {
    if (remain > 0) {
      setMultiple(!multiple);
      setRemain(0);
      retryMsgRef.current.style.display = "none";
    } else {
      setMultiple(true);
    }
  };

  const handleClickMultipleExample = (text) => {
    // 결과 페이지를 위한 질문과 응답 recoil resultState 에 저장
    setResult([...result, {
      question: questions[questionNum].qst_text_detail,
      answer: text,
    }]);

    fetch("https://pium.site/api/similarity/", {
      credentials: "include",
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario_id: parseInt(window.location.pathname.split("/")[2]),
        qst_id: questions[questionNum].qst_id,
        std_answ_detail: text,
        user_id: user.user_id,
        std_answ_type: "m",
        answ_voice_url : url,
      }),
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
      }
    }).then((data) => {
      setQuestionNum(questionNum + 1);
      setRemain(2);
      setMultiple(false);
      setTranscript("");
      retryMsgRef.current.style.display = "none";
    }).then(() => {
      if (questionNum === questions.length - 1) nav(LINK.ANSWERPAGE)
    })
    
  };
  return (
    <>
      <span css={scenarioRetryMsgStyle} ref={retryMsgRef}>
        다시 한번 해볼까요?
      </span>
      <main style={{ backgroundColor: `${COLORS.SUBBACKGROUND}` }}>
        <section css={scenarioHeaderWrapperStyle}>
          <h1 css={scenarioCategoryStyle}>카테고리</h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ScenarioSupportBtn
              img_url={process.env.PUBLIC_URL + "/multiple-choice.png"}
              text="객관식 보기"
              width="1.5rem"
              onClick={handleClickMultipleBtn}
            />
            <div css={scenarioSupportBtnStyle}>
              <img
                src={process.env.PUBLIC_URL + "/remain.png"}
                alt="남은 기회 이미지"
                style={{ width: "2.25rem" }}
              />
              <span>남은 기회</span>
            </div>
            <div css={scenarioRemainCountWrapperStyle}>{remain}</div>
          </div>
        </section>
        <img
          src={
            questions.length !== 0
              ? process.env.PUBLIC_URL + questions[questionNum].image_url
              : undefined
          }
          alt="문제 배경 이미지"
          css={scenarioQuestionBackgroundImgStyle}
        />
        <section css={scenarioQuestionWrapperStyle}>
          <div css={scenarioQuestionStyle}>
            {questions.length !== 0 && questions[questionNum].qst_text_detail}
          </div>
          {multiple ? (
            <div css={scenarioMultipleExampleWapperStyle}>
              {questions[questionNum].choices.map((choice, i) => (
                <ScenarioMultipleExample
                  key={i}
                  text={choice}
                  num={i + 1}
                  onClick={handleClickMultipleExample}
                />
              ))}
            </div>
          ) : (
            <>
              {showGuide ? (
                <div css={scenarioGuideMsgStyle}>적절한 대답을 말해주세요.</div>
              ) : (
                <div style={{ height: "22.125rem" }}></div>
              )}
              <button
                type="button"
                css={scenarioMikeBtnStyle}
                onClick={() => handleClickMikeBtn()}
              >
                <img
                  src={process.env.PUBLIC_URL + "/mike.png"}
                  alt="마이크 입력 이미지"
                />
              </button>
              <button
                type="button"
                css={scenarioSupportBtnColoredStyle}
                onClick={() => handleClickSubmitBtn()}
              >
                제출하기
              </button>
            </>
          )}
        </section>
      </main>
    </>
  );
};

const ScenarioSupportBtn = (props) => {

  return (
    <>
      <button
        type="button"
        css={scenarioSupportBtnStyle}
        onClick={() => props.onClick()}
      >
        <img
          src={props.img_url}
          alt="객관식 보기 이미지"
          style={{ width: props.width }}
        />
        {props.text}
      </button>
    </>
  );
};

const ScenarioMultipleExample = (props) => {
  return (
    <>
      <div
        css={scenarioMultipleExampleStyle}
        onClick={() => props.onClick(props.text)}
      >
        {`(${props.num}) ` + props.text}
      </div>
    </>
  );
};

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;