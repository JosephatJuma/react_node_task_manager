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
} from "@mantine/core";
import { useSelector } from "react-redux";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconPhoneCall,
} from "@tabler/icons-react";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: "100%",
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
            radius="md"
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
            radius="md"
            className={classes.card}
            sx={{ margin: 10 }}
          >
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
          </Card>
        </SimpleGrid>
      </Flex>
    </div>
  );
}

export default Profile;
