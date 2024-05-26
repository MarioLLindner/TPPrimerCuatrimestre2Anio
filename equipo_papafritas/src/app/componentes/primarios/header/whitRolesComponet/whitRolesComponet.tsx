import React from "react";
import { withRolesComponets } from "@/app/componentes/HOC/hoc.viewPermission";

const CustomLink = ({ href, text }: { href: string, text: string }) => {
  return <a href={href}>{text}</a>;
};

const HeaderLink = ({ href, text, roles }: { href: string, text: string, roles: number[] }) => {
  const LinkComponent = withRolesComponets(
    () => <CustomLink href={href} text={text} />,
    roles
  );

  return <LinkComponent />;
};

export default HeaderLink;
