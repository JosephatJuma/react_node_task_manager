import React, { useEffect, useState } from "react";
import {
  SimpleGrid,
  Group,
  Stack,
  Chip,
  Grid,
  Title,
  Button,
} from "@mantine/core";
import { Popover, ActionIcon, Tooltip } from "@mantine/core";
import { Card, Text, Badge, Paper, Tabs, rem } from "@mantine/core";
import { createStyles, RingProgress } from "@mantine/core";
import { Calendar } from "@mantine/dates";

import axios from "axios";
import {
  IconCalendarDue,
  IconCalendarCheck,
  IconCalendarOff,
  IconHandMove,
  IconDots,
  IconTrash,
  IconEditCircle,
  IconEye,
  IconLayoutKanban,
  IconCalendarCog,
  IconPlus,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { view } from "../../state/reducers/viewTaskSlice";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { userTasks } from "../../state/reducers/tasksSlice";

const getChild = (component) => (
  <Card sx={{ maxHeight: 500, backgroundColor: "unset" }}>
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
    width: "45%",
    margin: 5,
    height: 200,
  },
  task: {
    borderWidth: 2,
    padding: 20,
    minHeight: 50,
    ":hover": { backgroundColor: "gold" },
    fontFamily: "Poppins",
    marginTop: 5,
  },
  taskGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { color: "#800080", fontWeight: "bold", fontSize: 18 },
}));
export function Dashboard({ user }) {
  const api_url = process.env.REACT_APP_API_URL;
  const { classes } = useStyles();

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.userTasks);

  const [currentCalendarDate, setCurrentCalenderDate] = useState(new Date());
  //fetch user tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${api_url}tasks/${user._id}`);
      dispatch(userTasks(response.data.tasks));
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
    return task.status === "Completed";
  });

  //get tasks of status -not startd
  const tasksNotStarted = tasks.filter((task) => {
    return task.status === "Not Started";
  });

  //get tasks fpr this month
  const tasksThisMonth = tasks.filter(
    (task) =>
      new Date(task.due_date).getMonth() === currentCalendarDate.getMonth()
  );
  //get tasks over due
  const tasksOverDue = tasks.filter((task) => {
    return new Date(task.due_date) < today && task.status === "Not Started";
  });
  return (
    <div style={{ width: "100%", margin: 10 }}>
      <Card shadow="lg" radius={"md"} m={10}>
        <Group sx={{ justifyContent: "space-between" }}>
          <Title color="#800080" size={20}>
            {today.getHours() < 12
              ? "Good Morning"
              : today.getHours() < 16
              ? "Good Afternoon"
              : "Good Evening"}{" "}
            {user.name}
            <IconHandMove />
          </Title>
          <Group>
            <ActionIcon>
              <IconSettings />
            </ActionIcon>
            <ActionIcon component={Link} to={"/profile"}>
              <IconUser />
            </ActionIcon>
          </Group>
        </Group>
      </Card>
      <SimpleGrid
        cols={2}
        breakpoints={[{ maxWidth: "xs", cols: 1, margin: 10 }]}
      >
        <Stack>
          {getChild(
            <Grid sx={{ justifyContent: "space-evenly" }}>
              <Card
                shadow="sm"
                padding="lg"
                radius="lg"
                withBorder
                className={classes.select}
              >
                <Group sx={{ flexDirection: "column" }}>
                  <IconCalendarDue size={50} />
                  <h4>Due Today</h4>
                </Group>
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
              <Card
                shadow="sm"
                padding="lg"
                radius="lg"
                withBorder
                className={classes.select}
              >
                <Group sx={{ flexDirection: "column" }}>
                  <IconCalendarCheck size={50} />
                  <h4> Today</h4>
                </Group>
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
            </Grid>
          )}

          {getChild(
            <Grid sx={{ justifyContent: "space-evenly" }}>
              <Card
                shadow="sm"
                padding="lg"
                radius="lg"
                withBorder
                className={classes.select}
              >
                <Group sx={{ flexDirection: "column" }}>
                  <IconCalendarOff size={50} />
                  <h4>Over due</h4>
                </Group>
                <RingProgress
                  roundCaps
                  thickness={10}
                  size={90}
                  sections={[
                    {
                      value: (tasksOverDue.length / tasks.length) * 100,
                      color: "gold",
                    },
                  ]}
                  label={
                    <div>
                      <Text ta="center" fz="lg" className={classes.label}>
                        {((tasksOverDue.length / tasks.length) * 100).toFixed(
                          0
                        )}
                        %
                      </Text>
                    </div>
                  }
                />
              </Card>
              <Card
                shadow="sm"
                padding="lg"
                radius="lg"
                withBorder
                className={classes.select}
              >
                <Group sx={{ flexDirection: "column" }}>
                  <IconCalendarCog size={50} />
                  <h4>This Month</h4>
                </Group>
                <RingProgress
                  roundCaps
                  thickness={10}
                  size={90}
                  sections={[
                    {
                      value: (tasksThisMonth.length / tasks.length) * 100,
                      color: "gold",
                    },
                  ]}
                  label={
                    <div>
                      <Text ta="center" fz="lg" className={classes.label}>
                        {((tasksThisMonth.length / tasks.length) * 100).toFixed(
                          0
                        )}
                        %
                      </Text>
                    </div>
                  }
                />
              </Card>
            </Grid>
          )}

          <Card radius={"lg"} shadow="xl">
            <Group
              display={"flex"}
              sx={{
                justifyContent: "space-between",
                padding: 20,
                alignSelf: "center",
              }}
            >
              <h3>Tasks</h3>
              <Button
                sx={{ backgroundColor: "#800080" }}
                leftIcon={<IconPlus />}
                component={Link}
                to={"/tasks/add"}
              >
                Add
              </Button>
            </Group>
            <Tabs
              defaultValue="all"
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
                <Tabs.Tab value="all">All</Tabs.Tab>
                <Tabs.Tab value="today">Tasks today</Tabs.Tab>
                <Tabs.Tab value="not started">Upcoming</Tabs.Tab>
                <Tabs.Tab value="completed">Completed</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="all" pt="xs">
                {tasks.length > 0 ? (
                  tasks.map((task, index) => {
                    return (
                      <Paper
                        shadow="sm"
                        padding="auto"
                        radius="lg"
                        withBorder
                        className={classes.task}
                        key={index}
                        component={Link}
                        to={`/tasks/view?task=${task._id}`}
                        onClick={() => dispatch(view(task))}
                      >
                        <Group className={classes.taskGroup}>
                          <IconLayoutKanban />
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
                                <ActionIcon
                                  component={Link}
                                  to={`/tasks/view?task=${task._id}`}
                                  onClick={() => dispatch(view(task))}
                                >
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
                          <IconLayoutKanban />
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
                                <ActionIcon
                                  component={Link}
                                  to={`/tasks/view?task=${task._id}`}
                                  onClick={() => dispatch(view(task))}
                                >
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
                          <IconLayoutKanban />
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
                                <ActionIcon
                                  component={Link}
                                  to={`/tasks/view?task=${task._id}`}
                                  onClick={() => dispatch(view(task))}
                                >
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
                          <IconLayoutKanban />
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
                                <ActionIcon
                                  component={Link}
                                  to={`/tasks/view?task=${task._id}`}
                                  onClick={() => dispatch(view(task))}
                                >
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
          <>
            <Card radius={"lg"}>
              <Calendar
                getDayProps={(day) => ({
                  selected: dates.some((s) => dayjs(day).isSame(s, "date")),
                })}
                color="red"
                sx={{ "::selection": { backgroundColor: "#800080" } }}
                onNextMonth={(value) => setCurrentCalenderDate(value)}
                onPreviousMonth={(value) => setCurrentCalenderDate(value)}
              />
            </Card>
            <Card radius={"lg"} mt={10}>
              <Title size={"sm"} color="#800080">
                Tasks this Month
              </Title>
              {tasksThisMonth.length > 0 ? (
                tasksThisMonth.map((task, index) => {
                  return (
                    <Badge
                      variant="gradient"
                      gradient={{ from: "#800080", to: "cyan" }}
                      key={index}
                      sx={{ cursor: "pointer" }}
                      component={Link}
                      to={`/tasks/view?task=${task._id}`}
                      onClick={() => dispatch(view(task))}
                    >
                      <Text>{task.title}</Text>
                    </Badge>
                  );
                })
              ) : (
                <Badge color="#800080">
                  <Text>
                    Good for you, no tasks for{" "}
                    {currentCalendarDate.toDateString()}
                  </Text>
                </Badge>
              )}
            </Card>
          </>
        )}
      </SimpleGrid>
    </div>
  );
}
