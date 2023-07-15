import React, { useState } from "react";
import { ColorInput, Group, Text, Button, Dialog, Tabs } from "@mantine/core";
import { TextInput, Drawer, Textarea, Notification } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { Select, Slider, Box, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconX, IconCheck } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import axios from "axios";
export function AddTaskForm() {
  const api_url = process.env.REACT_APP_API_URL;
  const user = useSelector((state) => state.login.user);
  const theme = useMantineTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null > "");
  const [time, setTime] = useState(null > "");
  const [color, setColor] = useState("");
  const [label, setLabel] = useState("");

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState(50);
  const [labels, setLabels] = useState([
    { value: "School", label: "School" },
    { value: "Church", label: "Churck" },
    { value: "Hangout", label: "Hangout" },
    { value: "Work", label: "Work" },
    { value: "Sports", label: "Sports" },
    { value: "Jim and Workout", label: "Jim and Workout" },
  ]);

  const [modalOpen, { open, close }] = useDisclosure(false);
  const [message, setMessage] = useState("");
  const [success, setSucess] = useState(false);
  const clearMessage = () => {
    setMessage("");
  };
  const submitTask = async () => {
    clearMessage();
    const task = {
      priority: priority,
      user_id: user._id,
      description: description,
      title: title,
      due_date: date,
      color: color,
      label: label,
      status: status,
      due_time: time,
    };
    console.log(task);
    try {
      const response = await axios.post(`${api_url}/tasks/${user._id}`, task);
      setMessage(response.data.message);
      if (response.data.success === true) {
        setSucess(true);
      }
    } catch (error) {
      setMessage(error.message);
      setSucess(false);
    }
    close();
  };

  return (
    <>
      {message && (
        <Dialog
          opened={message}
          onClose={clearMessage}
          withCloseButton
          size="lg"
          radius="md"
          shadow="xl"
          sx={{ backgroundColor: success ? "green" : "black", color: "white" }}
          transitionTimingFunction="ease"
        >
          <Group>
            {success ? <IconCheck size="1.1rem" /> : <IconX size="1.1rem" />}
            <Text>{message}</Text>
          </Group>
        </Dialog>
      )}

      <Button
        onClick={open}
        sx={{ backgroundColor: "#800080" }}
        leftIcon={<IconPlus />}
      >
        Add
      </Button>
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
          <TextInput
            placeholder="Title"
            label="Title:"
            value={title}
            onInput={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Describe"
            label="Description:"
            value={description}
            onInput={(e) => setDescription(e.target.value)}
          />
          <Group sx={{ width: "100%" }}>
            <DateInput
              value={date}
              onChange={setDate}
              label="Due Date"
              placeholder="2023-20-12"
              disallowInput
            />
            <TimeInput
              label="Due Time"
              onChange={(e) => setTime(e.target.value)}
              value={time}
            />
          </Group>
          <ColorInput
            disallowInput
            label="Select color"
            format="hex"
            swatches={[
              "#25262b",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
            onChange={setColor}
          />
          <Select
            label="Status"
            placeholder="Select Initial"
            data={[
              { value: "Not Started", label: "Not Started" },
              { value: "In Progress", label: "In Progress" },
              { value: "Completed", label: "Completed" },
            ]}
            onChange={setStatus}
          />
          <Select
            label="Select Categories"
            data={labels}
            placeholder="Select Labels"
            nothingFound="Nothing found"
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setLabels((current) => [...current, item]);
              return item;
            }}
            onChange={setLabel}
          />
          <Box sx={{ margin: "auto" }}>
            <Text mt="xl" size="xl" fw={"bold"}>
              {priority >= 80
                ? "Very High"
                : priority >= 60
                ? "High"
                : priority > 40
                ? "Low"
                : "Very Low"}{" "}
              Priority
            </Text>
            <Slider
              value={priority}
              onChange={setPriority}
              thumbSize={30}
              color="#800080"
            />
          </Box>
          <Button
            sx={{ backgroundColor: "#800080", width: "100%", marginTop: 20 }}
            onClick={submitTask}
          >
            Save Task
          </Button>
        </form>
      </Drawer>
    </>
  );
}
