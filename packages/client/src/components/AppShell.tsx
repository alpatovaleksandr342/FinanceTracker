import { AppShell, Burger, Flex, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";

interface AppShProps {
  children: ReactNode;
}

interface NavItem {
  name: string;
  link: string;
}

export const AppSh = ({ children }: AppShProps) => {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  const navList: NavItem[] = [
    { name: "Домашняя", link: "/Home" },
    { name: "Дашборд", link: "/Dashboard" },
    { name: "Учёт", link: "/InventoryBatch" },
  ];

  const navBarList: NavItem[] = [
    { name: "Категории", link: "/categories" },
    { name: "Дашборд", link: "/Dashboard" },
    { name: "Продукты", link: "/Products" },
    { name: "Поставщики", link: "/Suppliers" },
    { name: "Кассовые смены", link: "/CashSession" },
    { name: "Транзакции", link: "/CashTransaction" },
  ];
  return (
    <AppShell
      withBorder
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 150,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
    >
      <AppShell.Header>
        <Flex align={"center"} h={"100%"}>
          <Burger opened={opened} onClick={toggle} size="sm" />
          <Flex direction="row" justify={"space-around"} w={"100%"}>
            {navList.map((item) => (
              <NavLink
                w={"auto"}
                bdrs={"10"}
                key={item.link}
                component={Link}
                to={item.link}
                label={item.name}
                active={location.pathname === item.link}
                variant="filled"
                onClick={toggle}
              />
            ))}
          </Flex>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar>
        <Flex p="sm" h="100%" direction="column" justify="space-between">
          <Flex direction="column" justify={"space-around"} gap={10} w={"100%"}>
            {navBarList.map((item) => (
              <NavLink
                w={"auto"}
                bdrs={"10"}
                key={item.link}
                component={Link}
                to={item.link}
                label={item.name}
                active={location.pathname === item.link}
                variant="filled"
                onClick={toggle}
              />
            ))}
          </Flex>
          <Flex>
            <ThemeToggle />
          </Flex>
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main
        styles={{
          main: {
            height: "calc(100dvh - 60px)",
            overflow: "auto",
          },
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
};
