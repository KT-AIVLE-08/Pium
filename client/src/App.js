import { Routes, Route } from "react-router-dom";

import { CommonLayout, IntroLayout, ManageLayout } from "common";

import {
  IntroPage,
  AboutPage,
  LoginPage,
  SignupPage,
  StudyPage,
  StatsPage,
  TrialPage,
  ManageScenarioPage,
  ManageStudentPage,
  ScenarioPage,
  ScenarioEdit,
  PostScenarioPage,
  UpdateScenarioPage,
  ConsentPage,
} from "pages";

import { useCheckLogin } from "hooks/useCheckLogin";

import { LINK } from "utils/constants";
import { AnswerPage } from "pages/AnswerPage/index";

function App() {
  useCheckLogin();

  return (
    <Routes>
      <Route path="/" element={<IntroLayout />}>
        <Route path={LINK.INTRO} element={<IntroPage />}></Route>
      </Route>
      <Route path="/" element={<CommonLayout />}>
        <Route path={LINK.ABOUT} element={<AboutPage />}></Route>
        <Route path={LINK.LOGIN} element={<LoginPage />}></Route>
        <Route path={LINK.CONSENT} element={<ConsentPage />}></Route>
        <Route path={LINK.SIGNUP} element={<SignupPage />}></Route>
        <Route path={LINK.STUDY} element={<StudyPage />}></Route>
        <Route path={LINK.ANSWERPAGE} element={<AnswerPage />}></Route>
        <Route path={LINK.TRIAL} element={<StudyPage />}></Route>
      </Route>
      <Route path={LINK.MANAGE} element={<ManageLayout />}>
        <Route path={LINK.MANAGE + LINK.SCENARIO}>
          <Route path={LINK.MANAGE + LINK.SCENARIO} element={<ManageScenarioPage link="/" />}></Route>
          <Route path={LINK.MANAGE + LINK.SCENARIO + LINK.USER + "/:user_id"} element={<ManageScenarioPage link={LINK.USER} />}></Route>
          <Route path={LINK.MANAGE + LINK.SCENARIO + LINK.SCHOOL + "/:school_id"} element={<ManageScenarioPage link={LINK.SCHOOL} />}></Route>
          <Route path={LINK.MANAGE + LINK.SCENARIO + LINK.POST} element={<PostScenarioPage />} link="/post"></Route>
          <Route path={LINK.MANAGE + LINK.SCENARIO + LINK.UPDATE + "/:scenario_id"} element={<UpdateScenarioPage />}></Route>
        </Route>
        <Route path={LINK.MANAGE + LINK.STUDENT} element={<ManageStudentPage />}></Route>
        <Route path={LINK.MANAGE + LINK.STATS} element={<StatsPage link='/'/>}></Route>
      </Route>

      <Route path={LINK.SCENARIOEDIT} element={<ScenarioEdit />}></Route>
      <Route path={`${LINK.SCENARIO}/:id`} element={<ScenarioPage />}></Route>
    </Routes>
  );
}

export default App;