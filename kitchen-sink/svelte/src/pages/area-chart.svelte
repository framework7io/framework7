<script>
  import { Page, Navbar, BlockTitle, Block, AreaChart } from 'framework7-svelte';

  // helpers data for axis
  const dates = [];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  for (let i = 0; i < 4; i += 1) {
    dates.push(new Date(year, month - (3 - i)));
  }
  const axisDateFormat = Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' });
  const tooltipDateFormat = Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' });
</script>

<Page>
  <Navbar title="Area Chart" backLink="Back" />
  <Block strongIos outlineIos>
    <p>Framework7 comes with simple to use and fully responsive Area Chart component.</p>
    <p>
      Area Chart generates SVG layout which makes it also compatible with SSR (server side
      rendering).
    </p>
  </Block>
  <BlockTitle>Simple Area Chart</BlockTitle>
  <Block strongIos outlineIos>
    <!-- prettier-ignore -->
    <AreaChart
      datasets={[
        {
          color: '#f00',
          values: [0, 100, 250, 300, 175, 400],
        },
        {
          color: '#00f',
          values: [100, 75, 133, 237, 40, 200],
        },
        {
          color: '#ff0',
          values: [100, 300, 127, 40, 250, 80],
        },
      ]}
    />
  </Block>
  <BlockTitle>Area Chart With Tooltip</BlockTitle>
  <Block strongIos outlineIos>
    <!-- prettier-ignore -->
    <AreaChart
      tooltip
      datasets={[
        {
          label: 'Red data',
          color: '#f00',
          values: [100, 75, 133, 237, 40, 200],
        },
        {
          label: 'Blue data',
          color: '#00f',
          values: [100, 300, 127, 40, 250, 80],
        },
        {
          label: 'Yellow data',
          color: '#ff0',
          values: [0, 100, 250, 300, 175, 400],
        },
      ]}
    />
  </Block>
  <BlockTitle>Area Chart With Axis</BlockTitle>
  <Block strongIos outlineIos>
    <!-- prettier-ignore -->
    <AreaChart
      tooltip
      axis
      axisLabels={dates}
      formatAxisLabel={(date) => axisDateFormat.format(date)}
      formatTooltipAxisLabel={(date) => tooltipDateFormat.format(date)}
      datasets={[
        {
          label: 'Green data',
          color: '#0f0',
          values: [100, 75, 133, 237],
        },
        {
          label: 'Red data',
          color: '#f00',
          values: [100, 300, 127, 47],
        },
        {
          label: 'Yellow data',
          color: '#ff0',
          values: [0, 100, 250, 307],
        },
      ]}
    />
  </Block>
  <BlockTitle>Area Chart With Legend</BlockTitle>
  <Block strongIos outlineIos>
    <!-- prettier-ignore -->
    <AreaChart
      tooltip
      axis
      axisLabels={dates}
      legend
      toggleDatasets
      formatAxisLabel={(date) => axisDateFormat.format(date)}
      formatTooltipAxisLabel={(date) => tooltipDateFormat.format(date)}
      datasets={[
        {
          label: 'Red data',
          color: '#f00',
          values: [100, 300, 127, 47],
        },
        {
          label: 'Blue data',
          color: '#00f',
          values: [100, 75, 133, 237],
        },
        {
          label: 'Yellow data',
          color: '#ff0',
          values: [0, 100, 250, 307],
        },
      ]}
    />
  </Block>
  <BlockTitle>Lines Chart</BlockTitle>
  <Block strongIos outlineIos>
    <!-- prettier-ignore -->
    <AreaChart
      tooltip
      axis
      axisLabels={dates}
      legend
      toggleDatasets
      lineChart
      formatAxisLabel={(date) => axisDateFormat.format(date)}
      formatTooltipAxisLabel={(date) => tooltipDateFormat.format(date)}
      datasets={[
        {
          label: 'Red data',
          color: '#f00',
          values: [0, 300, 127, 47],
        },
        {
          label: 'Blue data',
          color: '#00f',
          values: [0, 75, 133, 237],
        },
        {
          label: 'Green data',
          color: '#0f0',
          values: [0, 100, 250, 307],
        },
      ]}
    />
  </Block>
</Page>
