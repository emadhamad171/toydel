declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    declare type RootState = import('./app/providers/redux').RootState
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    declare type AppDispatch = import('./app/providers/redux').AppDispatch
}
