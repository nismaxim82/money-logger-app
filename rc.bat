IF '%1' == '' OR '%1' == 's' (
    start yarn start
)
IF '%1' == 'b' (
    yarn build
)
IF '%1' == 't' (
    yarn test
)