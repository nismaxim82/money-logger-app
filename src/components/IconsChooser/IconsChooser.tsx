import {
  Checkbox,
  Chip,
  createStyles,
  FormControl,
  Icon,
  Input,
  InputAdornment,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography,
  IconButton,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import IconsStore from '../../stores/IconsStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import classes from './IconsChooser.module.css';
import useDebounce from '../../utility/UseDebounce';
import { IconTypesEnum } from '../../models/Enum';

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
  })
);

const IconsChooser = observer(() => {
  const { iconsStore }: { iconsStore: IconsStore } = useStores();

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const [typeValue, setTypeValue] = React.useState([IconTypesEnum.Filled]);
  const onTypeValueChange = (newValue: any) => {
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

  const [filter, setFilter] = React.useState('');
  const [page, setPage] = React.useState(1);
  const searchIcons = () => {
    return iconsStore.searchIconsByFilterAndPage(filter, typeValue, page);
  };
  const debouncedSearchFilter = useDebounce(filter, 500);
  const debouncedSearchTypeValue = useDebounce(typeValue, 1000);
  const filterChanged = (newFilter: any) => {
    setFilter(newFilter.target.value);
  };
  React.useEffect(searchIcons, [
    debouncedSearchFilter,
    debouncedSearchTypeValue,
  ]);

  return (
    <>
      <FormControl className={classes.typeSelect} fullWidth>
        <InputLabel id="types-select-label">Icon types</InputLabel>
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
        placeholder="Enter icon name to search"
        value={filter}
        onChange={filterChanged}
        className={css.searchInput}
        startAdornment={
          <InputAdornment position="start">
            <Icon>search</Icon>
          </InputAdornment>
        }
      />
      <div className={css.foundedTotalCount}>
        <Typography variant="caption">
          {iconsStore.foundedTotalCount} matching results
        </Typography>
      </div>
      <div className={css.foundedIconsContainer}>
        {iconsStore.foundedIcons.map((icon: string) => (
          <IconButton key={icon} className={css.foundedIconsIcon}>
            <Icon className={css.foundedIconsIconFont}>
              {iconsStore.getIconRightStringNameForFontToShow(icon)}
            </Icon>
          </IconButton>
        ))}
      </div>
    </>
  );
});

export default IconsChooser;
