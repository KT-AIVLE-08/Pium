/** @jsxImportSource @emotion/react */

import {
  card,
  cardActions,
  cardHeading,
  cardSubheading,
  cardActionsImg,
} from "./style";

export const Box = (props) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div css={card}>
        <div css={cardActions}>
          <h3 css={cardHeading}>{props.question}</h3>
          <h4 css={cardSubheading}>{props.answer}</h4>
          <div>
            <img
              css={cardActionsImg}
              src={process.env.PUBLIC_URL + "/star.png"}
              alt="별"
            />
            <img
              css={cardActionsImg}
              src={process.env.PUBLIC_URL + "/sound.png"}
              alt="소리"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
