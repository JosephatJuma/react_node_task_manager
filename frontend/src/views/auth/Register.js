import React from "react";
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
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconBrandGoogle, IconBrandTwitter } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

function Register() {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      name: (val) => (val.length <= 6 ? "Name is invalid" : null),
    },
  });

  return (
    <Container size={500} my={40}>
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
        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <Group position="apart">
              <TextInput
                label="First Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
              <TextInput
                label="Last Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            </Group>

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
