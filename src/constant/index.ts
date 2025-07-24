// { label: 'Overview', path: '/overview', icon: 'overview', roles: ['admin', 'editor', 'viewer'] },

import { AudioWaveform, BookOpen, Bot, Command, LucideClockAlert, PersonStanding, Settings2, SquareTerminal, User } from "lucide-vue-next";

//constrant

export const CLIENT_USER_REDIRECT_AFTER_LOGIN = "/client/overview";
export const CLIENT_USER_REDIRECT_AFTER_REGISTER = "/clients/auth/login";
export const CLIENT_LOGIN = "/auth/client/login";
export const CLIENT_REGISTER = "/auth/client/signup";

export const CLIENT_SIDEBAR = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/logo/icon.svg',
  },
  teams: [
    {
      name: 'Client',
      logo: PersonStanding,
      plan: 'Client',
    },
  ],
  navMain: [
    {
      title: 'Overview',
      url: '/client/overview',
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: 'Campaigns',
      url: '/client/campaigns',
      icon: Bot,
    },
    {
      title: 'Ads',
      url: '/client/ads',
      icon: BookOpen,
    
    },
      {
      title: 'Billing',
      url: '/client/billing-details',
      icon: BookOpen,
      
  
    },
    {
      title: 'accounts',
      url: '/client/accounts',
      icon: Settings2,
      
   
    },
  ],
  users: [
     {
      name: 'Roles & Permissions',
      url: '/client/roles',
      icon: LucideClockAlert,
    },
    {
      name: 'Users',
      url: '/client/users',
      icon: User,
    },
    {
      name: 'Settings',
      url: '/client/settings',
      icon: Settings2,
    }
   
  ],
}

export const PartnerMenu = [
  { label: "Overview", path: "/overview", icon: "overview" },
  { label: "Campaigns", path: "/campaigns", icon: "campaigns" },
  { label: "Ads", path: "ads", icon: "ads" },
  { label: "Accounts", path: "accounts", icon: "accounts" },
  { label: "Billing", path: "billing", icon: "billing" },
];
