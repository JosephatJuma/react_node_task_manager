import React, { useState, useEffect } from "react";
import {
  SimpleGrid,
  Group,
  Stack,
  px,
  Button,
  Chip,
  Popover,
  ActionIcon,
  Tooltip,
  Modal,
} from "@mantine/core";
import { Card, Text, Badge, Paper, Tabs, rem } from "@mantine/core";
import { createStyles, useMantineTheme, RingProgress } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { AddTaskForm } from "./AddTaskForm";
import axios from "axios";
import {
  IconCalendarDue,
  IconCalendarCheck,
  IconCalendarOff,
  IconHandMove,
  IconSubtask,
  IconDots,
  IconTrash,
  IconEditCircle,
  IconEye,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
const getChild = (height, component) => (
  <Card radius={"lg"} shadow="md">
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
    ":hover": {
      color: "white",
      backgroundColor: "#800080",
    },
  },
  task: {
    margin: 10,
    borderWidth: 2,
    padding: 20,
    minHeight: 50,
    ":hover": { backgroundColor: "gold" },
  },
  taskGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { color: "#800080", fontWeight: "bold", fontSize: 18 },
}));
export function Dashboard({ user }) {
  const [opened, { open, close }] = useDisclosure(false); //for the model
  const [allowDel, setAllowDel] = useState(false);
  const api_url = process.env.REACT_APP_API_URL;
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

  //fetch user tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${api_url}tasks/${user._id}`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchTasks();
  });

  //send a task delete request
  const deleteTask = async (taskId) => {
    try {
      const del = await axios.delete(`${api_url}tasks/${taskId}`);
      if (del.data) {
        console.log(del.data);
      }
    } catch (error) {
      console.log("Error occured");
    }
  };

  //filter tasks for today
  const today = new Date();

  const tasksToday = tasks.filter((task) => {
    const taskDate = new Date(task.due_date);
    return taskDate.toDateString() === today.toDateString();
  });
  //get dates that have tasks on them
  const dates = tasks.map((task) => task.due_date);

  //get tasks of status -Completetd
  const tasksCompleted = tasks.filter((task) => {
    return task.status === "Complted";
  });

  //get tasks of status -not startd
  const tasksNotStarted = tasks.filter((task) => {
    return task.status === "Not Started";
  });

  return (
    <div style={{ width: "100%", margin: 10 }}>
      <h3 style={{ color: "#800080" }}>
        Hello,
        {user.name}
        <IconHandMove />
      </h3>
      <SimpleGrid
        cols={2}
        breakpoints={[{ maxWidth: "xs", cols: 1, margin: 10 }]}
      >
        <Stack>
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
                <IconCalendarDue size={50} />
                <h4>Due Today</h4>
              </>
              <RingProgress
                roundCaps
                thickness={10}
                size={90}
                sections={[
                  {
                    value: (tasksToday.length / tasks.length) * 100,
                    color: "gold",
                  },
                ]}
                label={
                  <div>
                    <Text ta="center" fz="lg" className={classes.label}>
                      {((tasksToday.length / tasks.length) * 100).toFixed(0)}%
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
                <IconCalendarCheck size={50} />
                <h4>Completed Today</h4>
              </>
              <RingProgress
                roundCaps
                thickness={10}
                size={90}
                sections={[
                  {
                    value: (80 / 100) * 100,
                    color: "gold",
                  },
                ]}
                label={
                  <div>
                    <Text ta="center" fz="lg" className={classes.label}>
                      {((80 / 100) * 100).toFixed(0)}%
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
                <IconCalendarOff size={50} />
                <h4>Over due</h4>
              </>
              <RingProgress
                roundCaps
                thickness={10}
                size={90}
                sections={[
                  {
                    value: (1 / 100) * 100,
                    color: "gold",
                  },
                ]}
                label={
                  <div>
                    <Text ta="center" fz="lg" className={classes.label}>
                      {((1 / 100) * 100).toFixed(0)}%
                    </Text>
                  </div>
                }
              />
            </Card>
          )}
          <Card radius={"lg"}>
            <Group
              display={"flex"}
              sx={{
                justifyContent: "space-between",
                padding: 20,
                alignSelf: "center",
              }}
            >
              <h3>Tasks</h3>
              <AddTaskForm />
            </Group>
            <Tabs
              defaultValue="today"
              unstyled
              styles={(theme) => ({
                tab: {
                  ...theme.fn.focusStyles(),
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.white,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.colors.gray[9],
                  border: `${rem(1)} solid ${
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[4]
                  }`,
                  padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                  cursor: "pointer",
                  fontSize: theme.fontSizes.sm,
                  display: "flex",
                  alignItems: "center",

                  "&:disabled": {
                    opacity: 0.5,
                    cursor: "not-allowed",
                  },

                  "&:not(:first-of-type)": {
                    borderLeft: 0,
                  },

                  "&:first-of-type": {
                    borderTopLeftRadius: theme.radius.md,
                    borderBottomLeftRadius: theme.radius.md,
                  },

                  "&:last-of-type": {
                    borderTopRightRadius: theme.radius.md,
                    borderBottomRightRadius: theme.radius.md,
                  },

                  "&[data-active]": {
                    backgroundColor: "#800080",
                    borderColor: theme.colors.blue[7],
                    color: theme.white,
                  },
                },
                tabIcon: {
                  marginRight: theme.spacing.xs,
                  display: "flex",
                  alignItems: "center",
                },

                tabsList: {
                  display: "flex",
                },
              })}
            >
              <Tabs.List>
                <Tabs.Tab value="today">Tasks today</Tabs.Tab>
                <Tabs.Tab value="not started">Upcoming</Tabs.Tab>
                <Tabs.Tab value="completed">Completed</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="today" pt="xs">
                {tasksToday.length > 0 ? (
                  tasksToday.map((task, index) => {
                    return (
                      <Paper
                        shadow="sm"
                        padding="auto"
                        radius="lg"
                        withBorder
                        className={classes.task}
                        key={index}
                      >
                        <Group className={classes.taskGroup}>
                          <IconSubtask />
                          <Text size={"lg"} fw={"bold"} color="#800080">
                            {task.title}
                          </Text>
                        </Group>
                        <Group className={classes.taskGroup}>
                          <Popover withArrow>
                            <Popover.Target>
                              <Chip checked={false}>
                                <IconDots />
                              </Chip>
                            </Popover.Target>
                            <Popover.Dropdown>
                              <Text>Actions</Text>
                              <Tooltip label="View Task">
                                <ActionIcon>
                                  <IconEye size={14} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Edit Task">
                                <ActionIcon>
                                  <IconEditCircle size={14} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Delete Task">
                                <ActionIcon
                                  onClick={() => deleteTask(task._id)}
                                >
                                  <IconTrash size={14} />
                                </ActionIcon>
                              </Tooltip>
                            </Popover.Dropdown>
                          </Popover>
                          <Badge>
                            <Text>{task.status}</Text>
                          </Badge>
                        </Group>
                      </Paper>
                    );
                  })
                ) : (
                  <Text className={classes.title}>You have no tasks today</Text>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="not started" pt="xs">
                {tasksNotStarted.length > 0 ? (
                  tasksNotStarted.map((task, index) => {
                    return (
                      <Paper
                        shadow="sm"
                        padding="auto"
                        radius="lg"
                        withBorder
                        className={classes.task}
                        key={index}
                      >
                        <Group className={classes.taskGroup}>
                          <IconSubtask />
                          <Text size={"lg"} fw={"bold"} color="#800080">
                            {task.title}
                          </Text>
                        </Group>
                        <Group className={classes.taskGroup}>
                          <Popover withArrow>
                            <Popover.Target>
                              <Chip checked={false}>
                                <IconDots />
                              </Chip>
                            </Popover.Target>
                            <Popover.Dropdown>
                              <Text>Actions</Text>
                              <Tooltip label="View Task">
                                <ActionIcon>
                                  <IconEye size={14} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Edit Task">
                                <ActionIcon>
                                  <IconEditCircle size={14} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Delete Task">
                                <ActionIcon
                                  onClick={() => deleteTask(task._id)}
                                >
                                  <IconTrash size={14} />
                                </ActionIcon>
                              </Tooltip>
                            </Popover.Dropdown>
                          </Popover>
                          <Badge>
                            <Text>{task.status}</Text>
                          </Badge>
                        </Group>
                      </Paper>
                    );
                  })
                ) : (
                  <Text className={classes.title}>
                    There are no upcming tasks
                  </Text>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="completed" pt="xs">
                {tasksCompleted.length > 0 ? (
                  tasksCompleted.map((task, index) => {
                    return (
                      <Paper
                        shadow="sm"
                        padding="auto"
                        radius="lg"
                        withBorder
                        className={classes.task}
                        key={index}
                      >
                        <Group className={classes.taskGroup}>
                          <IconSubtask />
                          <Text size={"lg"} fw={"bold"} color="#800080">
                            {task.title}
                          </Text>
                        </Group>
                        <Group className={classes.taskGroup}>
                          <Popover withArrow>
                            <Popover.Target>
                              <Chip checked={false}>
                                <IconDots />
                              </Chip>
                            </Popover.Target>
                            <Popover.Dropdown>
                              <Text>Actions</Text>
                              <Tooltip label="View Task">
                                <ActionIcon>
                                  <IconEye size={14} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Edit Task">
                                <ActionIcon>
                                  <IconEditCircle size={14} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Delete Task">
                                <ActionIcon
                                  onClick={() => deleteTask(task._id)}
                                >
                                  <IconTrash size={14} />
                                </ActionIcon>
                              </Tooltip>
                            </Popover.Dropdown>
                          </Popover>
                          <Badge>
                            <Text>{task.status}</Text>
                          </Badge>
                        </Group>
                      </Paper>
                    );
                  })
                ) : (
                  <Text className={classes.title}>There are no completed</Text>
                )}
              </Tabs.Panel>
            </Tabs>
          </Card>
        </Stack>
        {getChild(
          BASE_HEIGHT,
          <>
            <Group position="center">
              <Calendar
                getDayProps={(day) => ({
                  selected: dates.some((s) => dayjs(day).isSame(s, "date")),
                })}
                sx={{ "::selection": { backgroundColor: "#800080" } }}
              />
            </Group>
          </>
        )}
      </SimpleGrid>

      {/* Delete Action Model */}
      {/* <Modal opened={opened} onClose={close} title="Authentication" centered>
        <Text>Are you sure you want do delete thias Task</Text>
        <Button leftIcon={<IconTrash />} onClick={() => setAllowDel(true)}>
          Delete
        </Button>
      </Modal> */}
    </div>
  );
}
