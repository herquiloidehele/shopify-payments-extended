import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Avatar, AvatarGroup } from "@mui/material";
import React, { ReactElement } from "react";

import { TIMELINE_EVENTS_TYPES } from "../../../Utils/constants/Constants";
import { getPassedTime } from "../../../Utils/functions/Ui";
import { CustomDotTimeLine, TimeLineDataWrapper, TimeLineEventsWrapper, TimelineAvatarsWrapper } from "./Style";

interface ITimelineAvatars {
  eventType: TIMELINE_EVENTS_TYPES;
}
const TimelineAvatars: React.FC<ITimelineAvatars> = ({ eventType }) => {
  switch (eventType) {
    case TIMELINE_EVENTS_TYPES.CHALLENGE_ACCEPTED:
      return (
        <TimelineAvatarsWrapper>
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="https://material-ui.com/static/images/avatar/2.jpg" />
          </AvatarGroup>
        </TimelineAvatarsWrapper>
      );

    case TIMELINE_EVENTS_TYPES.BUY_CREDITS:
      return (
        <TimelineAvatarsWrapper>
          <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
          <div className="payer-info">
            <span className="title">Herquiloide hele</span>
            <span className="subtitle">100 Jogos</span>
          </div>
        </TimelineAvatarsWrapper>
      );

    case TIMELINE_EVENTS_TYPES.WITHDRAW_MONEY:
      return (
        <TimelineAvatarsWrapper>
          <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
          <div className="payer-info">
            <span className="title">Herquiloide hele</span>
            <span className="subtitle">100 Jogos</span>
          </div>
        </TimelineAvatarsWrapper>
      );

    default:
      return <></>;
  }
};

export interface ITimeLineData {
  eventType: TIMELINE_EVENTS_TYPES;
  title: string;
  description: ReactElement | string;
  date: Date;
}
const TimeLineData: React.FC<ITimeLineData> = ({ eventType, title, date, description }) => {
  return (
    <TimeLineDataWrapper>
      <div>
        <h5 className="title">{title}</h5>
        <p className="subtitle">{description}</p>

        <TimelineAvatars eventType={eventType} />
      </div>

      <div>
        <span className="date">{getPassedTime(date)}</span>
      </div>
    </TimeLineDataWrapper>
  );
};

/**
 * Timeline Events Main component
 * @constructor
 */
interface ITimelineEvents {
  events: ITimeLineData[];
}
const TimelineEvents: React.FC<ITimelineEvents> = ({ events }) => {
  const timelineColors = {
    newChallenge: "#7367F0",
    challengeAccepted: "#28C76F",
    buyCredits: "#EA5455",
    withdrawMoney: "#FF9F43",
    cancelGame: "#FF9F43",
    default: "#dadada",
  };

  const getDotColor = (eventType: TIMELINE_EVENTS_TYPES) => {
    switch (eventType) {
      case TIMELINE_EVENTS_TYPES.CHALLENGE_ACCEPTED:
        return timelineColors.challengeAccepted;
      case TIMELINE_EVENTS_TYPES.BUY_CREDITS:
        return timelineColors.buyCredits;
      case TIMELINE_EVENTS_TYPES.WITHDRAW_MONEY:
        return timelineColors.withdrawMoney;
      case TIMELINE_EVENTS_TYPES.CHALLENGE_CANCELED:
        return timelineColors.cancelGame;
      default:
        return timelineColors.newChallenge;
    }
  };

  return (
    <TimeLineEventsWrapper>
      <Timeline position="right">
        {events.map((data: ITimeLineData, index: number) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <CustomDotTimeLine dotColor={getDotColor(data.eventType)} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <TimeLineData eventType={data.eventType} title={data.title} date={data.date} description={data.description} />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimeLineEventsWrapper>
  );
};

export default TimelineEvents;
