import React, { useMemo, ComponentProps, FC } from 'react';

import { styled } from '@storybook/theming';
import { WithTooltip, TooltipLinkList, Button, Icons, IconButton } from '@storybook/components';

export type MenuList = ComponentProps<typeof TooltipLinkList>['links'];

const sharedStyles = {
  height: 10,
  width: 10,
  marginLeft: -5,
  marginRight: -5,
  display: 'block',
};

const Icon = styled(Icons)(sharedStyles, ({ theme }) => ({
  color: theme.color.secondary,
}));

const SidebarIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.color.mediumdark,
  marginTop: 0,
}));

const Img = styled.img(sharedStyles);
const Placeholder = styled.div(sharedStyles);

export interface ListItemIconProps {
  icon?: ComponentProps<typeof Icons>['icon'];
  imgSrc?: string;
}

export const MenuItemIcon = ({ icon, imgSrc }: ListItemIconProps) => {
  if (icon) {
    return <Icon icon={icon} />;
  }
  if (imgSrc) {
    return <Img src={imgSrc} alt="image" />;
  }
  return <Placeholder />;
};

type ClickHandler = ComponentProps<typeof TooltipLinkList>['links'][number]['onClick'];

export const SidebarMenuList: FC<{
  menu: MenuList;
  onHide: () => void;
}> = ({ menu, onHide }) => {
  const links = useMemo(() => {
    return menu.map(({ onClick, ...rest }) => ({
      ...rest,
      onClick: ((event, item) => {
        if (onClick) {
          onClick(event, item);
        }
        onHide();
      }) as ClickHandler,
    }));
  }, [menu]);
  return <TooltipLinkList links={links} />;
};

export const SidebarMenu: FC<{
  menu: MenuList;
  isHighlighted: boolean;
}> = ({ isHighlighted, menu }) => {
  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnClick
      tooltip={({ onHide }) => <SidebarMenuList onHide={onHide} menu={menu} />}
    >
      {/* FIXME: when button is clicked, set "active" prop to true, isHighlighted doesn't work */}
      <SidebarIconButton title="Shortcuts" aria-label="Shortcuts" active={isHighlighted}>
        <Icons icon="cog" />
      </SidebarIconButton>
    </WithTooltip>
  );
};

export const ToolbarMenu: FC<{
  menu: MenuList;
}> = ({ menu }) => {
  return (
    <WithTooltip
      placement="bottom"
      trigger="click"
      closeOnClick
      tooltip={({ onHide }) => <SidebarMenuList onHide={onHide} menu={menu} />}
    >
      <IconButton title="Shortcuts" aria-label="Shortcuts">
        <Icons icon="menu" />
      </IconButton>
    </WithTooltip>
  );
};
