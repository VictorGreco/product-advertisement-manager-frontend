import './App.css';

import { SnackbarProvider } from 'notistack';

import AdvertisementsTable from './components/AdvertisementsTable/AdvertisementsTable';

function App(): JSX.Element {
  return (
    <div className="App">
      <AdvertisementsTable />
    </div>
  );
}

export default function IntegrationNotistack(): JSX.Element {
  return (
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  );
}