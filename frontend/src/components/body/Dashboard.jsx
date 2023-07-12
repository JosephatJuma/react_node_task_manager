import {
  SimpleGrid,
  Skeleton,
  Container,
  Stack,
  useMantineTheme,
  px,
  Card,
} from "@mantine/core";

const getChild = (height) => (
  <Skeleton height={height} radius="md" animate={true} />
);
const BASE_HEIGHT = 360;
const getSubHeight = (children, spacing) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);

export function Dashboard() {
  const theme = useMantineTheme();
  return (
    <div style={{ width: "80%", margin: 10 }}>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
        <Stack>
          {getChild(getSubHeight(3, px(theme.spacing.md)))}
          {getChild(getSubHeight(3, px(theme.spacing.md)))}
          {getChild(getSubHeight(3, px(theme.spacing.md)))}
        </Stack>
        {getChild(BASE_HEIGHT)}
      </SimpleGrid>
    </div>
  );
}
