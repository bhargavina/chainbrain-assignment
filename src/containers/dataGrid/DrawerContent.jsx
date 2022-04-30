import {
  alpha,
  Icon,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ReactComponent as HistoryIcon } from "../../assets/images/clockIcon.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/closeIcon.svg";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import messages from "../../constants/Messages";
import fontWeights from "../../theme/FontWeights";

const useStyles = makeStyles((theme) => ({
  drawerHeaderContainer: {
    display: "flex",
    alignItems: "center",
    background: theme.palette.secondary.main,
    padding: "1.25rem",
  },
  historyContainer: {
    display: "flex",
    alignItems: "center",
  },
  historyIconConnector: {
    marginRight: "0.5rem",
  },
  iconRoot: {
    padding: 0,
    height: "unset",
    width: "unset",
  },
  historyLabelContainer: {
    marginLeft: "0.5rem",
  },
  historyLabel: {
    fontSize: "1.125rem",
    color: theme.palette.text.secondary,
  },
  closeIconContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  iconButtonRoot: {
    padding: 0,
  },
  timelineContainer: {
    display: "flex",
    "& .MuiTimelineItem-missingOppositeContent:before": {
      flex: 0,
      padding: "0.5rem 0",
    },
  },
  timelineConnector: {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },
  timelineItemHeadingLabel: {
    color: alpha(theme.palette.text.primary, 0.5),
    fontWeight: fontWeights[700],
    fontSize: "0.875rem",
  },
  eventContainer: {
    display: "flex",
    alignItems: "center",
    margin: "0.5rem 0",
  },
  actionDescription: {
    color: alpha(theme.palette.text.primary, 0.5),
    fontWeight: fontWeights[400],
    fontSize: "0.75rem",
  },
  timeContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
}));

function DrawerContent(props) {
  const { onCloseIconClick = () => null, historyItems = [] } = props;
  const classes = useStyles();
  return (
    <div>
      <div className={classes.drawerHeaderContainer}>
        <div className={classes.historyContainer}>
          <div className={classes.historyIconConnector}>
            <Icon classes={{ root: classes.iconRoot }}>
              <HistoryIcon height="1.25rem" width="1.25rem" />
            </Icon>
          </div>
          <div className={classes.historyLabelContainer}>
            <Typography variant="h3" classes={{ root: classes.historyLabel }}>
              {messages["Drawer.heading"]}
            </Typography>
          </div>
        </div>
        <div className={classes.closeIconContainer}>
          <IconButton
            classes={{ root: classes.iconButtonRoot }}
            onClick={onCloseIconClick}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.timelineContainer}>
        <Timeline>
          {historyItems.map(({ heading = "", events = [] }, index) => (
            <TimelineItem key={heading}>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color="secondary" />
                <TimelineConnector className={classes.timelineConnector} />
              </TimelineSeparator>
              <TimelineContent>
                <div>
                  <Typography
                    variant="h6"
                    classes={{ root: classes.timelineItemHeadingLabel }}
                  >
                    {heading}
                  </Typography>
                </div>
                {events.map((event) => (
                  <div key={event.id} className={classes.eventContainer}>
                    <div>
                      <Typography
                        variant="subtitle1"
                        classes={{ root: classes.actionDescription }}
                      >
                        {event.formattedString}
                      </Typography>
                    </div>
                    <div className={classes.timeContainer}>
                      <Typography
                        variant="subtitle1"
                        classes={{ root: classes.actionDescription }}
                      >
                        {event.formattedTime}
                      </Typography>
                    </div>
                  </div>
                ))}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
}

export default DrawerContent;
