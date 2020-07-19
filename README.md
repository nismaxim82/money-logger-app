## Money logger app

For cash flow and expense management on your mobile.

[Web app can be viewed here.](https://nismaxim82.github.io/money-logger-app/)

### Сreating your own payment types with their unique icons

In the third tab you can create / edit your own payment type with its unique color and icon.

### Creation of payment for a specific type

In the first tab you can click on any created or predefined type,<br />
quickly enter the amount of payment and press ↵ on the mobile keyboard to save payment.<br />
If you want you can change the date / time and provide the payment description here.

### View and manipulate all payments for the selected period

In the second tab you can change selected period,<br />
enter a search text to find all payments for this period or search text.<br />
You can click on the specific payment row to edit this payment data.<br />
You can change view type of payments, table or diagram.<br />
Also here you see the total amount of payments for the selected period or search and overall global balance.

## More tab

In the fourth tab you can change your **Main properties**, **generate Reports**,<br />
**add Incomes**, **specify server synchronization settings**.

### Main properties

In this panel you can change the language of the application and the selected default currency.<br />
**Default currency** is a currency that will be selected by default when creating a payment.<br />
Also in this currency displays the total amount of payments and the total balance.<br />
When you create a payment, the application receives all the courses of your currencies<br />
and saves them for this day.<br />
If in the future you change the default currency,<br />
you will see the total amount of payments and the balance in the selected currency.

### Reports

In this panel you can generate HTML and PDF reports by selected period.

### Incomes

Here you can see all your contributed income.<br />
You can create / edit / delete you incomes.<br />
Income can be of two types: periodic and fixed one-time.

### Sync

Here you can determine how you want to synchronize with the server.<br />
By default, the application runs locally without a server.<br />
All data is stored in local storage.<br />
But if you do not want to lose your entered data<br />
you must configure synchronization with the server.<br />
**All your saved data is confidential and private.**


## For developers

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br />
This project uses:
#### [Typescript for typing](https://www.typescriptlang.org/)<br />
#### [eslint to find and auto fix problem code](https://eslint.org/)<br />
#### [the Material-UI library to display controls.](https://material-ui.com/)<br />
#### [date-fns for formatting and localizing date and time](https://date-fns.org/)<br />
#### [MobX global state](https://mobx.js.org/README.html)<br />
#### [React router for routing](https://reactrouter.com/)<br />
#### [Formik and Yup for managing forms and their validation](https://formik.org/)<br />
#### [uuid for guid id generation](https://www.npmjs.com/package/uuid)<br />
#### [gh-pages to deploy this project on the Github](https://www.npmjs.com/package/gh-pages)

### How to build and run

In the root of project folder you have rc.bat.<br />
In the terminal window you can write:<br />
```
  ./rc      - to run a development version.
  ./rc b    - to build an optimized version for publish on your server.
  ./rc t    - to run a tests.
```
#### Also you can use similar commands from the package.json:
```
  yarn start    - to run a development version.
  yarn build    - to build an optimized version for publish on your server.
  yarn test     - to run a tests.
  yarn deploy   - to build an optimized version and publish it on the Github pages.
```
<br />
**What's the difference between ./rc and yarn commands**<br />
./rc will open a new terminal window outside the developer IDE.