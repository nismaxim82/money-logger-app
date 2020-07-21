import {
  Button,
  Grid,
  MenuItem,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';
import React, { forwardRef, useImperativeHandle } from 'react';
import * as Yup from 'yup';
import PropertiesStore from '../../stores/PropertiesStore';
import TranslatesStore from '../../stores/TranslatesStore';
import TypesStore from '../../stores/TypesStore';
import useStores from '../../stores/UseStores';
import CurrencyEditPanel from '../CurrencyEditPanel/CurrencyEditPanel';
import FormikField from '../FormikField/FormikField';
import classes from './MainProperties.module.css';
import SnackErrors from '../SnackErrors/SnackErrors';
import Helpers from '../../utility/Helpers';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface IMainProperties {
  Language: string;
  Currency: string;
}

interface IProps {}

const MainProperties = observer(
  forwardRef((props: IProps, ref: any) => {
    const {
      propertiesStore,
      translatesStore,
      typesStore,
    }: {
      propertiesStore: PropertiesStore;
      translatesStore: TranslatesStore;
      typesStore: TypesStore;
    } = useStores();

    const { translate } = translatesStore;

    const styles = useStyles();
    const css = Helpers.combineStyles(styles, classes);

    const [saveErrors, setSaveErrors] = React.useState<Array<string>>([]);

    const [initialValues] = React.useState<IMainProperties>({
      Language: propertiesStore.currentLanguage.name,
      Currency: propertiesStore.defaultCurrency.name,
    });

    const formik = useFormik({
      initialValues,
      validationSchema: Yup.object({
        Language: Yup.string().required(translate.LanguageIsRequired),
        Currency: Yup.string().required(translate.CurrencyIsRequired),
      }),
      onSubmit: async (values: IMainProperties) => {
        const saveResult = await propertiesStore.saveMainProperties(
          translate,
          values.Language,
          values.Currency
        );
        if (saveResult.success) {
          await typesStore.loadTypes();
          await translatesStore.loadTranslate(values.Language);
          return true;
        }
        setSaveErrors(saveResult.errors);
        return false;
      },
    });

    useImperativeHandle(ref, () => ({
      onSave() {
        return formik.submitForm();
      },
    }));

    const [addNewCurrencyOpened, setAddNewCurrencyOpened] = React.useState(
      false
    );
    const buttonAddCurrency = () => {
      setAddNewCurrencyOpened(true);
    };
    const addNewCurrencyPanelOnCancelEdit = () => {
      setAddNewCurrencyOpened(false);
    };
    const addNewCurrencyPanelOnSaveEdit = (selectedNewCurrencyName: string) => {
      setAddNewCurrencyOpened(false);
      formik.setFieldValue('Currency', selectedNewCurrencyName);
    };

    const closeErrors = () => {
      setSaveErrors([]);
    };

    const languagesItems = React.useRef(
      propertiesStore.languages.map((l) => (
        <MenuItem key={l.name} value={l.name}>
          {l.title || l.name}
        </MenuItem>
      ))
    );

    return (
      <form onSubmit={formik.handleSubmit} noValidate>
        {console.log('%c MainProperties', 'color: red; font-weight: 700;')}
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <FormikField
              name="Language"
              label={translate.Language}
              select
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
            >
              {languagesItems.current}
            </FormikField>
          </Grid>
          {/* <Grid item xs={7}>
            <FormikField
              name="Currency"
              label={translate.Currency}
              select
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
            >
              {propertiesStore.currencies.map((c) => (
                <MenuItem key={c.name} value={c.name}>
                  {c.symbol || c.name}
                </MenuItem>
              ))}
            </FormikField>
          </Grid>
          <Grid
            item
            xs={5}
            className={`${css.addCurrencyCell} ${
              formik.errors.Currency && formik.touched.Currency
                ? css.addCurrencyCellWithError
                : ''
            }
                `}
          >
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              size="small"
              onClick={buttonAddCurrency}
            >
              {translate.AddNewCurrency}
            </Button>
          </Grid> */}
        </Grid>
        {/* {addNewCurrencyOpened && (
          <CurrencyEditPanel
            onCancelEdit={addNewCurrencyPanelOnCancelEdit}
            onSaveEdit={addNewCurrencyPanelOnSaveEdit}
          />
        )} */}
        {/* <SnackErrors
          open={saveErrors.length > 0}
          errors={saveErrors}
          onClose={closeErrors}
        /> */}
      </form>
    );
  })
);

export default MainProperties;
