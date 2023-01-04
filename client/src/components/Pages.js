import React, {useContext} from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import MyButton from '../forms/MyButton';
import styles from '../styles/components/Pages.module.scss';

const Pages = observer(() => {
  const { device } = useContext(Context)
  const pageCount = Math.ceil(device.totalCount / device.limit)
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  return (
    <div className={styles.pages}>
      {pages.map(page =>
        <MyButton name={page} key={page} danger={device.page === page} onClick={() => device.setPage(page)}/>
      )}
    </div>
  );
});
export default Pages;