import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';
import { Camera } from './Camera';
import {CustomEmojisComponent} from './CustomEmojis';

const items = [
    {
      key: 'custom_emojis',
      content: 'Custom Emojis',
    },
    {
      key: 'shoot_emoji',
      content: 'Shoot emoji',
    }
  ]

export const MainPage = ({messageId, userId, convId}) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const onActiveIndexChange = React.useCallback((i, j) => {
        setActiveIndex(j.activeIndex);
    });

    return <div>
        <Menu
        defaultActiveIndex={0}
        items={items}
        underlined
        primary
        onActiveIndexChange={onActiveIndexChange}
  />
  {activeIndex === 0 && <CustomEmojisComponent />}
  {activeIndex === 1 && <Camera messageId={messageId} userId={userId} convId={convId}/>}
  </div>;
}