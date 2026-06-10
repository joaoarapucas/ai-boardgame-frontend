import { Outlet } from 'react-router';
import { RootMenu } from './root-menu';
import { Container } from '@ui/layout/container';
import { Typography } from '@ui/text/typography';
import { cn } from '@core/helpers';

import bgSpace from '../../assets/background-site.jpg'
import logoTransp from '../../assets/logo_transp.gif'

export function RootLayout() {

  return (
    <div
      style={{ backgroundImage: `url(${bgSpace})` }}
      className={cn('w-dvw min-h-dvh', 'flex flex-col gap-0', 'bg-gray-100')}
    >

      <header id={'site-header'}>

        <RootMenu />

        <Container className={cn('p-4',
          'w-fit mx-auto mt-[25px] ',
        )}>
          <img src={logoTransp} alt="pateta's cyber corner" style={{ width: '100%', height: '175px' }} />
        </Container>

      </header>




      <main id={'site-main'} className={cn('flex-1', 'flex flex-col', 'ml-[15%]', 'mr-[15%]')}>
        <Container className={cn('px-4', 'flex-1')}>
          <Outlet />
        </Container>
      </main>




      <footer id={'site-footer'} className={cn('text-white')}>
        <Container className={cn('p-4')}>
          <Typography
            variant={'p'}
            asTag={'p'}
            className={cn('text-xs', 'font-bold', 'opacity-50', 'w-fit mx-auto ',)}
          >
            &copy;2026 PI5
          </Typography>
        </Container>
      </footer>
    </div>
  );
}
