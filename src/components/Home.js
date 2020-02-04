import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NearMeIcon from '@material-ui/icons/NearMe';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from './listItems';
import credenciales from './credenciales';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  busqueda: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 370,

  },
  busquedaBoton: {
    padding: 13,
  },
  cardHeader: {
    backgroundColor: '#3f51b5',
    color: 'white',
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(0),
  },
  cardMedia: {
    paddingTop: '50%',
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.title}>
            UN domicilio
          </Typography>
          <IconButton color="inherit" className = 'invisible'>
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
          <List>{mainListItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Ubicación */}
            <Grid item xs={7.5} alignItems='center'>
              <Paper elevation={3}>
                <InputBase
                  className={classes.busqueda}
                  id="direccion"
                  placeholder="Ingresa la ubicación o dirección que quieres buscar"
                  inputProps={{ 'aria-label': 'buscar direccion' }}
                />
                <IconButton type="submit" color="primary" className={classes.busquedaBoton} aria-label="ir a ubicacion">
                  <NearMeIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item xs={6}></Grid>
          {/* Mapa */}
            <Grid item xs={4}>
              <Card>
                <CardHeader
                  title={'Promoción Hamburguesa'}
                  titleTypographyProps={{ align: 'center'}}
                  action={<StarIcon />}
                  className={classes.cardHeader}
                />
                <CardMedia
                    className={classes.cardMedia}
                    image="https://d2yoo3qu6vrk5d.cloudfront.net/images/20181123122242/hamburguesa-420x278.jpg"
                    title="Promocion Hamburguesa combo"
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      $20.000
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      COP
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button fullWidth color="primary" href="/productos">
                    Llévame a los productos
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardHeader
                  title={'Promoción Sushi'}
                  titleTypographyProps={{ align: 'center'}}
                  action={<StarIcon />}
                  className={classes.cardHeader}
                />
                <CardMedia
                    className={classes.cardMedia}
                    image="https://cdn2.cocinadelirante.com/sites/default/files/images/2017/01/sushiconaguacate.jpg"
                    title="Promocion Sushi"
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      $17.000
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      COP
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button fullWidth color="primary" href="/productos">
                    Llévame a los productos
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardHeader
                  title={'Promoción Pasta'}
                  titleTypographyProps={{ align: 'center'}}
                  action={<StarIcon />}
                  className={classes.cardHeader}
                />
                <CardMedia
                    className={classes.cardMedia}
                    image="https://www.cocinayvino.com/wp-content/uploads/2017/03/51721117_l.jpg"
                    title="Promocion Pasta"
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      $22.000
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      COP
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button fullWidth color="primary" href="/productos">
                    Llévame a los productos
                  </Button>
                </CardActions>
              </Card>
            </Grid>

          </Grid>
          <Box pt={4}>

          </Box>
        </Container>
      </main>
    </div>
  );
}
