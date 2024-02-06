import TwitterLogo from './logo-black.png'
import FacebookLogo from './facebookLogo.png'
import GithubLogo from './github-mark.svg'
import LinkedinLogo from './linkedinLogo.png'
import InstagramLogo from './instagramLogo.svg'

export interface Social {
  link: string
  icon: string
  app: string
}

export const Socials: Social[] = [
  {
    link: 'https://x.com/',
    icon: TwitterLogo,
    app: 'X (Twitter)',
  },
  {
    link: 'https://instagram.com/',
    icon: InstagramLogo,
    app: 'Instagram',
  },
  {
    link: 'https://facebook.com/',
    icon: FacebookLogo,
    app: 'Facebook',
  },
  {
    link: 'https://linkedin.com/in/',
    icon: LinkedinLogo,
    app: 'Linkedin',
  },
  {
    link: 'https://github.com/',
    icon: GithubLogo,
    app: 'Github',
  },
]
