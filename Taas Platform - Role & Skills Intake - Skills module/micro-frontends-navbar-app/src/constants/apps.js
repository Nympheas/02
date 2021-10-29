/**
 * Config for the All Apps menu.
 */
import appDocumentationIcon from "../assets/images/learn.svg";
import appTaasIcon from "../assets/images/integrations.svg";
import myteamsIcon from "../assets/images/my-teams.svg";
import myteamsGreenIcon from "../assets/images/my-teams-green.svg";

/**
 * Micro-app categories
 */
export const APP_CATEGORIES = [
  {
    category: "Manage",
    apps: [
      {
        title: "TaaS",
        icon: appTaasIcon,
        path: "/taas/myteams",
        menu: [
          {
            title: "My Teams",
            path: "/taas/myteams",
            icon: myteamsIcon,
            activeIcon: myteamsGreenIcon,
          },
        ],
      },
      {
        title: "Documentation",
        icon: appDocumentationIcon,
        path: "/model",
        menu: []
      },
      {
        title: "Community Admin",
        icon: myteamsIcon,
        path: "/community-admin",
        menu: []
      }
    ]
  }
];
