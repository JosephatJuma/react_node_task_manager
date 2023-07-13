import React, { useState } from "react";
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Group,
  Checkbox,
  Anchor,
  Divider,
  Container,
  Dialog,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconBrandGoogle, IconBrandTwitter, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import useLogin from "../../hooks/useLogin";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../state/reducers/registerSlice";
function Register() {
  const api_url = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const registered = useSelector((state) => state.register.registered);
  const { message, isSending, clearErr, submitData } = useLogin();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      name: (val) =>
        /^[a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?/.test(
          val
        )
          ? null
          : "Invalid Name",
    },
  });

  return (
    <Container size={500}>
      {registered === true && <Navigate to={"/login"} />}
      <LoadingOverlay visible={isSending} overlayBlur={2} />
      <Dialog
        opened={message}
        onClose={clearErr}
        withCloseButton
        size="lg"
        radius="md"
        position={{ top: 20, left: 20 }}
        shadow="xl"
        bg={"dark"}
        display={"flex"}
      >
        <IconX size="1.1rem" color="white" />
        <Text color="white">{message}</Text>
      </Dialog>
      <h2>Create Account</h2>
      <Paper radius="md" withBorder shadow="lg" p={30} mt={30}>
        <Group grow mb="md" mt="md">
          <Button leftIcon={<IconBrandGoogle />} radius="xl">
            Google
          </Button>
          <Button leftIcon={<IconBrandTwitter />} radius="xl">
            Twitter
          </Button>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />
        <form
          onSubmit={form.onSubmit(
            (values, _event) => {
              submitData(`${api_url}auth/register/`, values);
              dispatch(register(values));
            },
            (validationErrors, _values, _event) => {
              return;
            }
          )}
        >
          <Stack>
            <TextInput
              label="Full Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              error={form.errors.name && form.errors.name}
              radius="md"
            />

            <TextInput
              label="Email"
              placeholder="username@service.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          </Stack>

          <Button type="submit" radius="xl">
            Sign Up
          </Button>
        </form>

        <Anchor component={Link} to="/login" color="dimmed" size="xs">
          Already have an account? Login
        </Anchor>
      </Paper>
    </Container>
  );
}

export default Register;
