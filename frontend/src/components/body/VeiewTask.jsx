import React from "react";
import { ActionIcon, Progress, Text, Title } from "@mantine/core";
import {
  rem,
  Card,
  Image,
  Group,
  Badge,
  Button,
  createStyles,
} from "@mantine/core";

import {
  IconArrowBack,
  IconCalendar,
  IconClock,
  IconEdit,
  IconError404,
  IconHeart,
  IconTrash,
} from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { view } from "../../state/reducers/viewTaskSlice";
import { AppHeader } from "../navigation/Header";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    margin: 20,
    padding: 20,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

function VeiewTask() {
  const dispatch = useDispatch();
  const api_url = process.env.REACT_APP_API_URL;
  const { classes, theme } = useStyles();

  const task = useSelector((state) => state.view.task);
  //send a task delete request
  const deleteTask = async () => {
    try {
      const del = await axios.delete(`${api_url}tasks/${task._id}`);
      if (del.data) {
        console.log(del.data);
        dispatch(view(null));
      }
    } catch (error) {
      console.log("Error occured");
    }
  };

  //update status
  const updateTask = async (field) => {
    try {
      const update = await axios.patch(`${api_url}tasks/${task._id}`, field);
      if (update.data) {
        console.log(update.data);
        dispatch(view({ ...task, status: field.value })); //update the selected item
      }
    } catch (error) {
      console.log("Error occured");
    }
  };
  return (
    <div>
      <AppHeader />
      <ActionIcon
        component={Link}
        to={"/"}
        sx={{
          backgroundColor: "#800080",
          color: "white",
          margin: 20,
          ":hover": { backgroundColor: "black" },
        }}
      >
        <IconArrowBack size={40} />
      </ActionIcon>
      {task === null ? (
        <Card
          radius="md"
          p="md"
          className={classes.card}
          sx={{
            backgroundColor: "unset",
            alignContent: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Title color="#800080">Error</Title>
          <Image src={"../../img/404.jpg"} alt="Error image" />
          <IconError404 size={300} color="#800080" />
          <Text>The Task you are looking for is currently unavailable</Text>
        </Card>
      ) : (
        <Card
          withBorder
          radius="md"
          p="md"
          className={classes.card}
          shadow="lg"
        >
          <Card.Section>
            <Card
              height={180}
              sx={{
                backgroundColor: task.color,
              }}
            >
              <Title color="white">{task.title}</Title>
            </Card>
          </Card.Section>

          <Card.Section className={classes.section} mt="md">
            <Group position="apart">
              <Text fz="lg" fw={500}>
                {task.title}
              </Text>
              <Badge size="sm">{task.status}</Badge>
            </Group>
            <Text fz="sm" mt="xs">
              {task.description}
            </Text>
            <Group>
              <IconCalendar color={task.color} />
              <Text>{new Date(task.due_date).toDateString()}</Text>
            </Group>
            <Group>
              <IconClock color={task.color} />
              <Text>{task.due_time}</Text>
            </Group>
          </Card.Section>

          <Card.Section className={classes.section}>
            <Text mt="md" className={classes.label} c="dimmed">
              {task.label}
            </Text>

            <Text c="dimmed" fz="sm" mt="md">
              Task Priority:{" "}
              <Text
                span
                fw={500}
                sx={(theme) => ({
                  color:
                    theme.colorScheme === "dark" ? theme.white : theme.black,
                })}
              >
                {task.priority}%
              </Text>
            </Text>
            <Progress value={task.priority} color={task.color} />
          </Card.Section>

          <Group mt="xs">
            {task.status === "In Progress" && (
              <Button
                radius="md"
                style={{ flex: 1 }}
                sx={{ backgroundColor: task.color }}
                onClick={() =>
                  updateTask({
                    field: "status",
                    value: "Completed",
                  })
                }
              >
                Mark as completed
              </Button>
            )}
            {task.status === "Not Started" && (
              <Button
                radius="md"
                style={{ flex: 1 }}
                sx={{ backgroundColor: task.color }}
                onClick={() =>
                  updateTask({
                    field: "status",
                    value: "In Progress",
                  })
                }
              >
                Mark as In Progress
              </Button>
            )}
            {task.status === "Completed" && (
              <Button
                radius="md"
                style={{ flex: 1 }}
                sx={{ backgroundColor: task.color }}
                onClick={() =>
                  updateTask({
                    field: "status",
                    value: "Not Started",
                  })
                }
              >
                Mark In Not Started
              </Button>
            )}
            <ActionIcon variant="default" radius="md" size={36}>
              <IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              variant="default"
              radius="md"
              size={36}
              onClick={deleteTask}
            >
              <IconTrash size="1.1rem" className={classes.like} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="default" radius="md" size={36}>
              <IconEdit size="1.1rem" className={classes.like} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Card>
      )}
    </div>
  );
}

export default VeiewTask;
