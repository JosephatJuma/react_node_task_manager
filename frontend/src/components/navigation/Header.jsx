import { useState } from "react";

import { data } from "../shared/data";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Drawer,
  rem,
  TextInput,
  Menu,
  UnstyledButton,
  Avatar,
  Text,
  Navbar,
  Flex,
  getStylesRef,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconMessage,
  IconStar,
  IconLogout,
  IconSettings,
  IconChevronDown,
  IconBell,
} from "@tabler/icons-react";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
    padding: 0,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    margin: "auto",
    width: "100%",
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  logo: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  searchInput: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  drawer: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },
  navbar: {
    paddingTop: 100,
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      ),
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.15
      ),
      [`& .${getStylesRef("icon")}`]: {
        opacity: 0.9,
      },
    },
  },
}));

export function AppHeader() {
  const [opened, { open, close }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const user = {
    name: "juma josephat",
    image:
      "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=612x612&w=0&k=20&c=eU56mZTN4ZXYDJ2SR2DFcQahxEnIl3CiqpP3SOQVbbI=",
  };
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Home");

  return (
    <>
      <Header height={HEADER_HEIGHT} className={classes.root}>
        <Container className={classes.header} size={"98%"}>
          <h2 className={classes.logo}>Logo here</h2>
          <Burger onClick={open} className={classes.burger} size="sm" />
          <Group>
            <TextInput
              placeholder="Search for task"
              icon={<IconSearch />}
              className={classes.searchInput}
            />
            <Group>
              <IconBell />
              <IconMessage />
            </Group>
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group spacing={7}>
                    <Avatar
                      src={user.image}
                      alt={user.name}
                      radius="xl"
                      size={50}
                    />

                    <IconChevronDown size={rem(12)} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<IconStar size="0.9rem" stroke={1.5} />}>
                  Saved posts
                </Menu.Item>
                <Menu.Item icon={<IconMessage size="0.9rem" stroke={1.5} />}>
                  Your comments
                </Menu.Item>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
                  Account settings
                </Menu.Item>
                <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />}>
                  Logout
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Danger zone</Menu.Label>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
      </Header>
      <Drawer
        opened={opened}
        onClose={close}
        size={"xs"}
        transitionProps={{
          transition: "rotate-left",
          duration: 150,
          timingFunction: "linear",
        }}
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <Drawer.Content className={classes.drawer}>
          <Navbar className={classes.navbar}>
            <Navbar.Section>
              {data.map((item) => {
                return (
                  <a
                    className={cx(classes.link, {
                      [classes.linkActive]: item.label === active,
                    })}
                    href={item.link}
                    key={item.label}
                    onClick={(event) => {
                      event.preventDefault();
                      setActive(item.label);
                    }}
                  >
                    <Flex>
                      <item.icon className={classes.linkIcon} stroke={1.5} />
                      <Text>{item.label}</Text>
                    </Flex>
                  </a>
                );
              })}
            </Navbar.Section>
          </Navbar>
        </Drawer.Content>
      </Drawer>
    </>
  );
}
