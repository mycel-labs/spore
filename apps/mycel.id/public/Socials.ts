import TwitterLogo from './socialLogo/logo-black.png'
import FacebookLogo from './socialLogo/facebookLogo.png'
import GithubLogo from './socialLogo/github-mark.svg'
import LinkedinLogo from './socialLogo/linkedinLogo.png'
import InstagramLogo from './socialLogo/instagramLogo.svg'
import { Links } from '~/components/SocialLink'

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
export const MockSocials: Links[] = [
  {
    link: 'https://x.com/',
    icon: TwitterLogo,
    app: 'X (Twitter)',
    id: 'myceldomain',
  },
  {
    link: 'https://instagram.com/',
    icon: InstagramLogo,
    app: 'Instagram',
    id: 'mycel',
  },
  {
    link: 'https://facebook.com/',
    icon: FacebookLogo,
    app: 'Facebook',
    id: 'mycel',
  },
  {
    link: 'https://linkedin.com/in/',
    icon: LinkedinLogo,
    app: 'Linkedin',
    id: 'mycel',
  },
  {
    link: 'https://github.com/',
    icon: GithubLogo,
    app: 'Github',
    id: 'mycel-domain',
  },
]
