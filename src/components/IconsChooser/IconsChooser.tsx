import {
  Checkbox,
  Chip,
  createStyles,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { observer } from 'mobx-react';
import React from 'react';
import { IconTypesEnum } from '../../models/Enum';
import IconsStore from '../../stores/IconsStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import useDebounce from '../../utility/UseDebounce';
import classes from './IconsChooser.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchInput: {
      marginTop: theme.spacing(2),
    },
    typesSelectChips: {
      marginTop: -theme.spacing(1),
      marginRight: -theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    typesSelectChip: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    foundedTotalCount: {
      marginTop: theme.spacing(1),
    },
    foundedIconsContainer: {
      marginTop: theme.spacing(1),
    },
    foundedIconsIconFont: {
      color: theme.palette.text.primary,
    },
    selectedIcon: {
      color: theme.palette.secondary.main,
    },
    pagination: {
      marginTop: theme.spacing(1),
    },
  })
);

interface IProps {
  selectedIcon?: string;
  selectedIconChanged?: (newIcon: string) => void;
}

const IconsChooser = observer((props: IProps) => {
  const { iconsStore }: { iconsStore: IconsStore } = useStores();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const iconsButtonsContainerRef = React.useRef<HTMLDivElement>(null);

  const [typeValue, setTypeValue] = React.useState([IconTypesEnum.Filled]);
  const [filter, setFilter] = React.useState('');
  const [page, setPage] = React.useState(1);
  const onTypeValueChange = (newValue: any) => {
    setPage(1);
    setTypeValue(newValue.target.value);
  };
  const onTypeRenderValue = (selected: any) => {
    return (
      <div className={css.typesSelectChips}>
        {(selected as string[]).map((value) => (
          <Chip key={value} label={value} className={css.typesSelectChip} />
        ))}
      </div>
    );
  };
  const searchIcons = () => {
    if (iconsButtonsContainerRef.current) {
      iconsButtonsContainerRef.current.scrollTop = 0;
    }
    iconsStore.searchIconsByFilterAndPage(filter, typeValue, page);
  };
  const debouncedSearchFilter = useDebounce(filter, 500);
  const debouncedSearchTypeValue = useDebounce(typeValue, 500);
  const debouncedSearchPage = useDebounce(page, 500);
  const filterChanged = (newFilter: any) => {
    setPage(1);
    setFilter(newFilter.target.value);
  };
  const filterKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.currentTarget.blur();
    }
  };
  const onPageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };
  React.useEffect(searchIcons, [
    debouncedSearchFilter,
    debouncedSearchTypeValue,
    debouncedSearchPage,
  ]);

  const [selectedIcon, setSelectedIcon] = React.useState('');
  const onIconClick = (icon: any) => {
    let iconRightName = icon.currentTarget.querySelectorAll(
      '.material-icons'
    )[0].innerText;
    // Check if icon is already selected and unselect it
    if (selectedIcon === iconRightName) {
      iconRightName = '';
    }
    setSelectedIcon(iconRightName);
    if (props.selectedIconChanged) {
      props.selectedIconChanged(iconRightName);
    }
  };

  React.useEffect(() => {
    setSelectedIcon(props.selectedIcon || '');
  }, [props.selectedIcon]);

  return (
    <>
      <FormControl className={classes.typeSelect} fullWidth>
        <InputLabel id="types-select-label">Типы иконок</InputLabel>
        <Select
          labelId="types-select-label"
          multiple
          fullWidth
          value={typeValue}
          onChange={onTypeValueChange}
          input={<Input />}
          renderValue={onTypeRenderValue}
        >
          {Array.from(iconsStore.iconsTypes.keys()).map((k: IconTypesEnum) => (
            <MenuItem key={k} value={k}>
              <Checkbox checked={typeValue.indexOf(k) > -1} />
              <ListItemText primary={iconsStore.iconsTypes.get(k)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Input
        fullWidth
        placeholder="Введите для поиска"
        value={filter}
        onChange={filterChanged}
        onKeyUp={filterKeyUp}
        className={css.searchInput}
        startAdornment={
          <InputAdornment position="start">
            <Icon>search</Icon>
          </InputAdornment>
        }
      />
      <div className={css.foundedTotalCount}>
        <Typography variant="caption">
          всего найдено {iconsStore.foundedTotalCount}
        </Typography>
      </div>
      <div ref={iconsButtonsContainerRef} className={css.foundedIconsContainer}>
        {iconsStore.foundedIcons.map((icon: string) => {
          const iconRightName = iconsStore.getIconRightStringNameForFontToShow(
            icon
          );
          return (
            <IconButton
              key={icon}
              onClick={onIconClick}
              className={css.foundedIconsButton}
            >
              <Icon
                className={
                  css.foundedIconsIconFont +
                  (iconRightName === selectedIcon ? ` ${css.selectedIcon}` : '')
                }
              >
                {iconRightName}
              </Icon>
            </IconButton>
          );
        })}
      </div>
      {iconsStore.pagesCount > 0 && (
        <Pagination
          className={css.pagination}
          count={iconsStore.pagesCount}
          color="primary"
          size="small"
          page={page}
          onChange={onPageChange}
        />
      )}
    </>
  );
});

export default IconsChooser;
