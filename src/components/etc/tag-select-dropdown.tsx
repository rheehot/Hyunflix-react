import React, { useCallback, useMemo } from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';

const NO_SELECT = '선택 없음';

interface Props {
  onChange(tag?: string): void;
  tags: Map<string, string>;
  value?: string;
}

export default ({ tags, onChange, value }: Props) => {
  const className: string | undefined = value ? `ant-tag-${tags.get(value)}` : undefined;

  const onClick = useCallback((param: ClickParam) => {
    onChange(param.key === NO_SELECT ? undefined : param.key);
  }, [onChange]);

  const menu = useMemo(() => {
    const items = Array.from(tags.keys()).map(t => (
      <Menu.Item key={t}>
        {t}
      </Menu.Item>
    ));
    return (
      <Menu onClick={onClick}>
        <Menu.Item key={NO_SELECT}>
          {NO_SELECT}
        </Menu.Item>
        {items}
      </Menu>
    );
  }, [tags, onClick]);

  return (
    <Dropdown overlay={menu}>
      <Button className={className}>
        {value || '태그 선택'}
      </Button>
    </Dropdown>
  );
};
