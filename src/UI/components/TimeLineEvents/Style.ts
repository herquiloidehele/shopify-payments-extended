import TimelineDot from "@mui/lab/TimelineDot";
import styled from "styled-components";

import { pixel2Rem } from "../../../Utils/functions/Ui";

export const TimeLineEventsWrapper = styled.div`
  display: flex;

  ul {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .MuiTimelineItem-root.MuiTimelineItem-positionRight:before {
    display: none;
  }
`;

interface ICustomTimelineDot {
  dotColor: string;
}
export const CustomDotTimeLine = styled(TimelineDot)<ICustomTimelineDot>`
  background-color: ${({ dotColor }) => dotColor} !important;
`;

export const TimeLineDataWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    color: ${({ theme }) => theme.colors.text_on_surface};
    font-size: ${pixel2Rem(16)};
  }

  .subtitle {
    color: ${({ theme }) => theme.colors.light_text};
    font-size: ${pixel2Rem(13)};
  }

  .date {
    color: ${({ theme }) => theme.colors.light_text};
    font-size: ${pixel2Rem(13)};
    opacity: 0.8;
  }
`;

export const TimelineAvatarsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: ${pixel2Rem(5)};
  margin-top: ${pixel2Rem(5)};

  .MuiAvatar-root.MuiAvatar-circular {
    width: ${pixel2Rem(30)} !important;
    height: ${pixel2Rem(30)} !important;
  }

  .payer-info {
    display: flex;
    flex-direction: column;
    gap: 0;
    .title {
      font-size: ${pixel2Rem(12)};
      color: ${({ theme }) => theme.colors.text_on_surface};
      font-weight: bold;
    }

    .subtitle {
      font-size: ${pixel2Rem(11)};
      ${({ theme }) => theme.colors.light_text};
      opacity: 0.7;
    }
  }
`;
