import { m, useScroll } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { textGradient, bgGradient, bgBlur } from 'src/theme/css';
// layouts
import { HEADER } from 'src/layouts/config-layout';
// components
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  width: '100%',
  height: '100vh',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    position: 'fixed',
  },
}));

const StyledWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  backgroundImage: 'url(/assets/main-bg.jpeg)',
  backgroundSize: 'cover',
  [theme.breakpoints.up('md')]: {
    marginTop: HEADER.H_DESKTOP_OFFSET,
  },
}));

const StyledTextGradient = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  padding: 0,
  marginTop: 8,
  lineHeight: 1,
  marginBottom: 24,
  letterSpacing: 8,
  textAlign: 'center',
  backgroundSize: '400%',
  fontSize: `${64 / 16}rem`,
  fontFamily: "'Barlow', sans-serif",
  [theme.breakpoints.up('md')]: {
    fontSize: `${96 / 16}rem`,
  },
}));

type StyledPolygonProps = {
  opacity?: number;
  anchor?: 'left' | 'right';
};

const StyledPolygon = styled('div')<StyledPolygonProps>(
  ({ opacity = 1, anchor = 'left', theme }) => ({
    ...bgBlur({
      opacity,
      color: theme.palette.background.default,
    }),
    zIndex: 9,
    bottom: 0,
    height: 80,
    width: '50%',
    position: 'absolute',
    clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
    ...(anchor === 'left' && {
      left: 0,
      ...(theme.direction === 'rtl' && {
        transform: 'scale(-1, 1)',
      }),
    }),
    ...(anchor === 'right' && {
      right: 0,
      transform: 'scaleX(-1)',
      ...(theme.direction === 'rtl' && {
        transform: 'scaleX(1)',
      }),
    }),
  })
);

// ----------------------------------------------------------------------

export default function HomeHero() {
  const mdUp = useResponsive('up', 'md');

  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const opacity = 1 - percent / 100;

  const hide = percent > 120;

  const renderDescription = (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        mx: 'auto',
        maxWidth: 480,
        opacity: opacity > 0 ? opacity : 0,
        mt: {
          md: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
        },
      }}
    >
      <m.div variants={varFade().in}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
          }}
        >
          Start a <br />
          New Project with
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <StyledTextGradient
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          Minimal
        </StyledTextGradient>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          The starting point for your next project is based on MUI.Easy customization Helps you
          build apps faster and better.
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Stack
          spacing={0.75}
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ my: 3 }}
        >
          <Rating readOnly value={4.95} precision={0.1} max={5} />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            <Box component="strong" sx={{ mr: 0.5, color: 'text.primary' }}>
              4.96/5
            </Box>
            (99+ reviews)
          </Typography>
        </Stack>
      </m.div>

      <m.div variants={varFade().in}>
        <Stack spacing={1.5} direction={{ xs: 'column-reverse', sm: 'row' }} sx={{ mb: 5 }}>
          <Stack alignItems="center" spacing={2}>
            <Button
              component={RouterLink}
              href={paths.dashboard.root}
              color="inherit"
              size="large"
              variant="contained"
              startIcon={<Iconify icon="eva:flash-fill" width={24} />}
            >
              Live Preview
            </Button>

            <Link
              color="inherit"
              variant="caption"
              target="_blank"
              rel="noopener"
              href={paths.freeUI}
              sx={{
                textDecoration: 'underline',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <Iconify icon="eva:external-link-fill" width={16} sx={{ mr: 0.5 }} />
              Get Free Version
            </Link>
          </Stack>

          <Button
            color="inherit"
            size="large"
            variant="outlined"
            startIcon={<Iconify icon="eva:external-link-fill" width={24} />}
            target="_blank"
            rel="noopener"
            href={paths.figma}
            sx={{ borderColor: 'text.primary' }}
          >
            Design Preview
          </Button>
        </Stack>
      </m.div>

      <Stack spacing={3} sx={{ textAlign: 'center' }}>
        <m.div variants={varFade().in}>
          <Typography variant="overline" sx={{ opacity: 0.4 }}>
            Available For
          </Typography>
        </m.div>

        <Stack spacing={2} direction="row" justifyContent="center">
          {['figma', 'js', 'ts', 'nextjs', 'vite'].map((platform) => (
            <m.div key={platform} variants={varFade().in}>
              <Box
                component="img"
                src={`/assets/icons/platforms/ic_${platform}.svg`}
                sx={{ width: 24, height: 24 }}
              />
            </m.div>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );

  const renderPolygons = (
    <>
      <StyledPolygon />
      <StyledPolygon anchor="right" opacity={0.48} />
      <StyledPolygon anchor="right" opacity={0.48} sx={{ height: 48, zIndex: 10 }} />
      <StyledPolygon anchor="right" sx={{ zIndex: 11, height: 24 }} />
    </>
  );

  return (
    <>
      <StyledRoot
        ref={heroRef}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      >
        <StyledWrapper>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid container sx={{ height: 1 }}>
                {renderDescription}
            </Grid>
          </Container>
        </StyledWrapper>
      </StyledRoot>

      {mdUp && renderPolygons}

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
