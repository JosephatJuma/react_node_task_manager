import React from "react";
import {
  SimpleGrid,
  Skeleton,
  Container,
  Stack,
  useMantineTheme,
  px,
  Card,
  Text,
  Button,
  createStyles,
  RingProgress,
} from "@mantine/core";
import {
  IconCalendarDue,
  IconCalendarCheck,
  IconCalendarOff,
  IconHandMove,
} from "@tabler/icons-react";

const getChild = (height, component) => (
  <Card radius={"lg"}>
    <Card.Section>{component}</Card.Section>
  </Card>
);
const BASE_HEIGHT = 360;
const getSubHeight = (children, spacing) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);
const useStyles = createStyles((theme) => ({
  select: {
    display: "flex",
    alignItems: "center",
    color: "green",

    cursor: "pointer",
    justifyContent: "space-between",
    // backgroundImage: theme.fn.linearGradient(
    //   1,
    //   theme.colors.blue[6],
    //   theme.colors.green[6]
    // ),
    ":hover": {
      color: "white",
      backgroundColor: "#800080",
    },
  },
}));
export function Dashboard({ user }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [tasks, setTasks] = React.useState([
    {
      title: "Write a blog post",
      description: "This is a blog post about the importance of data science.",
      due_date: "2023-07-15",
      status: "In progress",
    },
    {
      title: "Meet with client",
      description:
        "This is a meeting with the client to discuss their data science needs.",
      due_date: "2023-07-18",
      status: "Pending",
    },
    {
      title: "Give a presentation",
      description:
        "This is a presentation about data science for a local business.",
      due_date: "2023-07-20",
      status: "Completed",
    },
  ]);
  return (
    <div style={{ width: "100%", margin: 10 }}>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
        <Stack>
          <h4 style={{ color: "blue" }}>
            Hello,
            {user.first_name + " " + user.last_name}
            <IconHandMove />
          </h4>
          {getChild(
            getSubHeight(3, px(theme.spacing.md)),
            <Card
              shadow="sm"
              padding="lg"
              radius="lg"
              withBorder
              className={classes.select}
            >
              <>
                <IconCalendarDue />
                <h4>Due Today</h4>
              </>
              <RingProgress
                roundCaps
                thickness={10}
                size={90}
                sections={[
                  {
                    value: (20 / 100) * 100,
                    color: theme.primaryColor,
                  },
                ]}
                label={
                  <div>
                    <Text ta="center" fz="lg" className={classes.label}>
                      {((20 / 100) * 100).toFixed(0)}%
                    </Text>
                    <Text ta="center" fz="xs" c="dimmed">
                      Due
                    </Text>
                  </div>
                }
              />
            </Card>
          )}
          {getChild(
            getSubHeight(3, px(theme.spacing.md)),
            <Card
              shadow="sm"
              padding="lg"
              radius="lg"
              withBorder
              className={classes.select}
            >
              <>
                <IconCalendarCheck />
                <h4>Completed Today</h4>
              </>
              <RingProgress
                roundCaps
                thickness={10}
                size={90}
                sections={[
                  {
                    value: (80 / 100) * 100,
                    color: theme.primaryColor,
                  },
                ]}
                label={
                  <div>
                    <Text ta="center" fz="lg" className={classes.label}>
                      {((80 / 100) * 100).toFixed(0)}%
                    </Text>
                    <Text ta="center" fz="xs" c="dimmed">
                      Completed
                    </Text>
                  </div>
                }
              />
            </Card>
          )}
          {getChild(
            getSubHeight(3, px(theme.spacing.md)),
            <Card
              shadow="sm"
              padding="lg"
              radius="lg"
              withBorder
              className={classes.select}
            >
              <>
                <IconCalendarOff />
                <h4>Over due</h4>
              </>
              <RingProgress
                roundCaps
                thickness={10}
                size={90}
                sections={[
                  {
                    value: (1 / 100) * 100,
                    color: theme.primaryColor,
                  },
                ]}
                label={
                  <div>
                    <Text ta="center" fz="lg" className={classes.label}>
                      {((1 / 100) * 100).toFixed(0)}%
                    </Text>
                    <Text ta="center" fz="xs" c="dimmed">
                      Over due
                    </Text>
                  </div>
                }
              />
            </Card>
          )}
        </Stack>
        {getChild(
          BASE_HEIGHT,
          <>
            <h3>Upcoming Tasks</h3>
            {tasks.map((task, index) => {
              return (
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="lg"
                  withBorder
                  sx={{ margin: 10 }}
                  key={index}
                >
                  <Text>{task.title}</Text>
                </Card>
              );
            })}
            <Button>Add new task</Button>
          </>
        )}
      </SimpleGrid>
    </div>
  );
}
