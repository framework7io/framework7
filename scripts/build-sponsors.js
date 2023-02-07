const fs = require('fs');
const path = require('path');
const https = require('https');

const getSponsors = () => {
  let sponsorsLocal;
  try {
    const localPath = path.resolve(
      __dirname,
      '../../framework7-website/src/pug/sponsors/sponsors.json',
    );
    if (fs.existsSync(localPath)) {
      // eslint-disable-next-line
      sponsorsLocal = require(localPath);
    }
  } catch (err) {
    // error
  }
  if (sponsorsLocal) return sponsorsLocal;

  return new Promise((resolve, reject) => {
    https
      .get('https://framework7.io/sponsors/sponsors.json', (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(JSON.parse(data));
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

const buildTables = (sponsors) => {
  const tableSponsors = [
    ...(sponsors.diamondSponsor || []),
    ...(sponsors.platinumSponsor || []),
    ...(sponsors.goldSponsor || []),
    ...(sponsors.silverSponsor || []),
    ...(sponsors.topSupporter || []),
  ];

  let tableContent = '';
  if (tableSponsors.length > 0) {
    const rows = [];
    const perRow = 12;
    let rowIndex = 0;

    tableSponsors.forEach((item, index) => {
      const colIndex = index - perRow * rowIndex;
      if (colIndex > perRow - 1) rowIndex += 1;
      if (!rows[rowIndex]) rows[rowIndex] = [];
      rows[rowIndex].push(item);
    });
    if (rows.length > 0 && rows[rows.length - 1].length < perRow) {
      rows[rows.length - 1].push(...Array.from({ length: perRow - rows[rows.length - 1].length }));
    }
    tableContent = `\n<table>\n${rows
      .map((items) =>
        [
          `  <tr>`,
          items
            .map((item) =>
              !item
                ? '    <td align="center" valign="middle"></td>'
                : [
                    `    <td align="center" valign="middle">`,
                    `      <a href="${item.link}" target="_blank">`,
                    `        <img src="https://framework7.io/i/sponsors/${item.image}" alt="${item.title}" width="160">`,
                    `      </a>`,
                    `    </td>`,
                  ].join('\n'),
            )
            .join('\n'),
          `  </tr>`,
        ].join('\n'),
      )
      .join('\n')}\n</table>\n`;
  }

  const backersContent = fs
    .readFileSync(path.resolve(__dirname, '../BACKERS.md'), 'utf-8')
    .split('<!-- SPONSORS_TABLE_WRAP -->');
  backersContent[1] = tableContent;

  const readmeContent = fs
    .readFileSync(path.resolve(__dirname, '../README.md'), 'utf-8')
    .split('<!-- SPONSORS_TABLE_WRAP -->');
  readmeContent[1] = tableContent;

  fs.writeFileSync(
    path.resolve(__dirname, '../BACKERS.md'),
    backersContent.join('<!-- SPONSORS_TABLE_WRAP -->'),
  );

  fs.writeFileSync(
    path.resolve(__dirname, '../README.md'),
    readmeContent.join('<!-- SPONSORS_TABLE_WRAP -->'),
  );
};

const buildSponsorsList = async (sponsors) => {
  const goldSponsorsContent = sponsors.goldSponsor.map((item) =>
    `
  - [${item.title}](${item.link})
  `.trim(),
  );
  const silverSponsorsContent = sponsors.silverSponsor.map((item) =>
    `
  - [${item.title}](${item.link})
  `.trim(),
  );
  const topSupportersContent = sponsors.topSupporter.map((item) =>
    `
  - [${item.title}](${item.link})
  `.trim(),
  );

  let backersContent = fs.readFileSync(path.resolve(__dirname, '../BACKERS.md'), 'utf-8');

  backersContent = backersContent.split('<!-- GOLD_SPONSOR -->');
  backersContent[1] = `\n${goldSponsorsContent.join('\n')}\n`;
  backersContent = backersContent.join('<!-- GOLD_SPONSOR -->');

  backersContent = backersContent.split('<!-- SILVER_SPONSOR -->');
  backersContent[1] = `\n${silverSponsorsContent.join('\n')}\n`;
  backersContent = backersContent.join('<!-- SILVER_SPONSOR -->');

  backersContent = backersContent.split('<!-- TOP_SUPPORTER -->');
  backersContent[1] = `\n${topSupportersContent.join('\n')}\n`;
  backersContent = backersContent.join('<!-- TOP_SUPPORTER -->');

  fs.writeFileSync(path.resolve(__dirname, '../BACKERS.md'), backersContent);
};

const buildSponsors = async () => {
  const entries = await getSponsors();
  const result = {};

  if (entries) {
    entries.forEach((item) => {
      if (!result[item.plan]) result[item.plan] = [];
      result[item.plan].push(item);
    });
  }
  Object.keys(result).forEach((plan) => {
    result[plan] = [
      ...result[plan].sort((a, b) => {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      }),
    ];
  });
  buildTables(result);
  buildSponsorsList(result);
};

buildSponsors();
