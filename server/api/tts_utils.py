import os
import sys
from pathlib import Path
import re
from unicodedata import normalize
import IPython
import torch
import soundfile as sf
import numpy as np

# 현재 파일의 경로 저장
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# g2pK 모듈이 있는 디렉토리를 sys.path에 추가
G2PK_MODULE_DIR = os.path.join(BASE_DIR, "g2pK")
sys.path.append(G2PK_MODULE_DIR)
from g2pk import g2pk
g2p = g2pk.G2p()

# TTS 모듈이 있는 디렉토리를 sys.path에 추가
TTS_MODULE_DIR = os.path.join(BASE_DIR, "TTS_all")
sys.path.append(TTS_MODULE_DIR)
from TTS.utils.synthesizer import Synthesizer

# 모델 불러오기
MODEL_DIR = os.path.join(os.path.join(BASE_DIR, "TTS_models"), "ys_1.pth")
ys_model = torch.load(MODEL_DIR, map_location=torch.device("cuda" if torch.cuda.is_available() else "cpu"))


# 텍스트 정규화 함수를 정의
def normalize_text(text):
    # 텍스트 좌우 공백을 제거
    text = text.strip()
    # 쉼표, 세미콜론, 콜론을 마침표로 대체
    for c in ",;:":
        text = text.replace(c, ".")
    text = remove_duplicated_punctuations(text)
    # 한글 자모음으로 변환
    text = jamo_text(text)
    # 관용구 및 영어 표현을 한글 발음으로 변환
    text = g2p.idioms(text)
    text = g2pk.english.convert_eng(text, g2p.cmu)
    text = g2pk.utils.annotate(text, g2p.mecab)
    text = g2pk.numerals.convert_num(text)
    text = re.sub("/[PJEB]", "", text)
    # 영어 알파벳을 한글 발음으로 변환
    text = alphabet_text(text)
    # 읽을 수 없는 문자를 제거
    text = normalize("NFD", text)
    # text = "".join(c for c in text if c in symbols)
    # text = normalize("NFC", text)
    # 좌우 공백을 다시 제거
    text = text.strip()
    if len(text) == 0:
        return ""
    # 문장부호가 '.' 혹은 '!' 혹은 '?' 일 경우, 발음 텍스트로 변환
    if text in '.!?':
        return punctuation_text(text)
    # 문장부호가 빠진 경우, 문장 끝에 '.'을 추가
    if text[-1] not in '.!?':
        text += '.'
    return text

# 중복된 문장부호를 정리하는 함수를 정의
def remove_duplicated_punctuations(text):
    text = re.sub(r"[.?!]+\?", "?", text)
    text = re.sub(r"[.?!]+!", "!", text)
    text = re.sub(r"[.?!]+\.", ".", text)
    return text

# 텍스트를 문장 단위로 나누는 함수를 정의
def split_text(text):
    text = remove_duplicated_punctuations(text)
    texts = []
    for subtext in re.findall(r'[^.!?\n]*[.!?\n]', text):
        texts.append(subtext.strip())
    return texts

# 알파벳을 한글 발음으로 변환하는 함수를 정의
def alphabet_text(text):
    text = re.sub(r"(a|A)", "에이", text)
    text = re.sub(r"(b|B)", "비", text)
    text = re.sub(r"(c|C)", "씨", text)
    text = re.sub(r"(d|D)", "디", text)
    text = re.sub(r"(e|E)", "이", text)
    text = re.sub(r"(f|F)", "에프", text)
    text = re.sub(r"(g|G)", "쥐", text)
    text = re.sub(r"(h|H)", "에이치", text)
    text = re.sub(r"(i|I)", "아이", text)
    text = re.sub(r"(j|J)", "제이", text)
    text = re.sub(r"(k|K)", "케이", text)
    text = re.sub(r"(l|L)", "엘", text)
    text = re.sub(r"(m|M)", "엠", text)
    text = re.sub(r"(n|N)", "엔", text)
    text = re.sub(r"(o|O)", "오", text)
    text = re.sub(r"(p|P)", "피", text)
    text = re.sub(r"(q|Q)", "큐", text)
    text = re.sub(r"(r|R)", "알", text)
    text = re.sub(r"(s|S)", "에스", text)
    text = re.sub(r"(t|T)", "티", text)
    text = re.sub(r"(u|U)", "유", text)
    text = re.sub(r"(v|V)", "브이", text)
    text = re.sub(r"(w|W)", "더블유", text)
    text = re.sub(r"(x|X)", "엑스", text)
    text = re.sub(r"(y|Y)", "와이", text)
    text = re.sub(r"(z|Z)", "지", text)
    return text

# 문장부호를 한글 발음으로 변환하는 함수를 정의
def punctuation_text(text):
    text = re.sub(r"!", "느낌표", text)
    text = re.sub(r"\?", "물음표", text)
    text = re.sub(r"\.", "마침표", text)
    return text

# 한글 자모음을 발음으로 변환하는 함수를 정의
def jamo_text(text):
    text = re.sub(r"ㄱ", "기역", text)
    text = re.sub(r"ㄴ", "니은", text)
    text = re.sub(r"ㄷ", "디귿", text)
    text = re.sub(r"ㄹ", "리을", text)
    text = re.sub(r"ㅁ", "미음", text)
    text = re.sub(r"ㅂ", "비읍", text)
    text = re.sub(r"ㅅ", "시옷", text)
    text = re.sub(r"ㅇ", "이응", text)
    text = re.sub(r"ㅈ", "지읒", text)
    text = re.sub(r"ㅊ", "치읓", text)
    text = re.sub(r"ㅋ", "키읔", text)
    text = re.sub(r"ㅌ", "티읕", text)
    text = re.sub(r"ㅍ", "피읖", text)
    text = re.sub(r"ㅎ", "히읗", text)
    text = re.sub(r"ㄲ", "쌍기역", text)
    text = re.sub(r"ㄸ", "쌍디귿", text)
    text = re.sub(r"ㅃ", "쌍비읍", text)
    text = re.sub(r"ㅆ", "쌍시옷", text)
    text = re.sub(r"ㅉ", "쌍지읒", text)
    text = re.sub(r"ㄳ", "기역시옷", text)
    text = re.sub(r"ㄵ", "니은지읒", text)
    text = re.sub(r"ㄶ", "니은히읗", text)
    text = re.sub(r"ㄺ", "리을기역", text)
    text = re.sub(r"ㄻ", "리을미음", text)
    text = re.sub(r"ㄼ", "리을비읍", text)
    text = re.sub(r"ㄽ", "리을시옷", text)
    text = re.sub(r"ㄾ", "리을티읕", text)
    text = re.sub(r"ㄿ", "리을피읍", text)
    text = re.sub(r"ㅀ", "리을히읗", text)
    text = re.sub(r"ㅄ", "비읍시옷", text)
    text = re.sub(r"ㅏ", "아", text)
    text = re.sub(r"ㅑ", "야", text)
    text = re.sub(r"ㅓ", "어", text)
    text = re.sub(r"ㅕ", "여", text)
    text = re.sub(r"ㅗ", "오", text)
    text = re.sub(r"ㅛ", "요", text)
    text = re.sub(r"ㅜ", "우", text)
    text = re.sub(r"ㅠ", "유", text)
    text = re.sub(r"ㅡ", "으", text)
    text = re.sub(r"ㅣ", "이", text)
    text = re.sub(r"ㅐ", "애", text)
    text = re.sub(r"ㅒ", "얘", text)
    text = re.sub(r"ㅔ", "에", text)
    text = re.sub(r"ㅖ", "예", text)
    text = re.sub(r"ㅘ", "와", text)
    text = re.sub(r"ㅙ", "왜", text)
    text = re.sub(r"ㅚ", "외", text)
    text = re.sub(r"ㅝ", "워", text)
    text = re.sub(r"ㅞ", "웨", text)
    text = re.sub(r"ㅟ", "위", text)
    text = re.sub(r"ㅢ", "의", text)
    return text

# 다중 문장을 정규화하는 함수를 정의
def normalize_multiline_text(long_text):
    texts = split_text(long_text)
    normalized_texts = [normalize_text(text).strip() for text in texts]
    return [text for text in normalized_texts if len(text) > 0]

# 텍스트를 합성하여 오디오를 생성하는 함수를 정의
def synthesize(text):
    wavs = synthesizer.tts(text, None, None)
    return wavs



# WAVS 파일 경로 설정
WAVS_DIR = os.path.join(BASE_DIR, "wavs")

def make_TTS(title, q_num, texts):
    # TTS 모델에 모든 문장을 전달하여 한 번에 음성 생성
    wav = ys_model.tts(texts, None, None)
    # 음성 데이터를 넘파이 어레이로 변환
    wav_np = np.array(wav)
    
    # soundfile를 사용하여 WAV 파일로 저장
    output_filename = f"../client/public/wavs/{title}_{q_num}.wav"  # "f"{WAVS_DIR}/{title}_{q_num}.wav"
    sf.write(output_filename, wav_np.astype(np.float32), 22050, 'PCM_16')
    print(f"음성이 {output_filename}에 저장되었습니다.")
    
    return output_filename