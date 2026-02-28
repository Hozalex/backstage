import { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  WelcomeTitle,
  HomePageTopVisited,
  HomePageRecentlyVisited,
  HomePageStarredEntities,
} from '@backstage/plugin-home';
import { Content, Page } from '@backstage/core-components';
import { SearchContextProvider, SearchBar } from '@backstage/plugin-search-react';
import { BackstageInfoCard } from './BackstageInfoCard';

// Convert browser BCP-47 language codes (e.g. 'ru', 'de-DE') to the English
// display names expected by WelcomeTitle (e.g. 'Russian', 'German').
function getBrowserLanguageNames(): string[] {
  const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
  return (navigator.languages as readonly string[])
    .map(tag => {
      try {
        // Use only the primary language subtag ('ru-RU' → 'ru')
        const primary = tag.split('-')[0];
        return displayNames.of(primary) ?? '';
      } catch {
        return '';
      }
    })
    .filter(Boolean);
}

export const HomePage = () => {
  const browserLanguages = useMemo(getBrowserLanguageNames, []);

  return (
    <Page themeId="home">
      <Content>
        <Grid container spacing={3}>
          {/* Search bar */}
          <Grid item xs={12} md={8}>
            <SearchContextProvider>
              <SearchBar />
            </SearchContextProvider>
          </Grid>

          {/* Welcome title — uses browser language settings */}
          <Grid item xs={12}>
            <WelcomeTitle language={browserLanguages} />
          </Grid>

          {/* Visit history */}
          <Grid item xs={12} md={4}>
            <HomePageTopVisited />
          </Grid>
          <Grid item xs={12} md={4}>
            <HomePageRecentlyVisited />
          </Grid>
          <Grid item xs={12} md={4}>
            <HomePageStarredEntities />
          </Grid>

          {/* Platform / version info — full width at the bottom */}
          <Grid item xs={12}>
            <BackstageInfoCard />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
