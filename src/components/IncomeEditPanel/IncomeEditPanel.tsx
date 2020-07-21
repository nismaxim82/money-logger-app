import {
  Box,
  createStyles,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import {
  MenuSubTypesEnum,
  MenuTypesEnum,
  IncomeTypeEnum,
} from '../../models/Enum';
import TranslatesStore from '../../stores/TranslatesStore';
import useStores from '../../stores/UseStores';
import Helpers from '../../utility/Helpers';
import FormikField from '../FormikField/FormikField';
import PanelBase from '../PanelBase/PanelBase';
import classes from './IncomeEditPanel.module.css';
import FormikRadioGroup from '../FormikRadioGroup/FormikRadioGroup';
import IncomeEntry from '../../models/entries/IncomeEntry';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarIcon: {
      color: theme.palette.background.default,
    },
  })
);

const IncomeEditPanel = observer(() => {
  const { translatesStore }: { translatesStore: TranslatesStore } = useStores();

  const { translate } = translatesStore;

  const styles = useStyles();
  const css = Helpers.combineStyles(styles, classes);

  const [incomeId, setIncomeId] = React.useState('');
  const history = useHistory();

  const gotoIncomes = () => {
    history.push(`/${MenuTypesEnum.Menu}/${MenuSubTypesEnum.Incomes}`);
  };

  const initialValues: IncomeEntry = {
    type: IncomeTypeEnum.Periodic,
  };
  const [incomeTypesOptions] = React.useState([
    { value: IncomeTypeEnum.Periodic, label: translate.Periodic },
    { value: IncomeTypeEnum.Fixed, label: translate.Fixed },
  ]);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      type: Yup.string().required(translate.LanguageIsRequired),
    }),
    onSubmit: async (values: IncomeEntry) => {
      console.log(values);
      // const saveResult = await propertiesStore.saveFirstTimeOptions(
      //   translate,
      //   values.Language,
      //   values.Currency
      // );
      // if (saveResult.success) {
      //   await typesStore.loadTypes();
      //   await translatesStore.loadTranslate(values.Language);
      //   return true;
      // }
      // setSaveErrors(saveResult.errors);
      return false;
    },
  });

  const deleteIncome = async () => {
    // await cashStore.deleteCash(cashId);
    gotoIncomes();
  };
  const cancelEdit = () => {
    gotoIncomes();
  };
  const saveEdit = async () => {
    formik.handleSubmit();
    // if (!cashStore.cashToSave?.createdDate) {
    //   cashStore.updateCashToSaveByProp('createdDate', createdDate);
    // }
    // if (cashStore.validateCashToSave()) {
    //   await cashStore.saveCash(cashId);
    //   history.push(`/${MenuTypesEnum.Records}`);
    // }
  };

  return translate && formik ? (
    <PanelBase
      firstBarChildren={
        <Typography variant="h6">
          {incomeId ? translate.IncomeEdit : translate.IncomeNew}
        </Typography>
      }
      secondBarChildren={
        <>
          <Box className={css.emptyBox} />
          {incomeId && (
            <IconButton onClick={deleteIncome}>
              <Icon className={css.toolbarIcon}>delete_forever</Icon>
            </IconButton>
          )}
          <IconButton onClick={cancelEdit}>
            <Icon className={css.toolbarIcon}>close</Icon>
          </IconButton>
          <IconButton onClick={saveEdit}>
            <Icon className={css.toolbarIcon}>done</Icon>
          </IconButton>
        </>
      }
    >
      <div>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <FormikRadioGroup
                name="type"
                label={translate.IncomeType}
                horizontal
                options={incomeTypesOptions}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </PanelBase>
  ) : (
    <></>
  );
});

export default IncomeEditPanel;
