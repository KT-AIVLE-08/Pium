/* eslint-disable */
export const mockScenarioList = [
  {
    scenario_id: 1,
    title: "대중교통 타는 법1",
    scen_image_url: process.env.PUBLIC_URL + "/mockScenarioImg.png",
    describe: "지하철을 이용할 때는 어떻게 해야 할까요?",
    cate_name: "대중교통",
    level: 1,
    visible: true,
    use_yn: true,
    insert_time: "2023.12.21",
  },
  {
    scenario_id: 2,
    title: "대중교통 타는 법2",
    scen_image_url: process.env.PUBLIC_URL + "/mockScenarioImg.png",
    describe: "버스를 이용할 때는 어떻게 해야 할까요?",
    cate_name: "대중교통",
    level: 2,
    visible: true,
    use_yn: true,
    insert_time: "2023.12.21",
  },
  {
    scenario_id: 3,
    title: "대중교통 타는 법3",
    scen_image_url: process.env.PUBLIC_URL + "/mockScenarioImg.png",
    describe: "택시를 이용할 때는 어떻게 해야 할까요?",
    cate_name: "대중교통",
    level: 3,
    visible: true,
    use_yn: true,
    insert_time: "2023.12.21",
  },
  {
    scenario_id: 4,
    title: "카페에서 주문하기",
    scen_image_url: process.env.PUBLIC_URL + "/mockScenarioImg.png",
    describe: "카페에서 음료를 주문해볼까요?",
    cate_name: "카페",
    level: 2,
    visible: true,
    use_yn: true,
    insert_time: "2023.12.21",
  },
];

export const mockQuestions = [
  {
    image_url: process.env.PUBLIC_URL + "/question-background-img.png",
    // qst_text_detail: "주문 도와드릴까요?",
    qst_text_detail: "어떤 걸로 주문하시겠어요?",
    order_num: 1,
  },
  {
    image_url: process.env.PUBLIC_URL + "/question-background-img.png",
    qst_text_detail: "차가운 거로 드릴까요? 따듯한 거로 드릴까요?",
    order_num: 2,
  },
];

export const mockChoiceAnswers = [
  ["집에 가고싶어요", "커피 주세요.", "장난감 사주세요."],
  ["차가운 거로 주세요", "화장실에 가고 싶어요.", "싫어요."],
];


export const mockScenario = {
  scenario: {
    scenario_id: 1,
    title: "카페에서 주문하기",
    scen_image_url: "/cafe1/qst1.png",
    describe: "카페에서 주문을 해보아요",
    visible: "Y",
    level: 1,
    use_yn: "Y",
    scen_cate: 1
  },
  qst: [
    {
      qst_id: 1,
      image_url: "/cafe1/qst2.png",
      qst_text_detail: "어떤 메뉴를 주문하시겠어요?",
      qst_voice_url: "cafe/voice",
      order_num: 1,
      use_yn: "N",
      scenario: 1,
      answer: [
        {
          qst: 1,
          qst_answ_detail: "커피 주세요",
          qst_type: "s"
        },
        {
          qst: 1,
          qst_answ_detail: "커피 주세요",
          qst_type: "m"
        },
        {
          qst: 1,
          qst_answ_detail: "책 주세요",
          qst_type: "m"
        },
        {
          qst: 1,
          qst_answ_detail: "과자 주세요",
          qst_type: "m"
        }
      ]
    },
    {
      qst_id: 2,
      image_url: "/cafe1/qst4.png",
      qst_text_detail: "어떤 사이즈로 하시겠어요?",
      qst_voice_url: "cafe/voice",
      order_num: 2,
      use_yn: "N",
      scenario: 1,
      answer: [
        {
          qst: 2,
          qst_answ_detail: "큰 걸로 주세요",
          qst_type: "s"
        },
        {
          qst: 2,
          qst_answ_detail: "보통 사이즈로 주세요",
          qst_type: "m"
        },
        {
          qst: 2,
          qst_answ_detail: "그냥 주세요",
          qst_type: "m"
        },
        {
          qst: 2,
          qst_answ_detail: "잘 모르겠어요",
          qst_type: "m"
        }
      ]
    },
    {
      qst_id: 3,
      image_url: "/cafe1/qst6.png",
      qst_text_detail: "포인트 적립하세요?",
      qst_voice_url: "cafe/voice",
      order_num: 3,
      use_yn: "N",
      scenario: 1,
      answer: [
        {
          qst: 3,
          qst_answ_detail: "네",
          qst_type: "s"
        },
        {
          qst: 3,
          qst_answ_detail: "싫어요",
          qst_type: "m"
        },
        {
          qst: 3,
          qst_answ_detail: "네",
          qst_type: "m"
        },
        {
          qst: 3,
          qst_answ_detail: "좋아요",
          qst_type: "m"
        }
      ]
    }
  ]
}