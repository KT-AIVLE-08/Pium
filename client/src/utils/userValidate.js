// 이름 한글만 입력ㄴ
export const usernameKo = (username) => {
  return /^[가-힣]+$/.test(username);
};

// 이름 길이 제한(1글자 이상, 4글자 이하)
export const usernameLength = (username) => {
  return username.length >= 1 && username.length <= 4;
};

// 아이디 길이 제한(4글자 이상, 16글자 이하)
export const idLength = (id) => {
  return id.length >= 4 && id.length <= 16;
};

// 아이디 영어 또는 숫자만 가능
export const idEngNum = (id) => {
  return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(id);
};

// 비밀번호 8글자 이상, 영문, 숫자, 특수문자 사용
export const strongPassword = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    password
  );
};

// 비밀번호 확인
export const isMatchPassword = (password, passwordCheck) => {
  return password === passwordCheck;
};

// 휴대폰 010 으로 시작
export const isPhone = (phone) => {
  return /^010$/.test(phone);
};

// 휴대폰 길이 제한(10글자 이상 11글자 이하)
export const phoneLength = (phone) => {
  return phone.length >= 10 && phone.length <= 11;
};

// 학교 한글만 입력
export const schoolKo = (school) => {
  return /^[가-힣]+$/.test(school);
};

// 학교 길이 제한(20자 이하)
export const schoolLength = (school) => {
  return school.length <= 20;
};
