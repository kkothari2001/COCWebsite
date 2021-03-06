import {
  IconButton,
  Card,
  Divider,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import EventIcon from "@material-ui/icons/Event";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { green, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "20px 100px",
    backgroundColor: "white",
    position: "relative",
  },
  media: {
    height: "auto",
    paddingTop: "100%", //"56.25%", // 16:9
  },
  section1: {
    margin: theme.spacing(1, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(2, 2),
  },
}));

export default function IndividualEvent({ article, isMember, handleDelete }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card raised={true}>
        {!!article.image && (
          <CardMedia className={classes.media} image={article.image.url} />
        )}
        <CardContent>
          <Typography
            className={classes.section1}
            gutterBottom
            variant="h6"
            component="h2"
          >
            {article.eventName}
          </Typography>
          <Divider />
          <Typography
            className={classes.section2}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            <EventIcon style={{ color: "#52b107" }} />{" "}
            {format(new Date(article.date), "EEEE, do MMMM, yyyy")}
          </Typography>
          <Typography
            className={classes.section2}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            <RoomOutlinedIcon style={{ color: "#52b107" }} />
            {" " + article.venue}
          </Typography>
          <Typography
            className={classes.section3}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {article.description}
          </Typography>
        </CardContent>
        {isMember && (
          <>
            <Divider variant="middle" />
            <CardActions disableSpacing={true}>
              <Link to={`event/edit/${article._id}`}>
                <IconButton>
                  <EditOutlinedIcon style={{ color: green[500] }} />
                </IconButton>
              </Link>
              <IconButton onClick={() => handleDelete(article._id)}>
                <DeleteOutlinedIcon style={{ color: red[400] }} />
              </IconButton>
            </CardActions>
          </>
        )}
      </Card>
    </Grid>
  );
}
