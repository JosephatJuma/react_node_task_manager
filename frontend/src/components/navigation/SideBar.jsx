import { createStyles, Navbar, getStylesRef, rem } from "@mantine/core";
import { IconSwitchHorizontal, IconLogout } from "@tabler/icons-react";
import { ScrollArea } from "@mantine/core";
import { data } from "../shared/data";
import { Link, NavLink } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 30,
    // backgroundImage: theme.fn.linearGradient(
    //   5,
    //   theme.colors.green[6],
    //   theme.colors.blue[6]
    // ),

    backgroundColor: "#fff",
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
    color: "GrayText",
  },

  version: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background,
      0.1
    ),
    color: theme.white,
    fontWeight: 700,
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: "#800080" }).background,
      0.1
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: "GrayText",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: "#800080",
      color: "white",
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: "#800080",
      [`& .${getStylesRef("icon")}`]: {
        opacity: 0.9,
      },
    },
    color: "white",
  },
}));

export function SideBar({ active }) {
  const { classes, cx } = useStyles();
  //const [active, setActive] = useState("Home");

  const links = data.map((item) => (
    <NavLink
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      // onClick={(event) => {
      //   setActive(item.label);
      // }}
      component={Link}
      to={item.link}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <Navbar
      width={{ sm: 240 }}
      p="md"
      className={classes.navbar}
      sx={{ position: "sticky" }}
      shadow="lg"
    >
      <ScrollArea h={"100%"}>
        <Navbar.Section className={classes.header}>{links}</Navbar.Section>
        <Navbar.Section className={classes.footer}>
          <Link
            to={"/"}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </Link>

          <a
            href="/"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </Navbar.Section>
      </ScrollArea>
    </Navbar>
  );
}
