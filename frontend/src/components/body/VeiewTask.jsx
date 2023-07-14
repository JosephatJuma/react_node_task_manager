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

import { IconEdit, IconHeart, IconTrash, IconX } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
  const { classes, theme } = useStyles();

  const task = useSelector((state) => state.view.task);
  return (
    <div>
      <ActionIcon
        sx={{ position: { top: 20, right: 20 } }}
        component={Link}
        to={"/"}
      >
        <IconX />
      </ActionIcon>
      <Card withBorder radius="md" p="md" className={classes.card} shadow="lg">
        <Card.Section>
          <Card height={180} sx={{ backgroundColor: task.color }}>
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
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text mt="md" className={classes.label} c="dimmed">
            Perfect for you, if you enjoy
          </Text>

          <Text c="dimmed" fz="sm" mt="md">
            Task Priority:{" "}
            <Text
              span
              fw={500}
              sx={(theme) => ({
                color: theme.colorScheme === "dark" ? theme.white : theme.black,
              })}
            >
              {task.priority}
            </Text>
          </Text>
          <Progress value={task.priority} color={task.color} />
        </Card.Section>

        <Group mt="xs">
          <Button
            radius="md"
            style={{ flex: 1 }}
            sx={{ backgroundColor: task.color }}
          >
            Mark as completed
          </Button>
          <ActionIcon variant="default" radius="md" size={36}>
            <IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="default" radius="md" size={36}>
            <IconTrash size="1.1rem" className={classes.like} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="default" radius="md" size={36}>
            <IconEdit size="1.1rem" className={classes.like} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Card>
    </div>
  );
}

export default VeiewTask;
