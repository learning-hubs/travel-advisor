import { Paper, Typography, useMediaQuery } from "@material-ui/core"
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from '@material-ui/lab/Rating';
import useStyles from './../Map/styles';

const Popup = ({ place }) => {
    const matches = useMediaQuery('(min-width: 600px)');
    const classes = useStyles();

    return (
        <div>
            {!matches ? <LocationOnOutlinedIcon color="primary" fontSize="large"/>:(
                <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>Ashoka</Typography>
                    <img
                    className={classes.pointer}
                    src='https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                  />

<Rating name="read-only" size="small" value={5} readOnly />
                </Paper>
            )}
        </div>
    )
}

export default Popup;