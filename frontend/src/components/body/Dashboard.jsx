import React, { useState } from "react";
import {
  SimpleGrid,
  Skeleton,
  Container,
  Group,
  Stack,
  useMantineTheme,
  px,
  Card,
  Text,
  Button,
  createStyles,
  RingProgress,
  TextInput,
  Drawer,
} from "@mantine/core";
import { Calendar, DateInput, DatePicker, TimeInput } from "@mantine/dates";
import { Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconCalendarDue,
  IconCalendarCheck,
  IconCalendarOff,
  IconHandMove,
  IconPlus,
} from "@tabler/icons-react";

import dayjs from "dayjs";
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
  const [date, setDate] = useState(null > "");
  const [selected, setSelected] = useState([]);
  const handleSelect = (date) => {
    const isSelected = selected.some((s) => dayjs(date).isSame(s, "date"));
    if (isSelected) {
      setSelected((current) =>
        current.filter((d) => !dayjs(d).isSame(date, "date"))
      );
    } else {
      setSelected((current) => [...current, date]);
    }
  };
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
  const [modalOpen, { open, close }] = useDisclosure(false);
  //const [opened, { open, close }] = useDisclosure(false);
  return (
    <div style={{ width: "100%", margin: 10 }}>
      <h3 style={{ color: "#800080" }}>
        Hello,
        {user.first_name + " " + user.last_name}
        <IconHandMove />
      </h3>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
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
            <Group position="center">
              <Calendar
                getDayProps={(date) => ({
                  selected: selected.some((s) => dayjs(date).isSame(s, "date")),
                  onClick: () => handleSelect(date),
                })}
                styles={{
                  calendarHeader: { color: "#800080" },
                  calendar: {
                    color: "#800080",
                  },
                }}
              />
              {/* <DatePicker value={date} onChange={setDate} /> */}
            </Group>
            <Group
              display={"flex"}
              sx={{
                justifyContent: "space-between",
                padding: 20,
                alignSelf: "center",
              }}
            >
              <h3>Upcoming Tasks</h3>
              <Button
                onClick={open}
                sx={{ backgroundColor: "#800080" }}
                leftIcon={<IconPlus />}
              >
                Add new task
              </Button>
            </Group>
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
          </>
        )}
      </SimpleGrid>
      <Drawer
        opened={modalOpen}
        onClose={close}
        title="Create New Task"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        transitionProps={{
          transition: "slide-left",
          duration: 150,
          timingFunction: "linear",
        }}
        position="right"
        size={theme.fn.largerThan("sm") ? "sm" : "lg"}
      >
        <form>
          <TextInput placeholder="Title" label="Title:" />
          <TextInput placeholder="Title" label="Description:" />
          <Group sx={{ width: "100%" }}>
            <DateInput
              value={date}
              onChange={setDate}
              label="Due Date"
              placeholder="2023-20-12"
            />
            <TimeInput label="Due Time" />
          </Group>
          <Button
            sx={{ backgroundColor: "#800080", width: "100%", marginTop: 20 }}
          >
            Save Task
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
