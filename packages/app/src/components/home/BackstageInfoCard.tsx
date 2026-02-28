import { InfoCard } from '@backstage/core-components';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// Imported at build time via Webpack — no runtime FS access
import backstageJson from '../../../../../backstage.json';
import appPkg from '../../../package.json';
import backendPkg from '../../../../backend/package.json';

const useStyles = makeStyles(theme => ({
  versionBadge: {
    display: 'inline-block',
    fontFamily: 'monospace',
    fontWeight: 700,
    fontSize: '1.6rem',
    color: theme.palette.primary.main,
    lineHeight: 1.2,
  },
  sectionLabel: {
    display: 'block',
    fontSize: '0.68rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.09em',
    color: theme.palette.text.secondary,
    margin: theme.spacing(1.5, 0, 0.75),
  },
  chipBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
  },
  chip: {
    fontFamily: 'monospace',
    fontSize: '0.63rem',
    height: 20,
    borderRadius: 4,
  },
  divider: {
    margin: theme.spacing(1.5, 0, 0),
  },
  countBadge: {
    display: 'inline-block',
    marginLeft: theme.spacing(0.5),
    padding: theme.spacing(0, 0.75),
    borderRadius: 10,
    background: theme.palette.action.selected,
    fontSize: '0.65rem',
    fontWeight: 700,
    lineHeight: '16px',
    verticalAlign: 'middle',
  },
}));

interface Plugin {
  name: string;
  version: string;
}

const extractPlugins = (
  deps: Record<string, string>,
  filter: (name: string) => boolean,
): Plugin[] =>
  Object.entries(deps)
    .filter(([name]) => filter(name))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, version]) => ({
      name,
      version: version.replace(/^[\^~]/, ''),
    }));

const isBackstage = (name: string) =>
  name.startsWith('@backstage/') || name.startsWith('@backstage-community/');

const isThirdParty = (name: string) =>
  !isBackstage(name) &&
  !['react', 'react-dom', 'react-router', 'react-router-dom',
    '@material-ui/core', '@material-ui/icons', 'app',
    'better-sqlite3', 'node-gyp', 'pg'].includes(name) &&
  !name.startsWith('@types/');

// Short display name: strips well-known scope prefixes
const shortName = (name: string) =>
  name
    .replace('@backstage-community/', 'community/')
    .replace('@backstage/', '');

export const BackstageInfoCard = () => {
  const classes = useStyles();

  const frontendPlugins = extractPlugins(
    appPkg.dependencies as Record<string, string>,
    isBackstage,
  );
  const backendPlugins = extractPlugins(
    backendPkg.dependencies as Record<string, string>,
    isBackstage,
  );
  const thirdPartyFrontend = extractPlugins(
    appPkg.dependencies as Record<string, string>,
    isThirdParty,
  );
  const thirdPartyBackend = extractPlugins(
    backendPkg.dependencies as Record<string, string>,
    isThirdParty,
  );

  const renderChips = (plugins: Plugin[]) => (
    <Box className={classes.chipBox}>
      {plugins.map(({ name, version }) => (
        <Chip
          key={name}
          label={`${shortName(name)} ${version}`}
          title={`${name} ${version}`}
          size="small"
          variant="outlined"
          className={classes.chip}
        />
      ))}
    </Box>
  );

  const SectionLabel = ({
    text,
    count,
  }: {
    text: string;
    count: number;
  }) => (
    <Typography component="span" className={classes.sectionLabel}>
      {text}
      <span className={classes.countBadge}>{count}</span>
    </Typography>
  );

  return (
    <InfoCard title={`Platform Info — Backstage v${backstageJson.version}`}>
      <Grid container spacing={3}>
        {/* Frontend column */}
        <Grid item xs={12} md={6}>
          <SectionLabel text="Frontend Plugins" count={frontendPlugins.length} />
          {renderChips(frontendPlugins)}

          {thirdPartyFrontend.length > 0 && (
            <>
              <SectionLabel
                text="Third-party Frontend"
                count={thirdPartyFrontend.length}
              />
              {renderChips(thirdPartyFrontend)}
            </>
          )}
        </Grid>

        {/* Backend column */}
        <Grid item xs={12} md={6}>
          <Divider
            orientation="vertical"
            style={{ display: 'none' }}
          />
          <SectionLabel text="Backend Plugins" count={backendPlugins.length} />
          {renderChips(backendPlugins)}

          {thirdPartyBackend.length > 0 && (
            <>
              <SectionLabel
                text="Third-party Backend"
                count={thirdPartyBackend.length}
              />
              {renderChips(thirdPartyBackend)}
            </>
          )}
        </Grid>
      </Grid>
    </InfoCard>
  );
};
