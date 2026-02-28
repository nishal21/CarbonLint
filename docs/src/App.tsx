import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { ShortcutsPage } from './pages/ShortcutsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="downloads" element={<DownloadsPage />} />
        <Route path="shortcuts" element={<ShortcutsPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
      {/* Legal pages with their own layout */}
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
    </Routes>
  );
}

export default App;
