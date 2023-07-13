import { useState } from "react";
import logo from "../../img/logo.png";
import logo2 from "../../img/logo2.png";
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
  Image,
  Indicator,
  Dialog,
  Button,
} from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconSearch,
  IconMessage,
  IconStar,
  IconLogout,
  IconSettings,
  IconChevronDown,
  IconBell,
  IconSwitchHorizontal,
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
    width: "100%",
    backgroundColor: "#800080",
    color: "white",
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
    color: "white",
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
    [theme.fn.largerThan("sm")]: {
      visibility: "hidden",
    },
    alignContent: "start",
  },
  navbar: {
    padding: 10,
    backgroundColor: "#fff",
    color: "GrayText",
  },
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: "#800080",
      color: "white",
    },
  },
  headerIcon: {
    cursor: "pointer",
    "&:hover": {
      fill: "white",
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
      color: "white",
    },
  },
  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background,
      0.1
    )}`,
  },
}));

export function AppHeader() {
  const [opened, { open, close }] = useDisclosure(false);
  const [dialog, setDialog] = useState(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const user = {
    name: "juma josephat",
    image:
      "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=612x612&w=0&k=20&c=eU56mZTN4ZXYDJ2SR2DFcQahxEnIl3CiqpP3SOQVbbI=",
  };
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Home");
  const mobile = useMediaQuery("(max-width: 48.25em)");
  //const [mobile, setMobile] = useState(useMantineTheme().fn.smallerThan("sm"));
  return (
    <>
      <Header
        height={HEADER_HEIGHT}
        className={classes.root}
        sx={{ position: "sticky" }}
      >
        <Container className={classes.header} size={"98%"}>
          <Image src={logo} width={100} alt="LOGO" className={classes.logo} />

          <Burger
            onClick={open}
            className={classes.burger}
            size="lg"
            color="white"
          />
          <Group>
            <TextInput
              placeholder="Search for task"
              icon={<IconSearch />}
              className={classes.searchInput}
            />
            <Group>
              <Indicator inline label="10" size={16} radius={"lg"}>
                <IconBell className={classes.headerIcon} />
              </Indicator>
              <IconMessage className={classes.headerIcon} />
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
                <Menu.Item
                  icon={<IconLogout size="0.9rem" stroke={1.5} />}
                  onClick={() => setDialog(true)}
                >
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
        opened={mobile ? opened : false}
        onClose={close}
        size={"xs"}
        transitionProps={{
          transition: "slide-right",
          duration: 150,
          timingFunction: "linear",
        }}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        sx={{ backgroundColor: "red" }}
        withCloseButton={false}
      >
        <Drawer.Content className={classes.drawer}>
          <Navbar className={classes.navbar}>
            <Image src={logo2} width={100} alt="LOGO" />
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
            <Navbar.Section className={classes.footer}>
              <a
                href="/"
                className={classes.link}
                onClick={(event) => event.preventDefault()}
              >
                <IconSwitchHorizontal
                  className={classes.linkIcon}
                  stroke={1.5}
                />
                <span>Change account</span>
              </a>

              <a
                href="/"
                className={classes.link}
                onClick={(event) => event.preventDefault()}
              >
                <IconLogout className={classes.linkIcon} stroke={1.5} />
                <span>Logout</span>
              </a>
            </Navbar.Section>
          </Navbar>
        </Drawer.Content>
      </Drawer>
      <Dialog
        opened={dialog}
        withCloseButton
        onClose={() => setDialog(false)}
        size="lg"
        radius="md"
        sx={{ backgroundColor: "red", color: "white" }}
      >
        <Text size="sm" mb="xs" weight={500}>
          Sure, you want quit?
        </Text>

        <Group align="flex-end">
          <Button onClick={close}>Logout</Button>
        </Group>
      </Dialog>
    </>
  );
}
