import React from "react";
import { Toolbar, IconButton, Drawer, Divider, styled, useTheme, Box, CssBaseline, Typography } from "@mui/material";
import { Menu, ChevronLeft, ChevronRight } from '@mui/icons-material';
import MuiAppBar from '@mui/material/AppBar';
import Map from "./Map";
import MapDrawerContent from "./MapDrawerContent";
import UNDPLogo from './images/UNDP_Logo.png';
import SDGAILabLogo from './images/SDGAILAB.png';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Header() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSDGAILabClick = () => {
        window.location.href = "https://sdgailab.org";
    }

    const handleUNDPClick = () => {
        window.location.href = "https://undp.org";
    }

    const displayDesktop = () => {
        return <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
                <Menu />
            </IconButton>
            <Typography>UNDP DSV v2</Typography>
            <Box flex="1" textAlign="end" justifyContent="flex-end" sx={{ ...(open && { display: 'flex' }) }}>
                <IconButton
                    size="medium"
                    edge="end"
                    aria-label="sdgailab"
                    onClick={handleSDGAILabClick}
                    sx={{ mr: 3, ...(open && { display: 'flex' }) }}>
                    <img src={SDGAILabLogo} width={60} height={45}/>
                </IconButton>
                <IconButton
                    size="small"
                    edge="end"
                    aria-label="undp logo"
                    onClick={handleUNDPClick}
                    sx={{ mr: 3, ...(open && { display: 'flex' }) }}>
                    <img src={UNDPLogo} width={28} height={45}/>
                </IconButton>
            </Box>
        </Toolbar>;
  };
  
  const displayDrawer = () => {
      return <Drawer
        sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
        </DrawerHeader>
        <Divider />
        <MapDrawerContent />
    </Drawer>
  }

  const mainContent = () => {
      return <Main open={open}>
          <DrawerHeader />
          <Map
            sx={{ ...(open && { display: 'flex'}) }}/>
      </Main>
  }

  return (
    <header>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>{displayDesktop()}</AppBar>
            {displayDrawer()}
        </Box>
        {mainContent()}
    </header>
  );
}