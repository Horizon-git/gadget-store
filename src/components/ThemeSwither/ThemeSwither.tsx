import React from 'react';
import cn from 'classnames';

import './ThemeSwither.scss';
import { setTheme } from '../../features/themeSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  className?: string;
};

const ThemeSwither = ({ className }: Props) => {
  const theme = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleChange = () => {
    const next = theme === 'dark' ? 'light' : 'dark';

    dispatch(setTheme(next));
  };

  return (
    <div
      className={cn(className, 'root', theme === 'dark' ? 'dark' : 'light')}
      onClick={handleChange}
    />
  );
};

export default ThemeSwither;
