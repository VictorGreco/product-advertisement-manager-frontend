import './App.css';

import { SnackbarProvider } from 'notistack';

import AdvertisementsTable from './components/AdvertisementsTable/AdvertisementsTable';
import Navbar from './components/Navbar/Navbar';

function App(): JSX.Element {
  return (
    <div className="App">
      <Navbar />
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