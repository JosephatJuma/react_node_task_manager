import React from "react";
import { AppHeader } from "../../components/navigation/Header";
import { SideBar } from "../../components/navigation/SideBar";
import {
  Card,
  Flex,
  Button,
  Group,
  Text,
  Badge,
  Image,
  createStyles,
  rem,
  Grid,
  SimpleGrid,
  ActionIcon,
  List,
  Avatar,
  Title,
  Center,
  Progress,
  Tabs,
  Timeline,
} from "@mantine/core";
import { useSelector } from "react-redux";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconList,
  IconLocation,
  IconPhoneCall,
  IconSettings,
  IconSocial,
  IconUser,
  IconUserCheck,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: "95%",
  },

  imageSection: {
    //padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    borderRadius: 0,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));
function Profile() {
  const { classes } = useStyles();
  const user = useSelector((state) => state.login.user);
  const initials = user.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
  return (
    <div>
      <AppHeader active={"Profile"} />
      <Flex>
        <SideBar active={"Profile"} />
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: "xs", cols: 1, margin: 10 }]}
          sx={{ width: "100%" }}
        >
          <Card
            withBorder
            radius="lg"
            shadow="lg"
            className={classes.card}
            sx={{ margin: 10 }}
          >
            <Card.Section className={classes.imageSection}>
              {user.image ? (
                <Image
                  src="https://i.imgur.com/ZL52Q2D.png"
                  alt="Cover Photo"
                />
              ) : (
                <Card
                  sx={{
                    backgroundColor: "#800080",
                    width: "100%",
                    height: 100,
                  }}
                  radius={0}
                ></Card>
              )}
            </Card.Section>
            <Avatar size={"xl"} mt={-50} radius={100} sx={{ borderWidth: 10 }}>
              {initials}
            </Avatar>
            <Group position="apart" mt="md">
              <div>
                <Text fw={500}>{user.name}</Text>
                <Text fz="xs" c="dimmed">
                  {user.email}
                </Text>
              </div>
              <Badge variant="outline">25% off</Badge>
            </Group>

            <Card.Section className={classes.section} mt="md">
              <Text fz="sm" c="dimmed" className={classes.label}>
                Basic configuration
              </Text>

              <Group spacing={8} mb={-8}></Group>
            </Card.Section>

            <Card.Section className={classes.section}>
              <Group spacing={30}>
                <div>
                  <Group>
                    <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                      0 Following
                    </Text>
                    <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                      0 Followers
                    </Text>
                  </Group>
                </div>

                <Button
                  radius="xl"
                  style={{ flex: 1, backgroundColor: "#800080" }}
                >
                  Add Profile Picture
                </Button>
              </Group>
              <Badge>Bio Here</Badge>
              <List>
                <IconPhoneCall />
              </List>
              <Group>
                <ActionIcon>
                  <IconBrandLinkedin />
                </ActionIcon>
                <ActionIcon>
                  <IconBrandTwitter />
                </ActionIcon>
                <ActionIcon>
                  <IconBrandFacebook />
                </ActionIcon>
                <ActionIcon>
                  <IconBrandGithub />
                </ActionIcon>
              </Group>
            </Card.Section>
          </Card>
          <Card
            withBorder
            radius="lg"
            shadow="lg"
            className={classes.card}
            sx={{ margin: 10 }}
          >
            <Tabs defaultValue="Profile">
              <Tabs.List>
                <Tabs.Tab icon={<IconUser size="0.8rem" />} value="Profile">
                  Profile
                </Tabs.Tab>
                <Tabs.Tab
                  icon={<IconSettings size="0.8rem" />}
                  value="settings"
                >
                  Settings
                </Tabs.Tab>
                <Tabs.Tab icon={<IconList size="0.8rem" />} value="backlog">
                  Backlog
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="Profile">
                <Timeline active={1} bulletSize={24} lineWidth={2}>
                  <Timeline.Item
                    bullet={<IconUserCheck size={12} />}
                    title="Create Account"
                  >
                    <Text color="dimmed" size="sm">
                      You&apos;ve created new branch{" "}
                      <Text variant="link" component="span" inherit>
                        fix-notifications
                      </Text>{" "}
                      from master
                    </Text>
                    <Text size="xs" mt={4}>
                      2 hours ago
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item
                    bullet={<IconSocial size={12} />}
                    title="Socials"
                  >
                    <Text color="dimmed" size="sm">
                      You&apos;ve pushed 23 commits to
                      <Text variant="link" component="span" inherit>
                        fix-notifications branch
                      </Text>
                    </Text>
                    <Text size="xs" mt={4}>
                      52 minutes ago
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item
                    title="Pull request"
                    bullet={<IconLocation size={12} />}
                    lineVariant="dashed"
                  >
                    <Text color="dimmed" size="sm">
                      You&apos;ve submitted a pull request
                      <Text variant="link" component="span" inherit>
                        Fix incorrect notification message (#187)
                      </Text>
                    </Text>
                    <Text size="xs" mt={4}>
                      34 minutes ago
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item
                    title="Code review"
                    bullet={<IconPhoneCall size={12} />}
                  >
                    <Text color="dimmed" size="sm">
                      <Text variant="link" component="span" inherit>
                        Robert Gluesticker
                      </Text>{" "}
                      left a code review on your pull request
                    </Text>
                    <Text size="xs" mt={4}>
                      12 minutes ago
                    </Text>
                  </Timeline.Item>
                </Timeline>
              </Tabs.Panel>
              <Tabs.Panel value="backlog" pt="xs">
                <Center>
                  <Title sx={{ textTransform: "uppercase", color: "#800080" }}>
                    My backlog
                  </Title>
                </Center>
                <Group>
                  <Text>Gruop Name</Text>
                  <Avatar.Group spacing="sm">
                    <Avatar src="image.png" radius="xl" />
                    <Avatar src="image.png" radius="xl" />
                    <Avatar src="image.png" radius="xl" />
                    <Avatar radius="xl">+5</Avatar>
                  </Avatar.Group>
                  <Progress />
                </Group>
              </Tabs.Panel>
            </Tabs>
          </Card>
        </SimpleGrid>
      </Flex>
    </div>
  );
}

export default Profile;
