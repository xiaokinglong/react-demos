import { Link, Outlet } from "umi";
import { useState } from "react";
import { Menu, Input, Button, message } from "antd";
import "antd/dist/antd.css";
import styles from "./index.less";

export default function Layout() {
  const [selectKey, setSelectKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const items = [
    {
      label: "菜单项一",
      key: "item-1",
      children: [
        {
          label: "子菜单1-1",
          key: "子菜单1-1",
        },
        {
          label: "子菜单1-2",
          key: "子菜单1-2",
        },
      ],
    },
    {
      label: "菜单项二",
      key: "item-2",
      children: [
        {
          label: "子菜单2-1",
          key: "子菜单2-1",
        },
        {
          label: "子菜单2-2",
          key: "子菜单2-2",
        },
      ],
    },
  ];

  const handleCick = (e) => {
    setSelectKey(e.key);
    setInputValue(e.key);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const findKey = (data, key) => {
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item.key === key) {
        return item;
      } else {
        if (item.children && item.children.length > 0) {
          let res = findKey(item.children, key);
          if (res) return res;
        }
      }
    }
  };

  const handleSave = () => {
    const key = findKey(items, inputValue);
    console.log({ key });
    if (key) {
      setSelectKey(inputValue);
    } else {
      message.info("没有找到对应的menu");
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header}></div>
      <div className={styles.layout_content}>
        <div className={styles.menus}>
          <Menu
            onClick={handleCick}
            style={{ width: 200 }}
            selectedKeys={[selectKey]}
            mode="inline"
            items={items}
          />
        </div>
        <div>
          <Input value={inputValue} onChange={handleChange} />
          <Button onClick={handleSave}>保存</Button>
          {/* <Outlet /> */}
        </div>
      </div>
    </div>
  );
}
