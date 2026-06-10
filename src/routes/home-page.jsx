import { cn } from "@core/helpers";
import { Typography } from "@ui/text/typography";

import Subtitle from "@ui/layout/subtitles";

import welcomeGif from '../assets/welcome.gif'
import details_gif from '../assets/details_star.gif'
import underConstruction from '../assets/under_construction.png'

export function HomePage() {

  return (
    <>
      <div className={cn(
        'flex flex-col gap-6 py-8 flex-1',
        'w-full max-w-6xl mx-auto px-4 items-center text-center',
        'bg-blue-900'
      )}>

        {/**
         * MARK: Welcome
         */}
        <Typography
          variant={'h1'}
          asTag={'h1'}
          className={cn('text-4xl', 'font-bold', 'text-white underline', 'bg-cyan-700 px-5 py-3')}
        >
          Welcome to my project!
        </Typography>
        <img src={welcomeGif} alt="Welcome to my homepage!" />
        <Typography
          variant={'p'}
          asTag={'p'}
          className={cn('font-bold text-white')}
        >
          this is my college's 5th semester final project!
          the goal was to program a traditional AI from the ground up to play a board game.
          since board games have so many possible moves, we were forced to code an actual intelligent player!
        </Typography>


        {/**
         * MARK: Details
         */}
        <Subtitle title='Details and tech' css='text-green-400' img={details_gif} alt='green_star' />

        <Typography
          variant={'p'}
          asTag={'p'}
          className={cn('font-bold text-white')}
        >
          after coding the frontend (this website!) and the backend (our AI API, made in Python), the classroom competed
          in a tournament just for fun.
        </Typography>
        <img src={underConstruction} alt='Under construction' />


        {/**
         * MARK: The end
         */}
        <Subtitle title='The imminent end' css='text-red-400' />

        <Typography
          variant={'p'}
          asTag={'p'}
          className={cn('font-bold text-white')}
        >
          since the game orchestrator's API is hosted by our professor, it is likely that after a while this website will be
          essencially dead. :(
        </Typography>
      </div>
    </>
  );
}
